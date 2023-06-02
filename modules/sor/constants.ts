import { GqlCowSwapApiResponse, GqlSorSwapType } from '../../schema';

export const EMPTY_COWSWAP_RESPONSE = (assetIn: string, assetOut: string, amount: string): GqlCowSwapApiResponse =>  {
    return {
        marketSp: '0',
        returnAmount: '0',
        returnAmountConsideringFees: '0',
        returnAmountFromSwaps: '0',
        swapAmount: amount,
        swapAmountForSwaps: '0',
        swaps: [],
        tokenAddresses: [],
        tokenIn: assetIn,
        tokenOut: assetOut,
    }
}