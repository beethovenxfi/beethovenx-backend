import { GqlCowSwapApiResponse, GqlSorSwapType, GqlSorGetSwapsResponse } from '../../schema';
export interface GetSwapsInput {
    tokenIn: string;
    tokenOut: string;
    swapType: GqlSorSwapType;
    swapAmount: string;
}

export interface SwapResult {
    getCowSwapResponse(queryFirst: boolean): Promise<GqlCowSwapApiResponse>;
    getBeetsSwapResponse(queryFirst: boolean): Promise<GqlSorGetSwapsResponse>;
    isValid: boolean;
    outputAmount: bigint;
    inputAmount: bigint;
}

export interface SwapService {
    getSwapResult(inputs: GetSwapsInput): Promise<SwapResult>;
}
