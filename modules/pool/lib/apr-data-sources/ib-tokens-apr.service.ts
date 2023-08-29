import { PoolAprService } from '../../pool-types';
import { PrismaPoolWithExpandedNesting } from '../../../../prisma/prisma-types';
import { prisma } from '../../../../prisma/prisma-client';
import { networkContext } from '../../../network/network-context.service';
import { prismaBulkExecuteOperations } from '../../../../prisma/prisma-util';
import { PrismaPoolAprItemGroup, PrismaPoolLinearData } from '@prisma/client';
import { IbLinearAprHandlers, TokenApr } from './ib-linear-apr-handlers/ib-linear-apr-handlers';
import { TokenService } from '../../../token/token.service';
import { collectsYieldFee } from '../pool-utils';
import { AprConfig } from '../../../network/network-config-types';

export class IbTokensAprService implements PoolAprService {
    private baseAprHandlers: IbLinearAprHandlers;

    constructor(
        aprConfig: AprConfig,
        networkPrismaId: string,
        networkChainId: number,
        private readonly tokenService: TokenService,
    ) {
        this.baseAprHandlers = new IbLinearAprHandlers(aprConfig, networkPrismaId, networkChainId);
    }

    getAprServiceName(): string {
        return 'IbTokensAprService';
    }

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const operations: any[] = [];
        const tokenPrices = await this.tokenService.getTokenPrices();
        const aprs = await this.fetchYieldTokensApr();
        const tokenYieldPools = pools.filter((pool) => {
            return pool.tokens.find((token) => {
                return Array.from(aprs.keys())
                    .map((key) => key.toLowerCase())
                    .includes(token.address.toLowerCase());
            });
        });
        for (const pool of tokenYieldPools) {
            if (!pool.dynamicData) {
                continue;
            }
            const totalLiquidity = pool.dynamicData?.totalLiquidity;
            if (!totalLiquidity) {
                continue;
            }
            const isLinear = pool.type === 'LINEAR' && pool.linearData !== null;
            if (!isLinear) {
                // TODO: In theory, we should check whether the token has a rate provider set, but we don't store this information yet
                for (const token of pool.tokens) {
                    const protocolYieldFeePercentage = pool.dynamicData?.protocolYieldFee
                        ? parseFloat(pool.dynamicData.protocolYieldFee)
                        : networkContext.data.balancer.yieldProtocolFeePercentage;
                    const tokenPrice = this.tokenService.getPriceForToken(tokenPrices, token.address);
                    const tokenBalance = token.dynamicData?.balance;
                    const tokenApr = aprs.get(token.address);
                    if (tokenPrice && tokenBalance && tokenApr !== undefined) {
                        const tokenPercentage = (parseFloat(tokenBalance) * tokenPrice) / totalLiquidity;
                        const poolTokenApr = totalLiquidity > 0 ? tokenApr.val * tokenPercentage : 0;
                        const aprAfterFees =
                            pool.type === 'META_STABLE'
                                ? poolTokenApr * (1 - networkContext.data.balancer.swapProtocolFeePercentage)
                                : poolTokenApr * (1 - protocolYieldFeePercentage);
                        const tokenSymbol = token.token.symbol;
                        const itemId = `${pool.id}-${tokenSymbol}-yield-apr`;
                        operations.push(
                            prisma.prismaPoolAprItem.upsert({
                                where: { id_chain: { id: itemId, chain: networkContext.chain } },
                                create: {
                                    id: itemId,
                                    chain: networkContext.chain,
                                    poolId: pool.id,
                                    title: `${tokenSymbol} APR`,
                                    apr: collectsYieldFee(pool) ? aprAfterFees : poolTokenApr,
                                    group: tokenApr.group as PrismaPoolAprItemGroup,
                                    type: 'IB_YIELD',
                                },
                                update: {
                                    title: `${tokenSymbol} APR`,
                                    apr: collectsYieldFee(pool) ? aprAfterFees : poolTokenApr,
                                },
                            }),
                        );
                    }
                }
            } else {
                // If pool is Linear
                if (!isLinear) {
                    continue;
                }
                const linearData = pool.linearData as PrismaPoolLinearData;
                const wrappedToken = pool.tokens[linearData.wrappedIndex];
                const mainToken = pool.tokens[linearData.mainIndex];
                for (const token of pool.tokens) {
                    const protocolYieldFeePercentage = pool.dynamicData?.protocolYieldFee
                        ? parseFloat(pool.dynamicData.protocolYieldFee)
                        : networkContext.data.balancer.yieldProtocolFeePercentage;
                    const tokenPrice = this.tokenService.getPriceForToken(tokenPrices, mainToken.address);
                    const wrappedTokenBalance = parseFloat(wrappedToken.dynamicData?.balance || '0');
                    const wrappedTokenPriceRate = parseFloat(wrappedToken.dynamicData?.priceRate || '1.0');
                    const poolWrappedLiquidity = wrappedTokenBalance * wrappedTokenPriceRate * tokenPrice;
                    const totalLiquidity = pool.dynamicData.totalLiquidity;
                    const tokenApr = aprs.get(wrappedToken.address);
                    if (tokenPrice && wrappedTokenBalance && totalLiquidity !== undefined && tokenApr !== undefined) {
                        const tokenPercentage = poolWrappedLiquidity / totalLiquidity;
                        const poolTokenApr = totalLiquidity > 0 ? tokenApr.val * tokenPercentage : 0;
                        const aprAfterFees = poolTokenApr * (1 - protocolYieldFeePercentage);
                        const tokenSymbol = token.token.symbol;
                        const isBoosted = this.baseAprHandlers.wrappedBoostedTokens.includes(wrappedToken.address);
                        const itemId = `${pool.id}-${tokenSymbol}-${isBoosted ? 'boosted' : 'yield'}-apr`;
                        operations.push(
                            prisma.prismaPoolAprItem.upsert({
                                where: { id_chain: { id: itemId, chain: networkContext.chain } },
                                create: {
                                    id: itemId,
                                    chain: networkContext.chain,
                                    poolId: pool.id,
                                    title: `${tokenSymbol} APR`,
                                    apr: collectsYieldFee(pool) ? aprAfterFees : poolTokenApr,
                                    group: tokenApr.group as PrismaPoolAprItemGroup,
                                    type: isBoosted ? 'LINEAR_BOOSTED' : 'IB_YIELD',
                                },
                                update: {
                                    title: `${tokenSymbol} APR`,
                                    apr: collectsYieldFee(pool) ? aprAfterFees : poolTokenApr,
                                },
                            }),
                        );
                    }
                }
            }
        }
        await prismaBulkExecuteOperations(operations);
    }

    private async fetchYieldTokensApr(): Promise<Map<string, TokenApr>> {
        const data = await this.baseAprHandlers.fetchAprsFromAllHandlers();
        return new Map<string, TokenApr>(data.filter((apr) => !isNaN(apr.val)).map((apr) => [apr.address, apr]));
    }
}
