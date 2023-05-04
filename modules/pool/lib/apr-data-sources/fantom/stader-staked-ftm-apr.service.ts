import { prisma } from '../../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { networkConfig } from '../../../../config/network-config';
import { TokenService } from '../../../../token/token.service';
import { PoolAprService } from '../../../pool-types';
import { protocolTakesFeeOnYield } from '../../pool-utils';
import { liquidStakedBaseAprService } from '../liquid-staked-base-apr.service';

export class StaderStakedFtmAprService implements PoolAprService {
    constructor(private readonly tokenService: TokenService, private readonly sftmxAddress: string) {}

    public getAprServiceName(): string {
        return 'StaderStakedFtmAprService';
    }

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const tokenPrices = await this.tokenService.getTokenPrices();
        const sftmxPrice = this.tokenService.getPriceForToken(tokenPrices, this.sftmxAddress);
        const sftmxBaseApr = await liquidStakedBaseAprService.getSftmxBaseApr();
        let operations: any[] = [];
        for (const pool of pools) {
            const sftmxToken = pool.tokens.find((token) => token.address === this.sftmxAddress);
            const sftmxTokenBalance = sftmxToken?.dynamicData?.balance;
            if (sftmxTokenBalance && pool.dynamicData) {
                const sftmxPercentage = (parseFloat(sftmxTokenBalance) * sftmxPrice) / pool.dynamicData.totalLiquidity;
                const sftmxApr = pool.dynamicData.totalLiquidity > 0 ? sftmxBaseApr * sftmxPercentage : 0;
                const userApr =
                    pool.type === 'META_STABLE'
                        ? sftmxApr * (1 - networkConfig.balancer.swapProtocolFeePercentage)
                        : sftmxApr * (1 - networkConfig.balancer.yieldProtocolFeePercentage);
                operations.push(
                    prisma.prismaPoolAprItem.upsert({
                        where: { id: `${pool.id}-sftmx-apr` },
                        update: { apr: protocolTakesFeeOnYield(pool) ? userApr : sftmxApr },
                        create: {
                            id: `${pool.id}-sftmx-apr`,
                            poolId: pool.id,
                            apr: protocolTakesFeeOnYield(pool) ? userApr : sftmxApr,
                            title: 'sFTMx APR',
                            type: 'IB_YIELD',
                        },
                    }),
                );
            }
        }
        await Promise.all(operations);
    }
}
