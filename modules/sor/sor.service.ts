import { GqlCowSwapApiResponse, GqlSorSwapType } from '../../schema';
import { sorV1Service } from './sorV1/sorV1.service';
import { sorV2Service } from './sorV2/sorV2.service';
import { Swap, SwapKind } from '@balancer/sdk';

export interface GetSwapsInput {
    tokenIn: string;
    tokenOut: string;
    swapType: GqlSorSwapType;
    swapAmount: string;
}

export class SorService {
    public async getSwaps({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<GqlCowSwapApiResponse> {
        console.time('sorV1');
        const sorV1Result = await sorV1Service.getSwaps({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });
        console.timeEnd('sorV1');
        console.time('sorV2');
        const sorV2Result = await sorV2Service.getSwaps({
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
    private getBestSwap(v1: GqlCowSwapApiResponse, v2: Swap | null, swapType: GqlSorSwapType, debugOut=false): GqlCowSwapApiResponse {
        // Useful for comparing
        if(debugOut && v2) {
            console.log(v1);
            console.log(sorV2Service.mapResultToCowSwap(v2));
        }

        if(!v2) {
            if(v1.returnAmount === '0') this.logResult(`No Result`, v1, v2, swapType);
            else this.logResult(`V1 (No V2)`, v1, v2, swapType);
            return v1;
        }

        let isV1 = false;
        if(v2.swapKind === SwapKind.GivenIn) {
            if(v2.outputAmount.amount < BigInt(v1.returnAmount)) isV1 = true;
        } else {
            if(v2.inputAmount.amount > BigInt(v1.returnAmount)) isV1 = true;      
        }
        if (isV1) {
            this.logResult(`V1`, v1, v2, swapType);
            return v1;
        } else
            return sorV2Service.mapResultToCowSwap(v2);
    }

    private logResult(logType: string, v1: GqlCowSwapApiResponse, v2: Swap | null, swapType: GqlSorSwapType) {
        // console.log() will log to cloudwatch
        console.log('SOR Service', logType, swapType, v1.tokenIn, v1.tokenOut, v1.swapAmount, v1.returnAmount, v2?.inputAmount.amount.toString(), v2?.outputAmount.amount.toString());
    }
}

export const sorService = new SorService();
