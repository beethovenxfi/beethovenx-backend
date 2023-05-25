import axios from 'axios';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { GqlSorSwapType, GqlSorSwapOptionsInput, GqlCowSwapApiResponse } from '../../../schema';
import { GetSwapsInput, SwapService, Swap } from '../types';
import { SwapInfo, FundManagement, SwapTypes, SwapV2 } from '@balancer-labs/sdk';
import { env } from '../../../app/env';
import { networkContext } from '../../network/network-context.service';
import { DeploymentEnv } from '../../network/network-config-types';
import { EMPTY_COWSWAP_RESPONSE } from './constants';

import VaultAbi from '../../pool/abi/Vault.json';
import { BigNumber } from 'ethers';

type CowSwapSwapType = 'buy' | 'sell';

class SwapResult implements Swap {
    public assetIn: string;
    public assetOut: string;

    constructor(private swap: GqlCowSwapApiResponse, public inputAmount: bigint, public outputAmount: bigint, private swapType: GqlSorSwapType) {
        this.assetIn = swap.tokenIn;
        this.assetOut = swap.tokenOut;
    }

    async getSwap(queryFirst = false): Promise<GqlCowSwapApiResponse> {
        if(queryFirst) {
            const swapType = this.mapSwapType(this.swapType);
            const deltas = await this.queryBatchSwap(swapType, this.swap.swaps, this.swap.tokenAddresses);
            const tokenInAmount = deltas[this.swap.tokenAddresses.indexOf(this.assetIn)].toString();
            const tokenOutAmount = deltas[this.swap.tokenAddresses.indexOf(this.assetOut)].abs().toString();
            // console.log(`UPDATE:`, this.inputAmount, this.outputAmount, tokenInAmount, tokenOutAmount, deltas.toString());
            return {
                ...this.swap,
                returnAmount: swapType === SwapTypes.SwapExactIn ? tokenOutAmount : tokenInAmount,
                swapAmount: swapType === SwapTypes.SwapExactIn ? tokenInAmount : tokenOutAmount,
            }
        }
        return this.swap;
    }

    private queryBatchSwap(swapType: SwapTypes, swaps: SwapV2[], assets: string[]): Promise<BigNumber[]> {
        const vaultContract = new Contract(networkContext.data.balancer.vault, VaultAbi, networkContext.provider);
        const funds: FundManagement = {
            sender: AddressZero,
            recipient: AddressZero,
            fromInternalBalance: false,
            toInternalBalance: false,
        };

        return vaultContract.queryBatchSwap(swapType, swaps, assets, funds);
    }

    private mapSwapType(swapType: GqlSorSwapType): SwapTypes {
        return swapType === "EXACT_IN" ? SwapTypes.SwapExactIn : SwapTypes.SwapExactOut;
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
        return new SwapResult(swap, BigInt(inputAmout), BigInt(outputAmout), swapType);
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