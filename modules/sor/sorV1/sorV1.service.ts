import axios, { AxiosError } from 'axios';
import { SwapKind } from '@balancer/sdk';
import { GqlSorGetSwapsResponseNew, GqlSorSwapType, GqlSorSwapOptionsInput } from '../../../schema';
import { GetSwapsInput } from '../sor.service';
import { FundManagement, SwapInfo, SwapTypes, SwapV2 } from '@balancer-labs/sdk';
import { env } from '../../../app/env';
import { networkContext } from '../../network/network-context.service';
import { DeploymentEnv } from '../../network/network-config-types';
import { BigNumber } from 'ethers';

interface ApiResponse {
    tokenAddresses: string[];
    swapAmount: string;
    swapAmountForSwaps: string;
    returnAmount: string;
    returnAmountFromSwaps: string; 
    returnAmountConsideringFees: string;
    tokenIn: string;
    tokenOut: string;
    marketSp: string;
}

export class SorV1Service {
    public async getSwaps({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<GqlSorGetSwapsResponseNew> {
        const query = await this.querySorBeets(swapType, tokenIn, tokenOut, swapAmount, {});

        // TODO - Update with proper required result data
        return {
            tokenIn,
            tokenOut,
            result: '4',
        }  
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
        console.log(`BEETS API SwapInfo:`)
        console.log(swapInfo);
        return swapInfo;
    }

    private async querySorBalancer(
        swapType: string,
        tokenIn: string,
        tokenOut: string,
        swapAmountScaled: string,
        swapOptions: GqlSorSwapOptionsInput,
    ) {
        // TODO - Waiting for auth token from Tim
        /*
        curl -X POST -H "Content-Type: application/json" \
        -d '{"sellToken":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","buyToken":"0x6b175474e89094c44da98b954eedeac495271d0f","orderKind":"sell", "amount":"100000", "gasPrice":"40000000000"}' \
        https://api.balancer.fi/sor/1

        Example response:
        {
            "tokenAddresses":[
                "0xba100000625a3754423978a60c9317c58a424e3d",
                "0x6b175474e89094c44da98b954eedeac495271d0f"
            ],
            "swaps":[
                {
                    "poolId":"0x148ce9b50be946a96e94a4f5479b771bab9b1c59000100000000000000000054",
                    "assetInIndex":0,
                    "assetOutIndex":1,
                    "amount":"1000000000000000000",
                    "userData":"0x",
                    "returnAmount":"6196869182476993074"
                }
            ],
            "swapAmount":"1000000000000000000",
            "swapAmountForSwaps":"1000000000000000000",
            "returnAmount":"6196869182476993074",
            "returnAmountFromSwaps":"6196869182476993074",
            "returnAmountConsideringFees":"-65828817523006926",
            "tokenIn":"0xba100000625a3754423978a60c9317c58a424e3d",
            "tokenOut":"0x6b175474e89094c44da98b954eedeac495271d0f",
            "marketSp":"0.15959797648561186"
        }
        */
        const endPoint = `https://api.balancer.fi/sor/`;

        const { data } = await axios.post<{ swapInfo: SwapInfo }>(
            `${endPoint}/sor/1`,
            {
                orderKind: 'sell',
                sellToken: tokenIn,
                buyToken: tokenOut,
                amount: swapAmountScaled,
                gasPrice: '40000000000'
            },
        );
        const swapInfo = data.swapInfo;
        return swapInfo;
    }

    private mapSwapType(swapType: GqlSorSwapType): SwapKind {
        return swapType === "EXACT_IN" ? SwapKind.GivenIn : SwapKind.GivenOut;
    }
}

export const sorV1Service = new SorV1Service();