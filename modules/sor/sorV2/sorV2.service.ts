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
    RawPool,
    TokenAmount,
} from '@balancer/sdk';
import { parseFixed } from '@ethersproject/bignumber';
import cloneDeep from 'lodash/cloneDeep';
import { GqlSorSwapType, GqlSwap, GqlSorGetSwapsResponse, GqlPoolMinimal, GqlSorSwapRoute } from '../../../schema';
import { PrismaPoolType, PrismaToken } from '@prisma/client';
import { GetSwapsInput, SwapResult, SwapService } from '../types';
import { tokenService } from '../../token/token.service';
import { networkContext } from '../../network/network-context.service';
import { prisma } from '../../../prisma/prisma-client';
import { PrismaPoolWithDynamic, prismaPoolWithDynamic } from '../../../prisma/prisma-types';
import { HumanAmount, SupportedRawPoolTypes } from '@balancer/sdk';
import { env } from '../../../app/env';
import { DeploymentEnv } from '../../network/network-config-types';
import { Cache, CacheClass } from 'memory-cache';
import { GqlCowSwapApiResponse } from '../../../schema';
import { BalancerSorService } from '../../beethoven/balancer-sor.service';
import { poolService } from '../../pool/pool.service';
import { BatchSwapStep } from '@balancer/sdk';
import { SingleSwap } from '@balancer/sdk';
import { SwapInfoRoute, SwapTypes, Swap, bnum, SwapInfoRouteHop } from '@balancer-labs/sor';
import { BigNumber } from 'ethers';
import { oldBnumScale } from '../../big-number/old-big-number';
import { mapRoutes } from './beetsHelpers';

const ALL_BASEPOOLS_CACHE_KEY = `basePools:all`;

class SwapResultV2 implements SwapResult {
    private swap: SwapSdk | null;
    public inputAmount: bigint = BigInt(0);
    public outputAmount: bigint = BigInt(0);
    public isValid: boolean;

    constructor(swap: SwapSdk | null) {
        if (swap === null) {
            this.isValid = false;
            this.swap = null;
        } else {
            this.isValid = true;
            this.swap = swap;
            this.inputAmount = swap.inputAmount.amount;
            this.outputAmount = swap.outputAmount.amount;
        }
    }

    async getCowSwapResponse(queryFirst = false): Promise<GqlCowSwapApiResponse> {
        if (!this.isValid || this.swap === null) throw new Error('No Response - Invalid Swap');

        if (!queryFirst) return this.mapResultToCowSwap(this.swap, this.swap.inputAmount, this.swap.outputAmount);
        else {
            // Needs node >= 18 (https://github.com/wagmi-dev/viem/discussions/147)
            const updatedResult = await this.swap.query(networkContext.data.rpcUrl);
            // console.log(`UPDATE:`, this.swap.quote.amount.toString(), updatedResult.amount.toString());

            const ip = this.swap.swapKind === SwapKind.GivenIn ? this.swap.inputAmount : updatedResult;
            const op = this.swap.swapKind === SwapKind.GivenIn ? updatedResult : this.swap.outputAmount;

            return this.mapResultToCowSwap(this.swap, ip, op);
        }
    }

    async getBeetsSwapResponse(queryFirst: boolean): Promise<GqlSorGetSwapsResponse> {
        if (!this.isValid || this.swap === null) throw new Error('No Response - Invalid Swap');

        return await this.mapResultToBeetsSwap(this.swap, this.swap.inputAmount, this.swap.outputAmount);
    }

    private async mapResultToBeetsSwap(
        swap: SwapSdk,
        inputAmount: TokenAmount,
        outputAmount: TokenAmount,
    ): Promise<GqlSorGetSwapsResponse> {
        const sor = new BalancerSorService();
        const tokens = await tokenService.getTokens();
        let poolIds: string[];
        if (swap.isBatchSwap) {
            const swaps = swap.swaps as BatchSwapStep[];
            poolIds = swaps.map((swap) => swap.poolId);
        } else {
            const singleSwap = swap.swaps as SingleSwap;
            poolIds = [singleSwap.poolId];
        }
        const pools = await poolService.getGqlPools({
            where: { idIn: poolIds },
        });

        const swapAmountForSwaps =
            swap.swapKind === SwapKind.GivenIn ? inputAmount.amount.toString() : outputAmount.amount.toString();
        const returnAmountFromSwaps =
            swap.swapKind === SwapKind.GivenIn ? outputAmount.amount.toString() : inputAmount.amount.toString();

        const swapData = {
            tokenIn: inputAmount.token.address.toString(),
            tokenOut: outputAmount.token.address.toString(),
            tokens,
            swapType: this.mapSwapKind(swap.swapKind),
            tokenInAmtEvm: inputAmount.amount.toString(),
            tokenOutAmtEvm: outputAmount.amount.toString(),
            swapAmountForSwaps,
            returnAmountFromSwaps,
            returnAmountConsideringFees: returnAmountFromSwaps,
            routes: this.mapRoutes(swap.swaps, inputAmount.amount.toString(), outputAmount.amount.toString(), pools), // TODO
            pools,
            marketSp: '', // TODO
            swaps: this.mapSwaps(swap.swaps, swap.assets),
            tokenAddresses: swap.assets,
        };
        return sor.formatResponse(swapData);
    }

    private mapSwaps(swaps: BatchSwapStep[] | SingleSwap, assets: string[]): GqlSwap[] {
        if (Array.isArray(swaps)) {
            return swaps.map((swap) => {
                return {
                    ...swap,
                    assetInIndex: Number(swap.assetInIndex.toString()),
                    assetOutIndex: Number(swap.assetOutIndex.toString()),
                    amount: swap.amount.toString(),
                };
            });
        } else {
            const assetInIndex = assets.indexOf(swaps.assetIn);
            const assetOutIndex = assets.indexOf(swaps.assetOut);
            return [
                {
                    ...swaps,
                    assetInIndex,
                    assetOutIndex,
                    amount: swaps.amount.toString(),
                },
            ];
        }
    }

    private mapSwapKind(kind: SwapKind): GqlSorSwapType {
        return kind === SwapKind.GivenIn ? 'EXACT_IN' : 'EXACT_OUT';
    }

    private mapRoutes(
        swaps: BatchSwapStep[] | SingleSwap,
        inputAmount: string,
        outputAmount: string,
        pools: GqlPoolMinimal[],
    ): GqlSorSwapRoute[] {
        return mapRoutes(swaps, inputAmount, outputAmount, pools);
    }

    /**
     * Formats a sequence of swaps to a format that is useful for displaying the routes in user interfaces.
     * Taken directly from Beets SOR: https://github.com/beethovenxfi/balancer-sor/blob/beethovenx-master/src/formatSwaps.ts#L167
     * @dev The swaps are converted to an array of routes, where each route has an array of hops
     * @param swapType - exact in or exact out
     * @param routes - The original Swaps
     * @param swapAmount - The total amount being swapped
     * @returns SwapInfoRoute[] - The swaps formatted as routes with hops
     */
    private formatRoutesSOR(swapType: SwapTypes, routes: Swap[][], swapAmount: BigNumber): SwapInfoRoute[] {
        const exactIn = swapType === SwapTypes.SwapExactIn;

        return routes.map((swaps) => {
            const first = swaps[0];
            const last = swaps[swaps.length - 1];
            const tokenInAmount = (exactIn ? first.swapAmount : last.swapAmountOut) || '0';
            const tokenOutAmount = (exactIn ? last.swapAmountOut : first.swapAmount) || '0';
            const tokenInAmountScaled = oldBnumScale(bnum(tokenInAmount), first.tokenInDecimals);

            return {
                tokenIn: first.tokenIn,
                tokenOut: last.tokenOut,
                tokenInAmount,
                tokenOutAmount,
                share: tokenInAmountScaled.div(bnum(swapAmount.toString())).toNumber(),
                hops: swaps.map((swap): SwapInfoRouteHop => {
                    return {
                        tokenIn: swap.tokenIn,
                        tokenOut: swap.tokenOut,
                        tokenInAmount: (exactIn ? swap.swapAmount : swap.swapAmountOut) || '0',
                        tokenOutAmount: (exactIn ? swap.swapAmountOut : swap.swapAmount) || '0',
                        poolId: swap.pool,
                    };
                }),
            };
        });
    }

    /**
     * Maps Swap to GqlCowSwapApiResponse which is what current CowSwap Solver uses.
     * @param swap
     * @returns
     */
    private mapResultToCowSwap(
        swap: SwapSdk,
        inputAmount: TokenAmount,
        outputAmount: TokenAmount,
    ): GqlCowSwapApiResponse {
        let swaps: GqlSwap[];
        if (swap.swaps instanceof Array) {
            swaps = swap.swaps.map((swap) => {
                return {
                    ...swap,
                    amount: swap.amount.toString(),
                    assetInIndex: Number(swap.assetInIndex),
                    assetOutIndex: Number(swap.assetOutIndex),
                };
            });
        } else {
            swaps = [
                {
                    amount: inputAmount.amount.toString(),
                    assetInIndex: swap.assets.indexOf(swap.swaps.assetIn),
                    assetOutIndex: swap.assets.indexOf(swap.swaps.assetOut),
                    poolId: swap.swaps.poolId,
                    userData: swap.swaps.userData,
                },
            ];
        }
        const returnAmount =
            swap.swapKind === SwapKind.GivenIn ? outputAmount.amount.toString() : inputAmount.amount.toString();
        const swapAmount =
            swap.swapKind === SwapKind.GivenIn ? inputAmount.amount.toString() : outputAmount.amount.toString();
        return {
            marketSp: '', // TODO - Check if CowSwap actually use this? Could this be calculate using out/in?
            returnAmount,
            returnAmountConsideringFees: returnAmount, // TODO - Check if CowSwap actually use this?
            returnAmountFromSwaps: returnAmount, // TODO - Check if CowSwap actually use this?
            swapAmount,
            swapAmountForSwaps: swapAmount, // TODO - Check if CowSwap actually use this?
            swaps,
            tokenAddresses: swap.assets,
            tokenIn: swap.inputAmount.token.address,
            tokenOut: swap.outputAmount.token.address,
        };
    }
}

export class SorV2Service implements SwapService {
    cache: CacheClass<string, BasePool[]>;

    constructor() {
        this.cache = new Cache<string, BasePool[]>();
    }

    public async getSwapResult({ tokenIn, tokenOut, swapType, swapAmount }: GetSwapsInput): Promise<SwapResult> {
        const poolsFromDb = await this.getBasePools();
        const chainId = networkContext.chainId as unknown as ChainId;
        const tIn = await this.getToken(tokenIn as Address, chainId);
        const tOut = await this.getToken(tokenOut as Address, chainId);
        const swapKind = this.mapSwapType(swapType);
        try {
            // Constructing a Swap mutates the pools so I used cloneDeep
            const swap = await sorGetSwapsWithPools(
                tIn,
                tOut,
                swapKind,
                swapAmount,
                cloneDeep(poolsFromDb),
                // swapOptions, // I don't think we need specific swapOptions for this?
            );
            return new SwapResultV2(swap);
        } catch (err) {
            console.log(`sorV2 Service Error`, err);
            return new SwapResultV2(null);
        }
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
        return new Token(chainId, tokenAddr, prismaToken.decimals, prismaToken.symbol);
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
        return swapType === 'EXACT_IN' ? SwapKind.GivenIn : SwapKind.GivenOut;
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
                    },
                },
            },
            include: prismaPoolWithDynamic.include,
        });
        const rawPools = this.mapToRawPools(pools);
        return this.mapToBasePools(rawPools);
    }

    /**
     * Remove linear pools that cause issues because of price rate.
     * @param pools
     */
    private filterLinearPoolsWithZeroRate(pools: PrismaPoolWithDynamic[]): PrismaPoolWithDynamic[] {
        // 0x3c640f0d3036ad85afa2d5a9e32be651657b874f00000000000000000000046b is a linear pool with priceRate = 0.0 for some tokens which causes issues with b-sdk
        return pools.filter((p) => {
            const isLinearPriceRateOk =
                p.type === 'LINEAR' ? !p.tokens.some((t) => t.dynamicData?.priceRate === '0.0') : true;
            return isLinearPriceRateOk;
        });
    }

    /**
     * Map Prisma pools to b-sdk RawPool.
     * @param pools
     * @returns
     */
    private mapToRawPools(pools: PrismaPoolWithDynamic[]): RawPool[] {
        const filteredPools = this.filterLinearPoolsWithZeroRate(pools);
        return filteredPools.map((prismaPool) => {
            // b-sdk: src/data/types.ts
            let rawPool: RawPool = {
                id: prismaPool.id as Address,
                address: prismaPool.address as Address,
                poolType: this.mapRawPoolType(prismaPool.type),
                poolTypeVersion: prismaPool.version,
                tokensList: prismaPool.tokens.map((t) => t.address as Address),
                swapEnabled: prismaPool.dynamicData!.swapEnabled,
                swapFee: prismaPool.dynamicData!.swapFee as unknown as HumanAmount,
                totalShares: prismaPool.dynamicData!.totalShares as unknown as HumanAmount,
                liquidity: prismaPool.dynamicData!.totalLiquidity as unknown as HumanAmount,
                tokens: prismaPool.tokens.map((t) => {
                    return {
                        address: t.token.address as Address,
                        index: t.index,
                        symbol: t.token.symbol,
                        name: t.token.name,
                        decimals: t.token.decimals,
                        balance: t.dynamicData?.balance as unknown as HumanAmount,
                    };
                }),
            };
            if (['Weighted', 'Investment', 'LiquidityBootstrapping'].includes(rawPool.poolType)) {
                rawPool = {
                    ...rawPool,
                    tokens: rawPool.tokens.map((t, i) => {
                        return { ...t, weight: prismaPool.tokens[i].dynamicData?.weight };
                    }),
                } as RawWeightedPool;
            }
            if (rawPool.poolType === 'Stable') {
                rawPool = {
                    ...rawPool,
                    amp: prismaPool.stableDynamicData?.amp,
                } as RawStablePool;
            }
            if (['MetaStable', 'ComposableStable'].includes(rawPool.poolType)) {
                rawPool = {
                    ...rawPool,
                    amp: prismaPool.stableDynamicData?.amp.split('.')[0], // Taken b-sdk onChainPoolDataEnricher.ts
                    tokens: rawPool.tokens.map((t, i) => {
                        return { ...t, priceRate: prismaPool.tokens[i].dynamicData?.priceRate };
                    }),
                } as RawMetaStablePool;
            }
            if (rawPool.poolType === 'Linear') {
                rawPool = {
                    ...rawPool,
                    mainIndex: prismaPool.linearData?.mainIndex,
                    wrappedIndex: prismaPool.linearData?.wrappedIndex,
                    lowerTarget: prismaPool.linearDynamicData?.lowerTarget,
                    upperTarget: prismaPool.linearDynamicData?.upperTarget,
                    tokens: rawPool.tokens.map((t, i) => {
                        return { ...t, priceRate: prismaPool.tokens[i].dynamicData?.priceRate };
                    }),
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
        switch (type) {
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
