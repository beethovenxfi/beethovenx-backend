import { GqlSorGetSwapsResponseNew, GqlSorSwapType } from '../../schema';
import { networkContext } from '../network/network-context.service';
import { sorV1Service } from './sorV1/sorV1.service';
import { sorV2Service } from './sorV2/sorV2.service';
import { prisma } from '../../prisma/prisma-client';
import { CowSwapApiResponse } from './sorV1/types';
import { Swap } from '@balancer/sdk';

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
    }: GetSwapsInput): Promise<GqlSorGetSwapsResponseNew> {
        const timestamp = Math.floor(Date.now() / 1000);

        const sorV1Result = await sorV1Service.getSwaps({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });

        const sorV2Result = await sorV2Service.getSwaps({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });

        const bestSwap = this.getBestSwap(sorV1Result, sorV2Result);
        // TODO - Compare V1 vs V2 result and return/log best

        // Update db with best result so we can track performace
        await prisma.prismaTradeResult.create({
            data: {
                id: `${timestamp}-${tokenIn}-${tokenOut}`,
                timestamp,
                chain: networkContext.chain,
                tokenIn,
                tokenOut,
                swapAmount,
                swapType,
                sorV1Result: sorV1Result.returnAmount,
                sorV2Result: sorV2Result.result,
                isSorV1
            }
        });

        // TODO - Return in current CowSwap format so its plug and play
        return {
            tokenIn,
            tokenOut,
            result: bestSwap
        }
    }

    private getBestSwap(v1: CowSwapApiResponse, v2: Swap | null): CowSwapApiResponse {
        if(!v2) {
            if(v1.returnAmount === '0') {
                console.log('NO RESULT');
            }
            else {
                console.log('V1');
            }
            return v1;
        }
        if(v2.outputAmount.amount < BigInt(v1.returnAmount)) {
            console.log('V1');
            return v1;
        } else {
            return sorV2Service.mapResultToCowSwap(v2);
        }
    }
}

export const sorService = new SorService();
