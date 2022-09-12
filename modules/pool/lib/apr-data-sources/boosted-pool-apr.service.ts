import { PoolAprService } from '../../pool-types';
import { PrismaPoolWithExpandedNesting } from '../../../../prisma/prisma-types';
import { prisma } from '../../../../prisma/prisma-client';

export class BoostedPoolAprService implements PoolAprService {
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const boostedPools = pools.filter(
            (pool) =>
                (pool.type === 'PHANTOM_STABLE' || pool.type === 'COMPOSABLE_STABLE' || pool.type === 'WEIGHTED') &&
                pool.tokens.find((token) => token.nestedPool),
        );

        for (const pool of boostedPools) {
            const tokens = pool.tokens.filter((token) => {
                if (token.address === pool.address) {
                    return false;
                }

                //for phantom stable pools, the linear apr items have already been set
                if (pool.type === 'PHANTOM_STABLE' || pool.type === 'COMPOSABLE_STABLE') {
                    return (
                        token.nestedPool?.type === 'PHANTOM_STABLE' || token.nestedPool?.type === 'COMPOSABLE_STABLE'
                    );
                }

                return (
                    token.nestedPool?.type === 'LINEAR' ||
                    token.nestedPool?.type === 'PHANTOM_STABLE' ||
                    token.nestedPool?.type === 'COMPOSABLE_STABLE'
                );
            });

            const poolIds = tokens.map((token) => token.nestedPool?.id || '');
            const aprItems = await prisma.prismaPoolAprItem.findMany({
                where: {
                    poolId: { in: poolIds },
                    type: { in: ['LINEAR_BOOSTED', 'PHANTOM_STABLE_BOOSTED', 'COMPOSABLE_STABLE_BOOSTED'] },
                },
            });

            for (const token of tokens) {
                const tokenAprItems = aprItems.filter((item) => item.poolId === token.nestedPoolId);

                if (!token.dynamicData || !token.nestedPool || !token.nestedPool.dynamicData) {
                    continue;
                }

                for (const aprItem of tokenAprItems) {
                    const itemId = `${pool.id}-${aprItem.id}`;
                    const { totalShares } = token.nestedPool.dynamicData;
                    const tokenBalance = parseFloat(token.dynamicData.balance);
                    const apr = aprItem.apr * (tokenBalance / parseFloat(totalShares));

                    await prisma.prismaPoolAprItem.upsert({
                        where: { id: itemId },
                        create: {
                            id: itemId,
                            poolId: pool.id,
                            apr: apr || 0,
                            title: aprItem.title,
                            group: aprItem.group,
                        },
                        update: { apr: apr || 0 },
                    });
                }
            }
        }
    }
}
