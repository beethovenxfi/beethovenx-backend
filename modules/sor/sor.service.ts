import { networkContext } from '../network/network-context.service';
import { GqlCowSwapApiResponse, GqlSorSwapType, GqlSorGetSwapsResponse, GqlSorSwapOptionsInput } from '../../schema';
import { sorV1BalancerService } from './sorV1Balancer/sorV1Balancer.service';
import { sorV1BeetsService } from './sorV1Beets/sorV1Beets.service';
import { sorV2Service } from './sorV2/sorV2.service';
import { GetSwapsInput, SwapResult } from './types';
import { EMPTY_COWSWAP_RESPONSE } from './constants';

export class SorService {
    public async getCowSwaps({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<GqlCowSwapApiResponse> {
        console.time(`sorV1-${networkContext.chain}`);
        const swapV1 = await sorV1BalancerService.getSwapResult({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });
        console.timeEnd(`sorV1-${networkContext.chain}`);
        console.time(`sorV2-${networkContext.chain}`);
        const swapV2 = await sorV2Service.getSwapResult({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });
        console.timeEnd(`sorV2-${networkContext.chain}`);

        if (!swapV1.isValid && !swapV2.isValid) return EMPTY_COWSWAP_RESPONSE(tokenIn, tokenOut, swapAmount);

        const bestSwap = this.getBestSwap(swapV1, swapV2, swapType, tokenIn, tokenOut);

        try {
            // Updates with latest onchain data before returning
            return await bestSwap.getCowSwapResponse(true);
        } catch (err) {
            console.log(`Error Retrieving QuerySwap`);
            console.log(err);
            return EMPTY_COWSWAP_RESPONSE(tokenIn, tokenOut, swapAmount);
        }
    }

    public async getBeetsSwaps(
        input: GetSwapsInput & { swapOptions: GqlSorSwapOptionsInput },
    ): Promise<GqlSorGetSwapsResponse> {
        console.time(`sorV1-${networkContext.chain}`);
        const swapV1 = await sorV1BeetsService.getSwapResult(input);
        console.timeEnd(`sorV1-${networkContext.chain}`);
        console.time(`sorV2-${networkContext.chain}`);
        const swapV2 = await sorV2Service.getSwapResult(input);
        console.timeEnd(`sorV2-${networkContext.chain}`);

        if (!swapV1.isValid && !swapV2.isValid)
            return sorV1BeetsService.zeroResponse(input.swapType, input.tokenIn, input.tokenOut, input.swapAmount);

        const bestSwap = this.getBestSwap(swapV1, swapV2, input.swapType, input.tokenIn, input.tokenOut);

        try {
            // Updates with latest onchain data before returning
            return await bestSwap.getBeetsSwapResponse(true);
        } catch (err) {
            console.log(`Error Retrieving QuerySwap`);
            console.log(err);
            return sorV1BeetsService.zeroResponse(input.swapType, input.tokenIn, input.tokenOut, input.swapAmount);
        }
    }

    /**
     * Find best swap result for V1 vs V2 and return in CowSwap API format. Log if V1 wins.
     * @param v1
     * @param v2
     * @param swapType
     * @returns
     */
    private getBestSwap(
        v1: SwapResult,
        v2: SwapResult,
        swapType: GqlSorSwapType,
        assetIn: string,
        assetOut: string,
        debugOut = false,
    ): SwapResult {
        // Useful for comparing
        if (debugOut) {
            console.log(`------ DEBUG`);
            console.log(v1);
            console.log(v2);
        }

        let isV1 = false;
        if (!v1.isValid || !v2.isValid) {
            isV1 = v1.isValid ? true : false;
        } else if (swapType === 'EXACT_IN') {
            if (v2.outputAmount < v1.outputAmount) isV1 = true;
        } else {
            if (v2.inputAmount > v1.inputAmount) isV1 = true;
        }

        if (isV1 === true) {
            this.logResult(`V1`, v1, v2, swapType, assetIn, assetOut);
            return v1;
        } else return v2;
    }

    private logResult(
        logType: string,
        v1: SwapResult,
        v2: SwapResult,
        swapType: GqlSorSwapType,
        assetIn: string,
        assetOut: string,
    ) {
        // console.log() will log to cloudwatch
        console.log(
            'SOR Service',
            networkContext.chain,
            logType,
            swapType,
            assetIn,
            assetOut,
            v1.inputAmount,
            v1.outputAmount,
            v2.inputAmount,
            v2.outputAmount,
        );
    }
}

export const sorService = new SorService();
