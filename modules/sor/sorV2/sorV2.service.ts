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
    Swap as SwapSdk,
    RawPool
} from '@balancer/sdk';
import { GqlSorSwapType, GqlSwap } from '../../../schema';
import { PrismaPoolType, PrismaToken } from '@prisma/client';
import { GetSwapsInput, Swap } from '../types';
import { tokenService } from '../../token/token.service';
import { networkContext } from '../../network/network-context.service';
import { prisma } from '../../../prisma/prisma-client';
import { PrismaPoolWithDynamic, prismaPoolWithDynamic } from '../../../prisma/prisma-types';
import { HumanAmount, SupportedRawPoolTypes } from '@balancer/sdk';
import { env } from '../../../app/env';
import { DeploymentEnv } from '../../network/network-config-types';
import { Cache, CacheClass } from 'memory-cache';
import { GqlCowSwapApiResponse } from '../../../schema';
import cloneDeep from 'lodash/cloneDeep';

const ALL_BASEPOOLS_CACHE_KEY = `basePools:all`;

class SwapResult implements Swap {

    private swap: SwapSdk | null;
    public inputAmount: bigint;
    public outputAmount: bigint;

    constructor(swap: SwapSdk | null) {
        if(swap === null) {
            this.swap = null;
            this.inputAmount = BigInt(0);
            this.outputAmount = BigInt(0);
        } else {
            this.swap = swap;
            this.inputAmount = swap.inputAmount.amount;
            this.outputAmount = swap.outputAmount.amount;
        }
    }

    getSwap(): GqlCowSwapApiResponse {
        if(this.swap === null)
            return {} as GqlCowSwapApiResponse;
        return this.mapResultToCowSwap(this.swap);
    }

    async queryAndUpdate(): Promise<GqlCowSwapApiResponse> {
        // TODO
        if(this.swap === null)
            return {} as GqlCowSwapApiResponse;
        return this.mapResultToCowSwap(this.swap);
    }

        /**
     * Maps Swap to GqlCowSwapApiResponse which is what current CowSwap Solver uses.
     * @param swap 
     * @returns 
     */
    private mapResultToCowSwap(swap: SwapSdk): GqlCowSwapApiResponse {
        let swaps: GqlSwap[];
        if (swap.swaps instanceof Array) {
            swaps = swap.swaps.map(swap => {
                return {
                    ...swap,
                    amount: swap.amount.toString(),
                    assetInIndex: Number(swap.assetInIndex),
                    assetOutIndex: Number(swap.assetOutIndex),
                }
            });
        } else {
            swaps = [{
                amount: swap.inputAmount.amount.toString(),
                assetInIndex: swap.assets.indexOf(swap.swaps.assetIn),
                assetOutIndex: swap.assets.indexOf(swap.swaps.assetOut),
                poolId: swap.swaps.poolId,
                userData: swap.swaps.userData
            }];
        }
        const returnAmount = swap.swapKind === SwapKind.GivenIn ? swap.outputAmount.amount.toString() : swap.inputAmount.amount.toString();
        const swapAmount = swap.swapKind === SwapKind.GivenIn ? swap.inputAmount.amount.toString() : swap.outputAmount.amount.toString(); 
        return {
            marketSp: '', // TODO - Could this be calculate using out/in?
            returnAmount,
            returnAmountConsideringFees: returnAmount, // TODO - Check if CowSwap actually use this?
            returnAmountFromSwaps: returnAmount, // TODO - Check if CowSwap actually use this?
            swapAmount,
            swapAmountForSwaps: swapAmount, // TODO - Check if CowSwap actually use this?
            swaps,
            tokenAddresses: swap.assets,
            tokenIn: swap.inputAmount.token.address,
            tokenOut: swap.outputAmount.token.address,
        }
    }
}

export class SorV2Service {
    cache: CacheClass<string, BasePool[]>;

    constructor() {
        this.cache = new Cache<string, BasePool[]>();
    }

    public async getSwap({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<Swap> {
        console.time('getBasePools');
        const poolsFromDb = await this.getBasePools();
        console.timeEnd('getBasePools');
        const chainId = networkContext.chainId as unknown as ChainId;
        const tIn = await this.getToken(tokenIn as Address, chainId);
        const tOut = await this.getToken(tokenOut as Address, chainId);
        try {
            // Constructing a Swap mutates the pools so I used cloneDeep
            const swap = await sorGetSwapsWithPools(
                        tIn,
                        tOut,
                        this.mapSwapType(swapType),
                        swapAmount,
                        cloneDeep(poolsFromDb),
                        // swapOptions, // I don't think we need specific swapOptions for this?
                    );
            return new SwapResult(swap);
        } catch (err) {
            console.log(`sorV2 Service Error`, err);
            return new SwapResult(null);
        }
    };

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

    private async getBasePools(): Promise<BasePool[]> {
        let basePools: BasePool[] | null = this.cache.get(`${ALL_BASEPOOLS_CACHE_KEY}:${networkContext.chainId}`);
        if (!basePools) {
            basePools = await this.getBasePoolsFromDb();
            this.cache.put(`${ALL_BASEPOOLS_CACHE_KEY}:${networkContext.chainId}`, basePools, 5 * 60 * 1000);
        }
        return basePools;
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
                NOT: {
                    id: {
                        in: networkContext.data.sor[env.DEPLOYMENT_ENV as DeploymentEnv].poolIdsToExclude,
                    }
                }
            },
            include: prismaPoolWithDynamic.include
        });
        const rawPools = this.mapToRawPools(pools);
        return this.mapToBasePools(rawPools);
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
                return 'Stable';
            case PrismaPoolType.META_STABLE:
                return 'MetaStable';
            case PrismaPoolType.PHANTOM_STABLE:
                // Composablestables are PHANTOM_STABLE in Prisma. b-sdk treats Phantoms as ComposableStable.
                return 'ComposableStable';
            case PrismaPoolType.LINEAR:
                return 'Linear';
            default:
                return type;
        }
    } 
}

export const sorV2Service = new SorV2Service();