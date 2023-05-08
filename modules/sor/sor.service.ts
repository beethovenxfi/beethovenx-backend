import { GqlSorGetSwapsResponseNew, GqlSorSwapType } from '../../schema';
import { networkContext } from '../network/network-context.service';
import { sorV2Service } from './sorV2/sorV2.service';
import { prisma } from '../../prisma/prisma-client';

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

        // TODO - SORV1 result - via API call to current API or using SORV1/pools directly?
        const sorV1Result = 'TODO';

        const sorV2Result = await sorV2Service.getSwaps({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });

        let isSorV1 = false;
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
                sorV1Result,
                sorV2Result: sorV2Result.result,
                isSorV1
            }
        });

        // TODO - Return in current CowSwap format so its plug and play
        return {
            tokenIn,
            tokenOut,
            result: isSorV1 ? sorV1Result : sorV2Service.mapResultToCowSwap(sorV2Result.result)
        }
    }
}

export const sorService = new SorService();
