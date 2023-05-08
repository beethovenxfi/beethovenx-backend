import { 
    BasePool, 
    ChainId,  
    sorGetSwapsWithPools, 
    Token, 
    Address, 
    SwapKind, 
    sorParseRawPools, 
    RawStablePool, 
    RawLinearPool, 
    RawWeightedPool, 
    RawComposableStablePool, 
    RawMetaStablePool,
    Swap
} from '@balancer/sdk';
import { GqlSorGetSwapsResponseNew, GqlSorSwapType } from '../../../schema';
import { PrismaPoolType, PrismaToken } from '@prisma/client';
import { GetSwapsInput } from '../sor.service';
import { tokenService } from '../../token/token.service';
import { networkContext } from '../../network/network-context.service';
import { prisma } from '../../../prisma/prisma-client';
import { PrismaPoolWithDynamic, prismaPoolWithDynamic } from '../../../prisma/prisma-types';
import { RawPool } from '@balancer/sdk';
import { HumanAmount, SupportedRawPoolTypes } from '@balancer/sdk';

import { getSwapCompare } from './temp';

// TODO - Check if this has been deployed to same address across networks?
export const SOR_QUERIES = '0x1814a3b3e4362caf4eb54cd85b82d39bd7b34e41';

export class SorV2Service {
    public async getSwaps({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<GqlSorGetSwapsResponseNew> {
        // TODO - This takes ~1.262s on my local machine. Is this fast enough? Any obvious ways to improve?
        console.time('poolsFromDb');
        const poolsFromDb = await this.getBasePoolsFromDb();
        console.timeEnd('poolsFromDb');
        const chainId = networkContext.chainId as unknown as ChainId;
        const tIn = await this.getToken(tokenIn as Address, chainId);
        const tOut = await this.getToken(tokenOut as Address, chainId);
        const swap = await sorGetSwapsWithPools(
                    tIn,
                    tOut,
                    this.mapSwapType(swapType),
                    swapAmount,
                    poolsFromDb,
                    // swapOptions, // TODO - Handle properly
                );

        if (!swap) throw new Error('Swap is undefined');
        console.log(`Swap (db pools)`);
        console.log(poolsFromDb.length);
        console.log(swap.swaps);
        console.log(swap.outputAmount.amount.toString());
        console.log(`------------------`);

        // Just using to compare results against onchain pool calls
        // await getSwapCompare(tIn, tOut, swapAmount);

        // TODO - Update with proper required result data
        return {
            tokenIn,
            tokenOut,
            result: swap.outputAmount.amount.toString()
        }  
    }

    public mapResultToCowSwap(swap: string): string {
        // TODO - match existing CowSwap SOR API format so its plug and play
        return swap;
    }

    /**
     * Gets a b-sdk Token based off tokenAddr.
     * @param tokenAddr 
     * @param chainId 
     * @returns 
     */
    private async getToken(tokenAddr: Address, chainId: ChainId): Promise<Token> {
        const tokens = await tokenService.getTokens();
        const prismaToken = this.getPrismaToken(tokenAddr, tokens);
        return new Token(
            chainId,
            tokenAddr,
            prismaToken.decimals,
            prismaToken.symbol,
        );
    }

    private getPrismaToken(tokenAddress: string, tokens: PrismaToken[]): PrismaToken {
        tokenAddress = tokenAddress.toLowerCase();
        const match = tokens.find((token) => token.address === tokenAddress);

        if (!match) {
            throw new Error('Unknown token: ' + tokenAddress);
        }
        return match;
    }

    private mapSwapType(swapType: GqlSorSwapType): SwapKind {
        return swapType === "EXACT_IN" ? SwapKind.GivenIn : SwapKind.GivenOut;
    }

    /**
     * Fetch pools from Prisma and map to b-sdk BasePool.
     * @returns 
     */
    private async getBasePoolsFromDb(): Promise<BasePool[]> {
        const pools = await prisma.prismaPool.findMany({
            where: { 
                chain: networkContext.chain,
                dynamicData: {
                    totalSharesNum: {
                        gt: 0.000000000001,
                    },
                    swapEnabled: true,
                },
            },
            include: prismaPoolWithDynamic.include
        });
        const rawPools = this.mapToRawPools(pools);
        // TODO - The pools below cause issue with b-sdk maths. Both have a token with balance = 0 so maybe that's issue?
        const linearPoolsToIgnore = [
            "0xbfa413a2ff0f20456d57b643746133f54bfe0cd20000000000000000000004c3", 
            "0xdc063deafce952160ec112fa382ac206305657e60000000000000000000004c4", 
        ]

        const basePools = this.mapToBasePools(rawPools.filter(p => {
            if (p.poolType == 'Linear') {
                return !linearPoolsToIgnore.includes(p.id);
            } else return true;
        }));
        // const basePools = this.mapToBasePools(rawPools);
        return basePools;
    }

    /**
     * Map Prisma pools to b-sdk RawPool.
     * @param pools 
     * @returns 
     */
    private mapToRawPools(pools: PrismaPoolWithDynamic[]): RawPool[] {
        return pools.map(prismaPool => {
            // b-sdk: src/data/types.ts
            let rawPool: RawPool = {
                id: prismaPool.id as Address,
                address: prismaPool.address as Address,
                poolType: this.mapRawPoolType(prismaPool.type),
                poolTypeVersion: 1, // TODO - Can we add this to Prisma??
                tokensList: prismaPool.tokens.map(t => t.address as Address),
                swapEnabled: prismaPool.dynamicData!.swapEnabled,
                swapFee: prismaPool.dynamicData!.swapFee as unknown as HumanAmount,
                totalShares: prismaPool.dynamicData!.totalShares as unknown as HumanAmount,
                liquidity: prismaPool.dynamicData!.totalLiquidity as unknown as HumanAmount,
                tokens: prismaPool.tokens.map(t => {
                    return {
                            address: t.token.address as Address,
                            index: t.index,
                            symbol: t.token.symbol,
                            name: t.token.name,
                            decimals: t.token.decimals,
                            balance: t.dynamicData?.balance as unknown as HumanAmount
                    }
                }),
            };
            if(["Weighted", "Investment", "LiquidityBootstrapping"].includes(rawPool.poolType)) {
                rawPool = {
                    ...rawPool,
                    tokens: rawPool.tokens.map((t, i) => { return {...t, weight: prismaPool.tokens[i].dynamicData?.weight} }),
                } as RawWeightedPool;
            }
            if(rawPool.poolType === "Stable") {
                rawPool = {
                    ...rawPool,
                    amp: prismaPool.stableDynamicData?.amp,
                } as RawStablePool;
            }
            if(["MetaStable", "ComposableStable"].includes(rawPool.poolType)) {
                rawPool = {
                    ...rawPool,
                    amp: prismaPool.stableDynamicData?.amp.split('.')[0], // Taken b-sdk onChainPoolDataEnricher.ts
                    tokens: rawPool.tokens.map((t, i) => { return {...t, priceRate: prismaPool.tokens[i].dynamicData?.priceRate} }),
                } as RawMetaStablePool;
            }
            if(rawPool.poolType === "Linear") {
                rawPool = {
                    ...rawPool,
                    mainIndex: prismaPool.linearData?.mainIndex, 
                    wrappedIndex: prismaPool.linearData?.wrappedIndex,
                    lowerTarget: prismaPool.linearDynamicData?.lowerTarget,
                    upperTarget: prismaPool.linearDynamicData?.upperTarget,
                    tokens: rawPool.tokens.map((t, i) => { return {...t, priceRate: prismaPool.tokens[i].dynamicData?.priceRate} }),
                } as RawLinearPool;
            }
            return rawPool;
        });
    }

    /**
     * Map b-sdk RawPools to BasePools.
     * @param pools
     * @returns 
     */
    private mapToBasePools(pools: RawPool[]): BasePool[] {
        const chainId = networkContext.chainId as unknown as ChainId;
        return sorParseRawPools(chainId, pools);
    }

    /**
     * Map Prisma pool type to b-sdk Raw pool type.
     * @param type 
     * @returns 
     */
    private mapRawPoolType(type: PrismaPoolType): SupportedRawPoolTypes | string {
        // From b-sdk:
        // - type LinearPoolType = `${string}Linear`;
        // - LinearPoolType | 'Weighted' | 'Investment' | 'LiquidityBootstrapping' | 'Stable' | 'MetaStable' | 'ComposableStable' | 'StablePhantom' | 'Element';
        switch(type) {
            case PrismaPoolType.WEIGHTED:
                return 'Weighted';
            case PrismaPoolType.INVESTMENT:
                return 'Investment';
            case PrismaPoolType.LIQUIDITY_BOOTSTRAPPING:
                return 'LiquidityBootstrapping';
            case PrismaPoolType.STABLE:
                return 'Stable'; // TODO - Is there a ComposableStable/Stable differentiation in Prisma?
            case PrismaPoolType.META_STABLE:
                return 'MetaStable';
            case PrismaPoolType.PHANTOM_STABLE:
                return 'ComposableStable'; // b-sdk just treats these as ComposableStable
            case PrismaPoolType.LINEAR:
                return 'Linear';
            default:
                return type;
        }
    } 
}

export const sorV2Service = new SorV2Service();