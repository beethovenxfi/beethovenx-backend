import { GqlCowSwapApiResponse, GqlSorSwapType } from '../../schema';

export interface GetSwapsInput {
    tokenIn: string;
    tokenOut: string;
    swapType: GqlSorSwapType;
    swapAmount: string;
}

export interface Swap {
    getSwap(queryFirst: boolean): Promise<GqlCowSwapApiResponse>;
    assetIn: string;
    assetOut: string;
    outputAmount: bigint;
    inputAmount: bigint;
}

export interface SwapService {
    getSwap(inputs: GetSwapsInput): Promise<Swap>;
}