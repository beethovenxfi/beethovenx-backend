export interface ApiResponse {
    tokenAddresses: string[];
    swaps: Swap[];
    swapAmount: string;
    swapAmountForSwaps: string;
    returnAmount: string;
    returnAmountFromSwaps: string; 
    returnAmountConsideringFees: string;
    tokenIn: string;
    tokenOut: string;
    marketSp: string;
}

export interface Swap {
    poolId: string;
    assetInIndex: number;
    assetOutIndex: number;
    amount: string;
    userData: string;
    returnAmount: string;
}

export type CowSwapSwapType = 'buy' | 'sell';