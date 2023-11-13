import { networkContext } from '../network/network-context.service';
import { GqlCowSwapApiResponse, GqlSorSwapType, GqlSorGetSwapsResponse, GqlSorSwapOptionsInput } from '../../schema';
import { sorV1BalancerService } from './sorV1Balancer/sorV1Balancer.service';
import { sorV1BeetsService } from './sorV1Beets/sorV1Beets.service';
import { sorV2Service } from './sorV2/sorV2.service';
import { GetSwapsInput, SwapResult } from './types';
import { EMPTY_COWSWAP_RESPONSE } from './constants';
import { getSorMetricsPublisher } from '../metrics/sor.metric';
import moment from 'moment';
import { Chain } from '@prisma/client';

export class SorService {
    public async getCowSwaps({
        chain,
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<GqlCowSwapApiResponse> {
        console.time(`sorV1-${chain}`);
        const swapV1 = await sorV1BalancerService.getSwapResult({
            chain,
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });
        console.timeEnd(`sorV1-${chain}`);
        console.time(`sorV2-${chain}`);
        const swapV2 = await sorV2Service.getSwapResult({
            chain,
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });
        console.timeEnd(`sorV2-${chain}`);

        if (!swapV1.isValid && !swapV2.isValid) return EMPTY_COWSWAP_RESPONSE(tokenIn, tokenOut, swapAmount);

        const bestSwap = await this.getBestSwap(swapV1, swapV2, swapType, tokenIn, tokenOut, chain);

        try {
            // Updates with latest onchain data before returning
            return await bestSwap.getCowSwapResponse(chain, true);
        } catch (err) {
            console.log(`Error Retrieving QuerySwap`);
            console.log(err);
            return EMPTY_COWSWAP_RESPONSE(tokenIn, tokenOut, swapAmount);
        }
    }

    public async getBeetsSwaps(
        input: GetSwapsInput & { swapOptions: GqlSorSwapOptionsInput },
    ): Promise<GqlSorGetSwapsResponse> {
        console.time(`sorV1-${input.chain}`);
        const v1Start = moment().unix();
        const swapV1 = await sorV1BeetsService.getSwapResult(input);
        const v1End = moment().unix();
        console.timeEnd(`sorV1-${input.chain}`);

        console.time(`sorV2-${input.chain}`);
        const v2Start = moment().unix();
        const swapV2 = await sorV2Service.getSwapResult(input);
        const v2End = moment().unix();
        console.timeEnd(`sorV2-${input.chain}`);

        const sorMetricsPublisher = getSorMetricsPublisher(input.chain);

        sorMetricsPublisher.publish(`SOR_TIME_V1`, v1End - v1Start);
        sorMetricsPublisher.publish(`SOR_TIME_V2`, v2End - v2Start);

        sorMetricsPublisher.publish(`SOR_VALID_V1`, swapV1.isValid ? 10 : 1);
        sorMetricsPublisher.publish(`SOR_VALID_V2`, swapV2.isValid ? 10 : 1);

        const swapDiff =
            input.swapType === 'EXACT_IN'
                ? Number(swapV1.outputAmount - swapV2.outputAmount)
                : Number(swapV1.inputAmount - swapV2.inputAmount);

        console.log(
            `${input.tokenIn},${input.tokenOut},${input.swapType},${input.swapAmount},${swapV1.isValid},${
                swapV2.isValid
            },${v1End - v1Start},${v2End - v2Start},${swapDiff},${swapDiff > 0}`,
        );

        if (!swapV1.isValid && !swapV2.isValid)
            return sorV1BeetsService.zeroResponse(input.swapType, input.tokenIn, input.tokenOut, input.swapAmount);

        const bestSwap = await this.getBestSwap(swapV1, swapV2, input.swapType, input.tokenIn, input.tokenOut, input.chain);

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
        chain: Chain,
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
            await this.logResult(`V1`, v1, v2, swapType, assetIn, assetOut, chain);
            return v1;
        } else {
            await this.logResult(`V2`, v1, v2, swapType, assetIn, assetOut, chain);
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
        chain: Chain
    ) {
        // console.log() will log to cloudwatch
        if (swapType === 'EXACT_IN') {
            console.log(
                'SOR Service',
                chain,
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
            console.log(
                'SOR Service',
                chain,
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
