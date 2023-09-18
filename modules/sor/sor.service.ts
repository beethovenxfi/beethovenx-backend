import { networkContext } from '../network/network-context.service';
import { GqlCowSwapApiResponse, GqlSorSwapType, GqlSorGetSwapsResponse, GqlSorSwapOptionsInput } from '../../schema';
import { sorV1BalancerService } from './sorV1Balancer/sorV1Balancer.service';
import { sorV1BeetsService } from './sorV1Beets/sorV1Beets.service';
import { sorV2Service } from './sorV2/sorV2.service';
import { GetSwapsInput, SwapResult } from './types';
import { EMPTY_COWSWAP_RESPONSE } from './constants';
import { getSorMetricsPublisher } from '../metrics/sor.metric';
import moment from 'moment';

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

        const bestSwap = await this.getBestSwap(swapV1, swapV2, swapType, tokenIn, tokenOut);

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
        const v1Start = moment().unix();
        const swapV1 = await sorV1BeetsService.getSwapResult(input);
        const v1End = moment().unix();
        console.timeEnd(`sorV1-${networkContext.chain}`);

        console.time(`sorV2-${networkContext.chain}`);
        const v2Start = moment().unix();
        const swapV2 = await sorV2Service.getSwapResult(input);
        const v2End = moment().unix();
        console.timeEnd(`sorV2-${networkContext.chain}`);

        const sorMetricsPublisher = await getSorMetricsPublisher(networkContext.chain);

        sorMetricsPublisher.publish(`SOR_TIME_V1_${input.tokenIn}_${input.tokenOut}`, v1End - v1Start);
        sorMetricsPublisher.publish(`SOR_TIME_V2_${input.tokenIn}_${input.tokenOut}`, v2End - v2Start);

        sorMetricsPublisher.publish(`SOR_VALID_V1_${input.tokenIn}_${input.tokenOut}`, swapV1.isValid ? 1 : 0);
        sorMetricsPublisher.publish(`SOR_VALID_V2_${input.tokenIn}_${input.tokenOut}`, swapV2.isValid ? 1 : 0);

        if (!swapV1.isValid && !swapV2.isValid)
            return sorV1BeetsService.zeroResponse(input.swapType, input.tokenIn, input.tokenOut, input.swapAmount);

        const bestSwap = await this.getBestSwap(swapV1, swapV2, input.swapType, input.tokenIn, input.tokenOut);

        try {
            // Updates with latest onchain data before returning
            return bestSwap.getBeetsSwapResponse(true);
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
    private async getBestSwap(
        v1: SwapResult,
        v2: SwapResult,
        swapType: GqlSorSwapType,
        assetIn: string,
        assetOut: string,
        debugOut = false,
    ): Promise<SwapResult> {
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
            if (v2.outputAmount < v1.outputAmount) {
                isV1 = true;
            }
        } else {
            if (v2.inputAmount > v1.inputAmount) {
                isV1 = true;
            }
        }

        if (isV1 === true) {
            await this.logResult(`V1`, v1, v2, swapType, assetIn, assetOut);
            return v1;
        } else {
            await this.logResult(`V2`, v1, v2, swapType, assetIn, assetOut);
        }
        return v2;
    }

    private async logResult(
        logType: string,
        v1: SwapResult,
        v2: SwapResult,
        swapType: GqlSorSwapType,
        assetIn: string,
        assetOut: string,
    ) {
        // console.log() will log to cloudwatch
        const sorMetricsPublisher = await getSorMetricsPublisher(networkContext.chain);
        if (swapType === 'EXACT_IN') {
            sorMetricsPublisher.publish(
                `SOR_EXACT_IN_${assetIn}_${assetOut}`,
                Number(v1.outputAmount - v2.outputAmount),
            );
            await console.log(
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
                v1.outputAmount - v2.outputAmount,
            );
        } else {
            sorMetricsPublisher.publish(
                `SOR_EXACT_OUT_${assetIn}_${assetOut}`,
                Number(v1.inputAmount - v2.inputAmount),
            );
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
                v1.inputAmount - v2.inputAmount,
            );
        }
    }
}

export const sorService = new SorService();
