import { prisma } from '../../prisma/prisma-client';


export interface TradeResults {
    id: string;
    timestamp: number;
    chain: string;
    tokenIn: string;
    tokenOut: string;
    swapAmount: string;
    swapType: string;
    sorV1Result: string;
    sorV2Result: string;
    isSorV1: boolean;
}

export async function getTrades(): Promise<TradeResults[]> {
    return await prisma.prismaTradeResult.findMany();
}