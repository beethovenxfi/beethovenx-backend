import axios from 'axios';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { GqlSorSwapType, GqlCowSwapApiResponse, GqlSorGetSwapsResponse } from '../../../schema';
import { GetSwapsInput, SwapService, SwapResult } from '../types';
import { FundManagement, SwapTypes, SwapV2 } from '@balancer-labs/sdk';
import { env } from '../../../app/env';
import { networkContext } from '../../network/network-context.service';
import { DeploymentEnv } from '../../network/network-config-types';

import VaultAbi from '../../pool/abi/Vault.json';
import { BigNumber } from 'ethers';
import { TokenAmount } from '@balancer/sdk';

type CowSwapSwapType = 'buy' | 'sell';

class SwapResultV1 implements SwapResult {
    public inputAmount: bigint = BigInt(0);
    public outputAmount: bigint = BigInt(0);
    public isValid: boolean;

    constructor(private swap: GqlCowSwapApiResponse | null, private swapType: GqlSorSwapType) {
        if (swap === null) {
            this.isValid = false;
            this.swap = null;
        } else {
            this.inputAmount = swapType === 'EXACT_IN' ? BigInt(swap.swapAmount) : BigInt(swap.returnAmount);
            this.outputAmount = swapType === 'EXACT_IN' ? BigInt(swap.returnAmount) : BigInt(swap.swapAmount);
            this.isValid = swap.swaps.length === 0 ? false : true;
        }
    }

    async getCowSwapResponse(queryFirst = false): Promise<GqlCowSwapApiResponse> {
        if (!this.isValid || this.swap === null) throw new Error('No Response - Invalid Swap');

        if (queryFirst) {
            const swapType = this.mapSwapType(this.swapType);
            const deltas = await this.queryBatchSwap(swapType, this.swap.swaps, this.swap.tokenAddresses);
            const tokenInAmount = deltas[this.swap.tokenAddresses.indexOf(this.swap.tokenIn)].toString();
            const tokenOutAmount = deltas[this.swap.tokenAddresses.indexOf(this.swap.tokenOut)].abs().toString();
            // console.log(`UPDATE:`, this.inputAmount, this.outputAmount, tokenInAmount, tokenOutAmount, deltas.toString());
            return {
                ...this.swap,
                returnAmount: swapType === SwapTypes.SwapExactIn ? tokenOutAmount : tokenInAmount,
                swapAmount: swapType === SwapTypes.SwapExactIn ? tokenInAmount : tokenOutAmount,
            };
        }
        return this.swap;
    }

    async getBeetsSwapResponse(queryFirst: boolean): Promise<GqlSorGetSwapsResponse> {
        throw new Error('Use Beets service.');
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
        return swapType === 'EXACT_IN' ? SwapTypes.SwapExactIn : SwapTypes.SwapExactOut;
    }
}
export class SorV1BalancerService implements SwapService {
    public async getSwapResult({ tokenIn, tokenOut, swapType, swapAmount }: GetSwapsInput): Promise<SwapResult> {
        try {
            const swap = await this.querySorBalancer(swapType, tokenIn, tokenOut, swapAmount);
            return new SwapResultV1(swap, swapType);
        } catch (err) {
            console.log(`sorV1 Service Error`, err);
            return new SwapResultV1(null, swapType);
        }
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
        swapAmount: TokenAmount,
    ): Promise<GqlCowSwapApiResponse> {
        const endPoint = `https://api.balancer.fi/sor/${networkContext.chainId}`;
        const gasPrice = networkContext.data.sor[env.DEPLOYMENT_ENV as DeploymentEnv].gasPrice.toString();
        const swapData = {
            orderKind: this.mapSwapType(swapType),
            sellToken: tokenIn,
            buyToken: tokenOut,
            amount: swapAmount.amount.toString(),
            gasPrice,
        };

        const { data } = await axios.post<GqlCowSwapApiResponse>(endPoint, swapData);
        return data;
    }

    private mapSwapType(swapType: GqlSorSwapType): CowSwapSwapType {
        return swapType === 'EXACT_IN' ? 'sell' : 'buy';
    }
}

export const sorV1BalancerService = new SorV1BalancerService();
