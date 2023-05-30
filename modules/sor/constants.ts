import { GqlCowSwapApiResponse, GqlSorSwapType } from '../../schema';

export const EMPTY_COWSWAP_RESPONSE = (assetIn: string, assetOut: string, swapType: GqlSorSwapType, amount: string): GqlCowSwapApiResponse =>  {
    const returnAmount = swapType === "EXACT_IN" ? '0' : amount;
    const swapAmount = swapType === "EXACT_IN" ? amount : '0'; 

    return {
        marketSp: '0',
        returnAmount,
        returnAmountConsideringFees: '0',
        returnAmountFromSwaps: '0',
        swapAmount,
        swapAmountForSwaps: '0',
        swaps: [],
        tokenAddresses: [],
        tokenIn: assetIn,
        tokenOut: assetOut,
    }
}