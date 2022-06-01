import { PoolStakingService } from '../pool-types';
import { prisma } from '../../util/prisma-client';
import { prismaBulkExecuteOperations } from '../../../prisma/prisma-util';
import { GaugeSerivce } from './gauge.serivce';

export class GaugeStakingService implements PoolStakingService {
    constructor(private readonly gaugeService: GaugeSerivce) {}
    public async syncStakingForPools(): Promise<void> {
        const gaugeStreamers = await this.gaugeService.getStreamers();
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
}
