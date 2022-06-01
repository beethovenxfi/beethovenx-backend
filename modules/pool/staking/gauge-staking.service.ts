import moment from 'moment-timezone';
import { GaugeSubgraphService, gaugeSubgraphService } from '../../subgraphs/gauge-subgraph/gauge-subgraph.service';
import ChildChainStreamerAbi from './abi/ChildChainStreamer.json';
import { PoolStakingService } from '../pool-types';
import { prisma } from '../../util/prisma-client';
import { Provider } from '@ethersproject/providers';
import { Multicaller } from '../../util/multicaller';
import { scaleDown } from '../../util/numbers';
import { networkConfig } from '../../config/network-config';

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
    amountUSD: string;
    tokens: GaugeRewardToken[];
};

export class GaugesService implements PoolStakingService {
    constructor(
        private readonly provider: Provider,
        private readonly multiCallerAddress: string,
        private readonly gaugeSubgraphService: GaugeSubgraphService,
    ) {}
    public async syncStakingForPools(): Promise<void> {
        const gaugeStreamers = await this.getStreamers();

        const pools = await prisma.prismaPool.findMany({
            include: {
                staking: { include: { gauge: { include: { rewards: true } } } },
            },
        });
        const operations: any[] = [];

        for (const gaugeStreamer of gaugeStreamers) {
            const pool = pools.find((pool) => pool.id === gaugeStreamer.gauge.poolId);
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
            operations.push(
                prisma.prismaPoolStakingGauge.create({
                    data: {
                        id: gaugeStreamer.gaugeAddress,
                        stakingId: gaugeStreamer.gaugeAddress,
                        gaugeAddress: gaugeStreamer.gaugeAddress,
                    },
                ),
            );
        }
    }
    public reloadStakingForAllPools(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async getAllGauges() {
        const gauges = await gaugeSubgraphService.getAllGauges();
        // console.log(gauges);

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
            tokens: tokens?.map(({ __typename, ...rest }) => rest) ?? [],
        }));
    }

    public async getAllUserShares(userAddress: string): Promise<GaugeUserShare[]> {
        const pools = await balancerService.getPools();
        const userGauges = await gaugeSubgraphService.getUserGauges(userAddress);
        return (
            userGauges?.gaugeShares?.map((share) => {
                const pool = pools.find((pool) => pool.id === share.gauge.poolId);
                const amountUSD =
                    pool != null
                        ? (parseFloat(share.balance) / parseFloat(pool.totalShares)) * parseFloat(pool.totalLiquidity)
                        : 0;
                return {
                    gaugeAddress: share.gauge.id,
                    poolId: share.gauge.poolId,
                    amount: share.balance,
                    amountUSD: `${amountUSD}`,
                    tokens: share.gauge.tokens ?? [],
                };
            }) ?? []
        );
    }
    public async getUserSharesForPool(userAddress: string, poolId: string) {
        const userShares = await this.getAllUserShares(userAddress);
        return userShares.find((share) => share.poolId === poolId);
    }

    public async getStreamers(): Promise<GaugeStreamer[]> {
        const streamers = await gaugeSubgraphService.getStreamers();

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
                gaugeStreamers.push({
                    address: streamer.id,
                    gaugeAddress: streamer.gauge.id,
                    totalSupply: streamer.gauge.totalSupply,
                    poolId: streamer.gauge.poolId,
                    rewardTokens,
                });
            });
        }
        return gaugeStreamers;
    }
}
