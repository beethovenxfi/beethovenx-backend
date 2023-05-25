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
        return this.getBestSwap(sorV1Result, sorV2Result, swapType);
    }

    /**
     * Find best swap result for V1 vs V2 and return in CowSwap API format. Log if V1 wins.
     * @param v1 
     * @param v2 
     * @param swapType 
     * @returns 
     */
    private getBestSwap(v1: Swap, v2: Swap, swapType: GqlSorSwapType, debugOut=false): GqlCowSwapApiResponse {
        // Useful for comparing
        if(debugOut) {
            console.log(v1);
            console.log(v2);
        }

        if(v1.outputAmount === BigInt(0) && v2.outputAmount === BigInt(0)) {
            this.logResult(`No Result`, v1.getSwap(), v2.getSwap(), swapType);
            // TODO - What should we return as a good response here?
            return v1.getSwap();
        }

        let isV1 = false;
        if(swapType === 'EXACT_IN') {
            if(v2.outputAmount < v1.outputAmount) isV1 = true;
        } else {
            if(v2.inputAmount > v1.inputAmount) isV1 = true;      
        }
        if (isV1) {
            this.logResult(`V1`, v1.getSwap(), v2.getSwap(), swapType);
            return v1.getSwap();
        } else
            return v2.getSwap();
    }

    private logResult(logType: string, v1: GqlCowSwapApiResponse, v2: GqlCowSwapApiResponse, swapType: GqlSorSwapType) {
        // console.log() will log to cloudwatch
        console.log('SOR Service', logType, swapType, v1.tokenIn, v1.tokenOut, v1.swapAmount, v1.returnAmount, v2.swapAmount, v2.returnAmount);
    }
}

export const sorService = new SorService();
