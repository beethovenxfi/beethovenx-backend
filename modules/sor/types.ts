import { GqlCowSwapApiResponse, GqlSorSwapType } from '../../schema';

export interface GetSwapsInput {
    tokenIn: string;
    tokenOut: string;
    swapType: GqlSorSwapType;
    swapAmount: string;
}

export interface Swap {
    getSwap(): GqlCowSwapApiResponse;
    queryAndUpdate(): Promise<GqlCowSwapApiResponse>;
    outputAmount: bigint;
    inputAmount: bigint;
}

export interface SwapService {
    getSwap(inputs: GetSwapsInput): Promise<Swap>;
}