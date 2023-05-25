import axios from 'axios';
import { GqlSorSwapType, GqlSorSwapOptionsInput, GqlCowSwapApiResponse } from '../../../schema';
import { GetSwapsInput, SwapService, Swap } from '../types';
import { SwapInfo } from '@balancer-labs/sdk';
import { env } from '../../../app/env';
import { networkContext } from '../../network/network-context.service';
import { DeploymentEnv } from '../../network/network-config-types';
import { EMPTY_COWSWAP_RESPONSE } from './constants';

type CowSwapSwapType = 'buy' | 'sell';

class SwapResult implements Swap {

    constructor(private swap: GqlCowSwapApiResponse, public inputAmount: bigint, public outputAmount: bigint) {
    }

    getSwap(): GqlCowSwapApiResponse {
        return this.swap;
    }

    async queryAndUpdate(): Promise<GqlCowSwapApiResponse> {
        // TODO
        return this.swap;
    }
}
export class SorV1Service implements SwapService {

    public async getSwap({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<Swap> {
        const swap = await this.querySorBalancer(swapType, tokenIn, tokenOut, swapAmount);
        const inputAmout = swapType === 'EXACT_IN' ? swapAmount : swap.returnAmount;
        const outputAmout = swapType === 'EXACT_IN' ? swap.returnAmount : swapAmount;
        return new SwapResult(swap, BigInt(inputAmout), BigInt(outputAmout));
    };

    /**
     * Query Balancer API CowSwap/SOR endpoint.
     * @param swapType 
     * @param tokenIn 
     * @param tokenOut 
     * @param swapAmountScaled 
     * @param swapOptions 
     * @returns 
     */
    private async querySorBalancer(
        swapType: GqlSorSwapType,
        tokenIn: string,
        tokenOut: string,
        swapAmountScaled: string,
    ): Promise<GqlCowSwapApiResponse> {
        const endPoint = `https://api.balancer.fi/sor/${networkContext.chainId}`;
        const gasPrice = networkContext.data.sor[env.DEPLOYMENT_ENV as DeploymentEnv].gasPrice.toString();
        const swapData = {
                orderKind: this.mapSwapType(swapType),
                sellToken: tokenIn,
                buyToken: tokenOut,
                amount: swapAmountScaled,
                gasPrice
            };

        try {
            const { data } = await axios.post<GqlCowSwapApiResponse>(
                endPoint, 
                swapData,
            );
            return data;
        } catch (err) {
            console.log(`sorV1 Service Error`, err);
            return EMPTY_COWSWAP_RESPONSE;
        }
    }

    private mapSwapType(swapType: GqlSorSwapType): CowSwapSwapType {
        return swapType === "EXACT_IN" ? 'sell' : 'buy';
    }

    private async querySorBeets(
        swapType: string,
        tokenIn: string,
        tokenOut: string,
        swapAmountScaled: string,
        swapOptions: GqlSorSwapOptionsInput,
    ) {
        // Taken from: modules/beethoven/balancer-sor.service.ts
        // TODO - Currently don't get a swap from mainnet. Need an example curl?
        const { data } = await axios.post<{ swapInfo: SwapInfo }>(
            networkContext.data.sor[env.DEPLOYMENT_ENV as DeploymentEnv].url,
            {
                swapType,
                tokenIn,
                tokenOut,
                swapAmountScaled,
                swapOptions: {
                    maxPools:
                        swapOptions.maxPools || networkContext.data.sor[env.DEPLOYMENT_ENV as DeploymentEnv].maxPools,
                    forceRefresh:
                        swapOptions.forceRefresh ||
                        networkContext.data.sor[env.DEPLOYMENT_ENV as DeploymentEnv].forceRefresh,
                },
            },
        );
        const swapInfo = data.swapInfo;
        return swapInfo;
    }
}

export const sorV1Service = new SorV1Service();