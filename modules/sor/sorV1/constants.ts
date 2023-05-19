import { GqlCowSwapApiResponse } from '../../../schema';

export const EMPTY_COWSWAP_RESPONSE: GqlCowSwapApiResponse = {
    tokenAddresses: [],
    swaps: [],
    swapAmount: '0',
    swapAmountForSwaps: '0',
    returnAmount: '0',
    returnAmountFromSwaps: '0',
    returnAmountConsideringFees: '0',
    tokenIn: '',
    tokenOut: '',
    marketSp: '0',
};