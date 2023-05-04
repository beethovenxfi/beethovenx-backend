import { PoolAprService } from '../../../pool-types';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { prisma } from '../../../../../prisma/prisma-client';
import { TokenService } from '../../../../token/token.service';
import { liquidStakedBaseAprService } from '../liquid-staked-base-apr.service';

export class SpookySwapAprService implements PoolAprService {
    constructor(private readonly tokenService: TokenService, private readonly booAddress: string) {}

    public getAprServiceName(): string {
        return 'SpookySwapAprService';
    }

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const tokenPrices = await this.tokenService.getTokenPrices();
        const xBooBaseApr = await liquidStakedBaseAprService.getXBooBaseApr();
        let operations: any[] = [];

        for (const pool of pools) {
            if (
                !pool.linearData ||
                !pool.dynamicData ||
                pool.tokens[pool.linearData.mainIndex].address !== this.booAddress
            ) {
                continue;
            }

            const linearData = pool.linearData;
            const wrappedToken = pool.tokens[linearData.wrappedIndex];
            const tokenPrice = this.tokenService.getPriceForToken(tokenPrices, this.booAddress);
            const wrappedTokens = parseFloat(wrappedToken.dynamicData?.balance || '0');
            const priceRate = parseFloat(wrappedToken.dynamicData?.priceRate || '1.0');
            const poolWrappedLiquidity = wrappedTokens * priceRate * tokenPrice;
            const totalLiquidity = pool.dynamicData.totalLiquidity;
            const apr = totalLiquidity > 0 ? xBooBaseApr * (poolWrappedLiquidity / totalLiquidity) : 0;

            operations.push(
                prisma.prismaPoolAprItem.upsert({
                    where: { id: `${pool.id}-xboo-apr` },
                    update: { apr, type: 'LINEAR_BOOSTED' },
                    create: {
                        id: `${pool.id}-xboo-apr`,
                        poolId: pool.id,
                        apr,
                        title: 'xBOO boosted APR',
                        type: 'LINEAR_BOOSTED',
                    },
                }),
            );
        }

        await Promise.all(operations);
    }
}
