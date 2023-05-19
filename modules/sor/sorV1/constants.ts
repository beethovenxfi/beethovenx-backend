import { CowSwapApiResponse } from '../sorV1/types';

export const EMPTY_COWSWAP_RESPONSE: CowSwapApiResponse = {
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