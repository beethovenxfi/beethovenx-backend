import { GqlCowSwapApiResponse, GqlSorSwapType } from '../../schema';

export interface GetSwapsInput {
    tokenIn: string;
    tokenOut: string;
    swapType: GqlSorSwapType;
    swapAmount: string;
}

export interface SwapResult {
    getSwapResponse(queryFirst: boolean): Promise<GqlCowSwapApiResponse>;
    isValid: boolean;
    outputAmount: bigint;
    inputAmount: bigint;
}

export interface SwapService {
    getSwapResult(inputs: GetSwapsInput): Promise<SwapResult>;
}