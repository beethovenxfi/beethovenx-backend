import { PoolAprService } from '../../pool-types';
import { PrismaPoolWithExpandedNesting } from '../../../../prisma/prisma-types';
import { prisma } from '../../../../prisma/prisma-client';
import { networkContext } from '../../../network/network-context.service';
import { prismaBulkExecuteOperations } from '../../../../prisma/prisma-util';
import { PrismaPoolAprItemGroup, PrismaPoolAprType, PrismaPoolLinearData } from '@prisma/client';
import { IbLinearAprHandlers as IbTokensAprHandlers, TokenApr } from './ib-linear-apr-handlers/ib-linear-apr-handlers';
import { tokenService } from '../../../token/token.service';
import { collectsYieldFee } from '../pool-utils';
import { IbAprConfig } from '../../../network/apr-config-types';

export class IbTokensAprService implements PoolAprService {
    private ibTokensAprHandlers: IbTokensAprHandlers;

    constructor(aprConfig: IbAprConfig) {
        this.ibTokensAprHandlers = new IbTokensAprHandlers(aprConfig);
    }

    getAprServiceName(): string {
        return 'IbTokensAprService';
    }

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const operations: any[] = [];
        const tokenPrices = await tokenService.getTokenPrices();
        const aprs = await this.fetchYieldTokensApr();
        const poolsWithIbTokens = pools.filter((pool) => {
            return pool.tokens.find((token) => {
                return Array.from(aprs.keys())
                    .map((key) => key.toLowerCase())
                    .includes(token.address.toLowerCase());
            });
        });
        for (const pool of poolsWithIbTokens) {
            if (!pool.dynamicData) {
                continue;
            }
            const totalLiquidity = pool.dynamicData?.totalLiquidity;
            if (!totalLiquidity) {
                continue;
            }

            // TODO: We should check whether the token has a rate provider set, but we don't store this information yet

            for (const token of pool.tokens) {
                const tokenApr = aprs.get(token.address);
                if (!tokenApr) {
                    continue;
                }

                const tokenPrice = tokenService.getPriceForToken(tokenPrices, token.address);
                const tokenBalance = token.dynamicData?.balance;

                const tokenLiquidity = tokenPrice * parseFloat(tokenBalance || '0');
                const tokenPercentageInPool = tokenLiquidity / totalLiquidity;

                if (!tokenApr || !tokenPercentageInPool) {
                    continue;
                }

                let aprInPoolAfterFees = tokenApr.apr * tokenPercentageInPool;

                if (collectsYieldFee(pool)) {
                    const protocolYieldFeePercentage = pool.dynamicData?.protocolYieldFee
                        ? parseFloat(pool.dynamicData.protocolYieldFee)
                        : networkContext.data.balancer.yieldProtocolFeePercentage;
                    aprInPoolAfterFees =
                        pool.type === 'META_STABLE'
                            ? aprInPoolAfterFees * (1 - networkContext.data.balancer.swapProtocolFeePercentage)
                            : aprInPoolAfterFees * (1 - protocolYieldFeePercentage);
                }

                const yieldType: PrismaPoolAprType =
                    tokenApr.isIbYield || pool.type !== 'LINEAR' ? 'IB_YIELD' : 'LINEAR_BOOSTED';

                const itemId = `${pool.id}-${token.token.symbol}-yield-apr`;

                const data = {
                    id: itemId,
                    chain: networkContext.chain,
                    poolId: pool.id,
                    title: `${token.token.symbol} APR`,
                    apr: aprInPoolAfterFees,
                    group: tokenApr.group as PrismaPoolAprItemGroup,
                    type: yieldType,
                };

                operations.push(
                    prisma.prismaPoolAprItem.upsert({
                        where: { id_chain: { id: itemId, chain: networkContext.chain } },
                        create: data,
                        update: data,
                    }),
                );
            }
        }
        await prismaBulkExecuteOperations(operations);
    }

    private async fetchYieldTokensApr(): Promise<Map<string, TokenApr>> {
        const data = await this.ibTokensAprHandlers.fetchAprsFromAllHandlers();
        return new Map<string, TokenApr>(
            data
                .filter((tokenApr) => {
                    return !isNaN(tokenApr.apr);
                })
                .map((apr) => [apr.address, apr]),
        );
    }
}
