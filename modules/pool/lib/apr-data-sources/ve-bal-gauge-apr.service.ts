import { PrismaPoolWithTokens } from '../../../../prisma/prisma-types';
import { PoolAprService } from '../../pool-types';
import { TokenService } from '../../../token/token.service';
import { secondsPerYear } from '../../../common/time';
import { PrismaPoolAprItem, PrismaPoolAprRange, PrismaPoolAprType } from '@prisma/client';
import { prisma } from '../../../../prisma/prisma-client';
import { prismaBulkExecuteOperations } from '../../../../prisma/prisma-util';
import { networkContext } from '../../../network/network-context.service';
import { GaugeSubgraphService } from '../../../subgraphs/gauge-subgraph/gauge-subgraph.service';

export class GaugeAprService implements PoolAprService {
    private readonly MAX_VEBAL_BOOST = 2.5;

    constructor(
        private readonly gaugeSubgraphService: GaugeSubgraphService,
        private readonly tokenService: TokenService,
        private readonly primaryTokens: string[],
    ) {}

    public getAprServiceName(): string {
        return 'GaugeAprService';
    }

    public async updateAprForPools(pools: PrismaPoolWithTokens[]): Promise<void> {
        const operations: any[] = [];
        const gauges = await this.gaugeSubgraphService.getAllGaugesWithStatus();
        const tokenPrices = await this.tokenService.getTokenPrices();

        const poolsExpanded = await prisma.prismaPool.findMany({
            where: { chain: networkContext.chain, id: { in: pools.map((pool) => pool.id) } },
            include: {
                dynamicData: true,
                staking: {
                    include: {
                        gauge: {
                            include: {
                                rewards: true,
                            },
                        },
                    },
                },
            },
        });

        for (const pool of poolsExpanded) {
            let gauge;
            let preferredStaking;
            for (const stake of pool.staking) {
                if (stake.gauge?.status === 'PREFERRED') {
                    preferredStaking = stake;
                    gauge = gauges.find(
                        (subgraphGauge) =>
                            subgraphGauge.address === stake.gauge?.gaugeAddress && stake.gauge?.status === 'PREFERRED',
                    );
                }
            }
            if (!gauge || !pool.dynamicData || !preferredStaking?.gauge) {
                continue;
            }
            const totalShares = parseFloat(pool.dynamicData.totalShares);
            const gaugeTvl =
                totalShares > 0 ? (parseFloat(gauge.totalSupply) / totalShares) * pool.dynamicData.totalLiquidity : 0;

            let thirdPartyApr = 0;

            for (let rewardToken of preferredStaking.gauge.rewards) {
                const tokenAddress = rewardToken.tokenAddress;
                let rewardTokenDefinition;
                try {
                    rewardTokenDefinition = await prisma.prismaToken.findUniqueOrThrow({
                        where: { address_chain: { address: tokenAddress, chain: networkContext.chain } },
                    });
                } catch (e) {
                    //we don't have the reward token added as a token, only happens for testing tokens
                    continue;
                }
                const tokenPrice = this.tokenService.getPriceForToken(tokenPrices, tokenAddress) || 0.1;
                const rewardTokenPerYear = parseFloat(rewardToken.rewardPerSecond) * secondsPerYear;
                const rewardTokenValuePerYear = tokenPrice * rewardTokenPerYear;
                let rewardApr = gaugeTvl > 0 ? rewardTokenValuePerYear / gaugeTvl : 0;

                const isThirdPartyApr = !this.primaryTokens.includes(tokenAddress.toLowerCase());
                if (isThirdPartyApr) {
                    thirdPartyApr += rewardApr;
                }

                // apply vebal boost for BAL rewards on v2 gauges on child changes or on mainnet
                if (
                    rewardToken.tokenAddress.toLowerCase() === networkContext.data.bal!.address.toLowerCase() &&
                    (preferredStaking.gauge.version === 2 || networkContext.chain === 'MAINNET')
                ) {
                    const aprItemId = `${pool.id}-${rewardTokenDefinition.symbol}-apr`;
                    const aprRangeId = `${pool.id}-bal-apr-range`;

                    // Only 40% of LP token staked accrue emissions, totalSupply = workingSupply * 2.5
                    const workingSupply = (parseFloat(preferredStaking.gauge.workingSupply) + 0.4) / 0.4;
                    const bptPrice = this.tokenService.getPriceForToken(tokenPrices, pool.address);
                    const workingSupplyUsd = workingSupply * bptPrice;
                
                    let balApr = 0;
                    if (workingSupply > 0) {
                        balApr = rewardTokenValuePerYear / workingSupplyUsd;
                    }

                    const itemData = {
                        id: aprItemId,
                        chain: networkContext.chain,
                        poolId: pool.id,
                        title: `${rewardTokenDefinition.symbol} reward APR`,
                        apr: balApr,
                        type: PrismaPoolAprType.NATIVE_REWARD,
                        group: null,
                    };

                    const rangeData = {
                        id: aprRangeId,
                        chain: networkContext.chain,
                        aprItemId: aprItemId,
                        min: balApr,
                        max: balApr * this.MAX_VEBAL_BOOST,
                    };

                    operations.push(
                        prisma.prismaPoolAprItem.upsert({
                            where: {
                                id_chain: {
                                    id: aprItemId,
                                    chain: networkContext.chain,
                                },
                            },
                            update: itemData,
                            create: itemData,
                        }),
                    );

                    operations.push(
                        prisma.prismaPoolAprRange.upsert({
                            where: {
                                id_chain: { id: aprRangeId, chain: networkContext.chain },
                            },
                            update: rangeData,
                            create: rangeData,
                        }),
                    );
                } else {
                    const item: PrismaPoolAprItem = {
                        id: `${pool.id}-${rewardTokenDefinition.symbol}-apr`,
                        chain: networkContext.chain,
                        poolId: pool.id,
                        title: `${rewardTokenDefinition.symbol} reward APR`,
                        apr: rewardApr,
                        type: isThirdPartyApr ? PrismaPoolAprType.THIRD_PARTY_REWARD : PrismaPoolAprType.NATIVE_REWARD,
                        group: null,
                    };
                    operations.push(
                        prisma.prismaPoolAprItem.upsert({
                            where: { id_chain: { id: item.id, chain: networkContext.chain } },
                            update: item,
                            create: item,
                        }),
                    );
                }
            }
        }
        await prismaBulkExecuteOperations(operations, true);
    }
}
