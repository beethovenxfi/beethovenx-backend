import axios, { AxiosError } from 'axios';
import { GqlSorSwapType, GqlSorSwapOptionsInput } from '../../../schema';
import { GetSwapsInput } from '../sor.service';
import { SwapInfo } from '@balancer-labs/sdk';
import { env } from '../../../app/env';
import { networkContext } from '../../network/network-context.service';
import { DeploymentEnv } from '../../network/network-config-types';
import { CowSwapApiResponse, CowSwapSwapType } from './types';

const EMPTY_APIRESPONSE: CowSwapApiResponse = {
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

export class SorV1Service {
    public async getSwaps({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<CowSwapApiResponse> {
        return await this.querySorBalancer(swapType, tokenIn, tokenOut, swapAmount); 
    }

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
    ): Promise<CowSwapApiResponse> {
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
            const { data } = await axios.post<CowSwapApiResponse>(
                endPoint, 
                swapData,
            );
            return data;
        } catch (err) {
            console.log(`sorV1 Service Error`, err);
            return EMPTY_APIRESPONSE;
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