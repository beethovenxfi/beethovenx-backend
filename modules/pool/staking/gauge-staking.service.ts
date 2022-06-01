import moment from 'moment-timezone';
import { GaugeSubgraphService } from '../../subgraphs/gauge-subgraph/gauge-subgraph.service';
import ChildChainStreamerAbi from './abi/ChildChainStreamer.json';
import { PoolStakingService } from '../pool-types';
import { prisma } from '../../util/prisma-client';
import { Provider } from '@ethersproject/providers';
import { Multicaller } from '../../util/multicaller';
import { scaleDown } from '../../util/numbers';
import { prismaBulkExecuteOperations } from '../../../prisma/prisma-util';

type GaugeRewardToken = { address: string; name: string; decimals: number; symbol: string };
type GaugeRewardTokenWithEmissions = GaugeRewardToken & { rewardsPerSecond: number };

export type GaugeStreamer = {
    address: string;
    gaugeAddress: string;
    totalSupply: string;
    poolId: string;
    rewardTokens: GaugeRewardTokenWithEmissions[];
};

export type GaugeUserShare = {
    gaugeAddress: string;
    poolId: string;
    amount: string;
    tokens: GaugeRewardToken[];
};

export class GaugeStakingService implements PoolStakingService {
    constructor(
        private readonly provider: Provider,
        private readonly multiCallerAddress: string,
        private readonly gaugeSubgraphService: GaugeSubgraphService,
    ) {}
    public async syncStakingForPools(): Promise<void> {
        const gaugeStreamers = await this.getStreamers();
        console.log('streamers', gaugeStreamers.length);

        const pools = await prisma.prismaPool.findMany({
            include: {
                staking: { include: { gauge: { include: { rewards: true } } } },
            },
        });
        const operations: any[] = [];

        const gaugeStakingEntities: any[] = [];
        const gaugeStakingRewardOperations: any[] = [];

        for (const gaugeStreamer of gaugeStreamers) {
            console.log('gaugeStreamer', gaugeStreamer.gaugeAddress);
            const pool = pools.find((pool) => pool.id === gaugeStreamer.poolId);
            if (!pool) {
                continue;
            }
            if (!pool.staking) {
                operations.push(
                    prisma.prismaPoolStaking.create({
                        data: {
                            id: gaugeStreamer.gaugeAddress,
                            poolId: pool.id,
                            type: 'GAUGE',
                            address: gaugeStreamer.gaugeAddress,
                        },
                    }),
                );
            }
            gaugeStakingEntities.push({
                id: gaugeStreamer.gaugeAddress,
                stakingId: gaugeStreamer.gaugeAddress,
                gaugeAddress: gaugeStreamer.gaugeAddress,
            });
            for (let rewardToken of gaugeStreamer.rewardTokens) {
                const id = `${gaugeStreamer.gaugeAddress}-${rewardToken.address}`;
                gaugeStakingRewardOperations.push(
                    prisma.prismaPoolStakingGaugeReward.upsert({
                        create: {
                            id,
                            gaugeId: gaugeStreamer.gaugeAddress,
                            tokenAddress: rewardToken.address,
                            rewardPerSecond: `${rewardToken.rewardsPerSecond}`,
                        },
                        update: {
                            rewardPerSecond: `${rewardToken.rewardsPerSecond}`,
                        },
                        where: { id },
                    }),
                );
            }
        }
        operations.push(prisma.prismaPoolStakingGauge.createMany({ data: gaugeStakingEntities, skipDuplicates: true }));
        operations.push(...gaugeStakingRewardOperations);

        await prismaBulkExecuteOperations(operations);
    }
    public async reloadStakingForAllPools(): Promise<void> {
        await prisma.prismaPoolStakingGaugeReward.deleteMany({});
        await prisma.prismaPoolStakingGauge.deleteMany({});
        await prisma.prismaPoolStaking.deleteMany({});
        await this.syncStakingForPools();
    }

    public async getStreamers(): Promise<GaugeStreamer[]> {
        const streamers = await this.gaugeSubgraphService.getStreamers();
        console.log('initial streamers', streamers.length);

        const multiCaller = new Multicaller(this.multiCallerAddress, this.provider, ChildChainStreamerAbi);

        for (let streamer of streamers) {
            streamer.rewardTokens?.forEach((rewardToken) => {
                multiCaller.call(streamer.id + rewardToken.address, streamer.id, 'reward_data', [rewardToken.address]);
            });
        }

        const rewardDataResult = (await multiCaller.execute()) as Record<
            string,
            { rate: string; period_finish: string }
        >;

        const gaugeStreamers: GaugeStreamer[] = [];
        for (let streamer of streamers) {
            const rewardTokens: GaugeRewardTokenWithEmissions[] = [];
            streamer.rewardTokens?.forEach((rewardToken) => {
                const rewardData = rewardDataResult[streamer.id + rewardToken.address];
                const isActive = moment.unix(parseInt(rewardData.period_finish)).isAfter(moment());
                rewardTokens.push({
                    ...rewardToken,
                    rewardsPerSecond: isActive ? scaleDown(rewardData.rate, rewardToken.decimals).toNumber() : 0,
                });
            });
            gaugeStreamers.push({
                address: streamer.id,
                gaugeAddress: streamer.gauge.id,
                totalSupply: streamer.gauge.totalSupply,
                poolId: streamer.gauge.poolId,
                rewardTokens,
            });
        }
        return gaugeStreamers;
    }

    public async getAllGauges() {
        const gauges = await this.gaugeSubgraphService.getAllGauges();

        return gauges.map(({ id, poolId, totalSupply, shares, tokens }) => ({
            id,
            address: id,
            poolId,
            totalSupply,
            shares:
                shares?.map((share) => ({
                    userAddress: share.user.id,
                    amount: share.balance,
                })) ?? [],
            tokens: tokens,
        }));
    }
    public async getAllUserShares(userAddress: string): Promise<GaugeUserShare[]> {
        const userGauges = await this.gaugeSubgraphService.getUserGauges(userAddress);
        return (
            userGauges?.gaugeShares?.map((share) => ({
                gaugeAddress: share.gauge.id,
                poolId: share.gauge.poolId,
                amount: share.balance,
                tokens: share.gauge.tokens ?? [],
            })) ?? []
        );
    }
}
