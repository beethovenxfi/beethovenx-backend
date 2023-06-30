import { PoolAprService } from "../../pool-types";
import axios from "axios";
import { PrismaPoolTokenWithExpandedNesting, PrismaPoolWithExpandedNesting } from "../../../../prisma/prisma-types";
import { identity, pickBy, zipObject } from "lodash";
import { AprBreakdown } from "./apr-types";
import { prisma } from "../../../../prisma/prisma-client";
import { networkContext } from "../../../network/network-context.service";
import { prismaBulkExecuteOperations } from "../../../../prisma/prisma-util";

export class NonReaperYieldTokensAprService implements PoolAprService {

    constructor(private readonly swapProtocolFeePercentage: number) {
    }

    getAprServiceName(): string {
        return "NonReaperYieldTokensAprService";
    }

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const operations: any[] = [];
        const aprs = await this.fetchYieldTokensApr();

        const leafTokensPools = pools.filter((pool) => pool.tokens.find((token) => {
            return Array.from(aprs.keys()).includes(token.address);
        }));

        const nonReaperBoostedPools = pools.filter((pool) => pool.tokens.find((token) => {
            //Checking if the pool has nested pools that contains the fetched tokens
            return token.nestedPool && leafTokensPools.map(({address}) => address).includes(token.address);
        }));

        const leafTokensPoolsApr = new Map<string, AprBreakdown>();

        for (const pool of leafTokensPools) {
            const poolAprBreakdown = this.calculateLeafTokensPoolApr(pool, aprs)
            if (poolAprBreakdown?.total) {
                leafTokensPoolsApr.set(pool.address, poolAprBreakdown);
                const itemId = `${pool.id}-tokens-yield-apr`
                operations.push(prisma.prismaPoolAprItem.upsert({
                    where: {id_chain: {id: itemId, chain: networkContext.chain}}, create: {
                        id: itemId,
                        chain: networkContext.chain,
                        poolId: pool.id,
                        title: `Yield Tokens APR`,
                        apr: poolAprBreakdown.total,
                        group: null,
                        type: 'IB_YIELD',
                    }, update: {title: `Yield Tokens APR`, apr: poolAprBreakdown.total},
                }));
            }
        }

        for (const pool of nonReaperBoostedPools) {
            const poolAprBreakdown = this.calculateNonReaperBoostedPoolsApr(pool, leafTokensPoolsApr, leafTokensPools)
            console.log(poolAprBreakdown);
            if (poolAprBreakdown?.total) {
                const itemId = `${pool.id}-apr`
                operations.push(prisma.prismaPoolAprItem.upsert({
                    where: {id_chain: {id: itemId, chain: networkContext.chain}}, create: {
                        id: itemId,
                        chain: networkContext.chain,
                        poolId: pool.id,
                        title: `Non Reaper Boosted Yield Tokens APR`,
                        apr: poolAprBreakdown.total,
                        group: null,
                        type: 'IB_YIELD',
                    }, update: {title: `Non Reaper Boosted Yield Tokens APR`, apr: poolAprBreakdown.total},
                }));
            }
        }
        await prismaBulkExecuteOperations(operations);
    }

    private async fetchYieldTokensApr(): Promise<Map<string, number>> {
        const res = await axios.get("https://yield-tokens.balancer.workers.dev/");
        const aprs = new Map<string, number>(Object.entries(res.data as { [key: string]: number }));
        return aprs;
    }

    private calculateLeafTokensPoolApr(pool: PrismaPoolWithExpandedNesting, yieldTokensApr: Map<string, number>): AprBreakdown | undefined {
        if (!pool.tokens) {
            return {
                total: 0, breakdown: {}
            };
        }

        const totalLiquidity: number = pool.dynamicData?.totalLiquidity ?? 0;
        if (!totalLiquidity) {
            console.error(`Could not calculate Yield Tokens Apr for pool: ${pool.id}, reason: Missing pool liquidity`);
            return;
        }

        // Filter out BPT: token with the same address as the pool
        const bptFreeTokens = pool.tokens.filter((token) => {
            return token.address !== pool.address;
        });

        // Get each token APRs
        const aprs = bptFreeTokens.map((token) => {
            let apr = 0;
            const yieldTokenApr = yieldTokensApr.get(token.address);
            if (yieldTokenApr) {
                // metastable pools incorrectly apply the swap fee to the yield earned.
                // they don't have the concept of a yield fee like the newer pools do.
                if (pool.type === 'META_STABLE') {
                    apr = yieldTokenApr * (1 - parseFloat(this.swapProtocolFeePercentage.toString() || '0.5'));
                } else if (pool.type === 'PHANTOM_STABLE' || (pool.type === 'WEIGHTED' && pool.version >= 2)) {
                    // TODO: Add "isExemptFromYieldProtocolFee" support for each token
                    apr = yieldTokenApr * (1 - parseFloat(pool.dynamicData?.protocolYieldFee?.toString() || '0.5'));
                } else {
                    apr = yieldTokenApr;
                }
            }
            //APR from yield-tokens are multiplied by 10000: 900 -> 9% -> 0.09
            return apr * 0.0001;
        });
        // Normalise tokenAPRs according to weights
        const weightedAprs = bptFreeTokens.map((token, idx) => {
            if (aprs[idx] === 0) {
                return 0;
            }
            // Handle missing token weights, usually due to missing token prices
            const weight = this.getTokenWeightNormalisedByUsd(token, totalLiquidity);
            return aprs[idx] * weight;
        });

        // sum them up to get pool APRs
        const apr = weightedAprs.reduce((sum, apr) => sum + apr, 0);
        const breakdown = pickBy<number>(zipObject(bptFreeTokens.map((t) => t.address), weightedAprs), identity);

        return {
            total: apr, breakdown,
        };
    }

    private calculateNonReaperBoostedPoolsApr(pool: PrismaPoolWithExpandedNesting, leafTokensPoolsApr: Map<string, AprBreakdown>, leafTokensPools: PrismaPoolWithExpandedNesting[]) {
        if (!pool.tokens) {
            return {
                total: 0, breakdown: {}
            };
        }

        const totalLiquidity: number = pool.dynamicData?.totalLiquidity ?? 0;
        if (!totalLiquidity) {
            console.error(`Could not calculate Apr for pool: ${pool.id}, reason: Missing pool liquidity`);
            return undefined;
        }

        // Filter out BPT: token with the same address as the pool
        const bptFreeTokens = pool.tokens.filter((token) => {
            return token.address !== pool.address;
        });

        const aprs = bptFreeTokens.map((token) => {
            let apr = 0;
            const nestedPoolYieldTokensApr = leafTokensPoolsApr.get(token.address)?.total
            if (nestedPoolYieldTokensApr) {
                // INFO: Liquidity mining APR can't cascade to other pools
                const nestedPoolSwapFee = parseFloat(leafTokensPools.find((pool) => pool.address === token.address)?.dynamicData?.swapFee || '0');
                let subApr = nestedPoolYieldTokensApr
                if (pool.type === 'PHANTOM_STABLE' || (pool.type === 'WEIGHTED' && pool.version === 2)) {
                    subApr = subApr * (1 - parseFloat(pool.dynamicData?.protocolYieldFee || '0.5'));
                }
                apr = nestedPoolSwapFee + subApr;
            }
            return apr;
        })

        const weightedAprs = bptFreeTokens.map((token, idx) => {
            if (aprs[idx] === 0) {
                return 0;
            }
            // Handle missing token weights, usually due to missing token prices
            const weight = this.getTokenWeightNormalisedByUsd(token, totalLiquidity);
            return aprs[idx] * weight;
        });

        // sum them up to get pool APRs
        const apr = weightedAprs.reduce((sum, apr) => sum + apr, 0);
        const breakdown = pickBy<number>(zipObject(bptFreeTokens.map((t) => t.address), weightedAprs), identity);

        return {
            total: apr, breakdown,
        };
    }

    // Get token weights normalised by usd price
    getTokenWeightNormalisedByUsd = (token: PrismaPoolTokenWithExpandedNesting, poolTotalLiquidity: number): number => {
        if (token.dynamicData?.weight) {
            return parseFloat(token.dynamicData.weight);
        } else if (token.dynamicData?.balanceUSD) {
            // using floats assuming frontend purposes with low precision needs
            return token.dynamicData?.balanceUSD / poolTotalLiquidity;
        } else {
            throw `No price for ${token.address}`;
        }
        return 0;
    };

}