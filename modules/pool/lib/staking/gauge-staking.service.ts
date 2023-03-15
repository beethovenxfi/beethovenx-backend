import { PoolStakingService } from '../../pool-types';
import { prisma } from '../../../../prisma/prisma-client';
import { prismaBulkExecuteOperations } from '../../../../prisma/prisma-util';
import { PrismaPoolStakingType } from '@prisma/client';
import { networkContext } from '../../../network/network-context.service';
import { GaugeSubgraphService } from '../../../subgraphs/gauge-subgraph/gauge-subgraph.service';

export class GaugeStakingService implements PoolStakingService {
    constructor(private readonly gaugeSubgraphService: GaugeSubgraphService) {}
    public async syncStakingForPools(): Promise<void> {
        const gauges = await this.gaugeSubgraphService.getAllGaugesWithStatus();

        const pools = await prisma.prismaPool.findMany({
            where: { chain: networkContext.chain },
            include: {
                staking: { include: { gauge: { include: { rewards: true } } } },
            },
        });
        const operations: any[] = [];

        for (const gauge of gauges) {
            const pool = pools.find((pool) => pool.id === gauge.poolId);
            if (!pool) {
                continue;
            }
            operations.push(
                prisma.prismaPoolStaking.upsert({
                    where: { id_chain: { id: gauge.address, chain: networkContext.chain } },
                    create: {
                        id: gauge.address,
                        chain: networkContext.chain,
                        poolId: pool.id,
                        type: 'GAUGE',
                        address: gauge.address,
                    },
                    update: {},
                }),
            );

            operations.push(
                prisma.prismaPoolStakingGauge.upsert({
                    where: { id_chain: { id: gauge.address, chain: networkContext.chain } },
                    create: {
                        id: gauge.address,
                        stakingId: gauge.address,
                        gaugeAddress: gauge.address,
                        chain: networkContext.chain,
                        status: gauge.status,
                    },
                    update: {
                        status: gauge.status,
                    },
                }),
            );

            for (let rewardToken of gauge.tokens) {
                const tokenAddress = rewardToken.id.split('-')[0].toLowerCase();
                const id = `${gauge.address}-${tokenAddress}`;
                operations.push(
                    prisma.prismaPoolStakingGaugeReward.upsert({
                        create: {
                            id,
                            chain: networkContext.chain,
                            gaugeId: gauge.address,
                            tokenAddress: tokenAddress,
                            rewardPerSecond: `${rewardToken.rewardsPerSecond}`,
                        },
                        update: {
                            rewardPerSecond: `${rewardToken.rewardsPerSecond}`,
                        },
                        where: { id_chain: { id, chain: networkContext.chain } },
                    }),
                );
            }
        }
        // operations.push(prisma.prismaPoolStakingGauge.createMany({ data: gaugeStakingEntities, skipDuplicates: true }));
        // operations.push(...gaugeStakingRewardOperations);

        await prismaBulkExecuteOperations(operations, true, undefined);
    }
    public async reloadStakingForAllPools(stakingTypes: PrismaPoolStakingType[]): Promise<void> {
        if (stakingTypes.includes('GAUGE')) {
            await prisma.prismaUserStakedBalance.deleteMany({
                where: { staking: { type: 'GAUGE', chain: networkContext.chain } },
            });
            await prisma.prismaPoolStakingGaugeReward.deleteMany({ where: { chain: networkContext.chain } });
            await prisma.prismaPoolStakingGauge.deleteMany({ where: { chain: networkContext.chain } });
            await prisma.prismaPoolStaking.deleteMany({ where: { chain: networkContext.chain } });
            await this.syncStakingForPools();
        }
    }
}