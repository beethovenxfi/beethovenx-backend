import { BatchSwapStep, SingleSwap } from '@balancer/sdk';
import { GqlPoolMinimal, GqlSorSwapRoute, GqlSorSwapRouteHop } from '../../../schema';

export function mapRoutes(
    swaps: BatchSwapStep[] | SingleSwap,
    amountIn: string,
    amountOut: string,
    pools: GqlPoolMinimal[],
): GqlSorSwapRoute[] {
    const isBatchSwap = Array.isArray(swaps);
    if (!isBatchSwap) {
        const pool = pools.find((p) => p.id === swaps.poolId);
        if (!pool) throw new Error('Pool not found while mapping route');
        return [mapSingleSwap(swaps, amountIn, amountOut, pool)];
    }

    const route = {} as GqlSorSwapRoute;
    return [route];
}

function  mapSingleSwap(swap: SingleSwap, amountIn: string, amountOut: string, pool: GqlPoolMinimal): GqlSorSwapRoute {
    const hop: GqlSorSwapRouteHop = {
        pool,
        poolId: swap.poolId,
        tokenIn: swap.assetIn,
        tokenInAmount: amountIn,
        tokenOut: swap.assetOut,
        tokenOutAmount: amountOut,
    };
    return {
        share: 1,
        tokenIn: swap.assetIn,
        tokenOut: swap.assetOut,
        tokenInAmount: amountIn,
        tokenOutAmount: amountOut,
        hops: [hop]
    } as GqlSorSwapRoute;
}
