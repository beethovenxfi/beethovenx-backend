import { GqlCowSwapApiResponse, GqlSorSwapType } from '../../schema';
import { sorV1Service } from './sorV1/sorV1.service';
import { sorV2Service } from './sorV2/sorV2.service';
import { GetSwapsInput, Swap } from './types';

export class SorService {
    public async getSwaps({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<GqlCowSwapApiResponse> {
        console.time('sorV1');
        const sorV1Result = await sorV1Service.getSwap({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });
        console.timeEnd('sorV1');
        console.time('sorV2');
        const sorV2Result = await sorV2Service.getSwap({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });
        console.timeEnd('sorV2');
        const bestSwap = this.getBestSwap(sorV1Result, sorV2Result, swapType);
        if(bestSwap === null) return {} as GqlCowSwapApiResponse; // TODO - Whats the best response here?

        try {
            // Updates with latest onchain data before returning
            return await bestSwap.getSwap(true);
        } catch (err) {
            console.log(`Error Retrieving QuerySwap`);
            console.log(err);
            return {} as GqlCowSwapApiResponse; // TODO - Whats the best response here?
        }
    }

    /**
     * Find best swap result for V1 vs V2 and return in CowSwap API format. Log if V1 wins.
     * @param v1 
     * @param v2 
     * @param swapType 
     * @returns 
     */
    private getBestSwap(v1: Swap, v2: Swap, swapType: GqlSorSwapType, debugOut=false): Swap | null {
        // Useful for comparing
        if(debugOut) {
            console.log(v1);
            console.log(v2);
        }

        if(v1.outputAmount === BigInt(0) && v2.outputAmount === BigInt(0))
            return null

        let isV1 = false;
        if(swapType === 'EXACT_IN') {
            if(v2.outputAmount < v1.outputAmount) isV1 = true;
        } else {
            if(v2.inputAmount > v1.inputAmount) isV1 = true;      
        }
        if(isV1 === true) {
            this.logResult(`V1`, v1, v2, swapType);
            return v1;
        } else return v2;
    }

    private logResult(logType: string, v1: Swap, v2: Swap, swapType: GqlSorSwapType) {
        // console.log() will log to cloudwatch
        console.log('SOR Service', logType, swapType, v1.assetIn, v1.assetOut, v1.inputAmount, v1.outputAmount, v2.inputAmount, v2.outputAmount);
    }
}

export const sorService = new SorService();
