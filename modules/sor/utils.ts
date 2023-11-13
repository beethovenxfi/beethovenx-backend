import { TokenAmount, Token, Address, ChainId } from '@balancer/sdk';
import { tokenService } from '../token/token.service';
import { networkContext } from '../network/network-context.service';
import { Chain } from '@prisma/client';
import { chainToIdMap } from '../network/network-config';


export async function getTokenAmountHuman(tokenAddr: string, humanAmount: string): Promise<TokenAmount> {
    const prismaToken = await tokenService.getToken(tokenAddr);
    if (!prismaToken) throw Error(`Missing token from tokenService ${tokenAddr}`);
    const chainId = networkContext.chainId as unknown as ChainId;
    const token = new Token(chainId, prismaToken.address as Address, prismaToken.decimals);
    return TokenAmount.fromHumanAmount(token, humanAmount as `${number}`);
}

export async function getTokenAmountRaw(tokenAddr: string, rawAmount: string, chain: Chain): Promise<TokenAmount> {
    const chainId = Number(chainToIdMap[chain]);
    const prismaToken = await tokenService.getToken(tokenAddr, chain);
    if (!prismaToken) throw Error(`Missing token from tokenService ${tokenAddr}`);
    const token = new Token(chainId, prismaToken.address as Address, prismaToken.decimals);
    return TokenAmount.fromRawAmount(token, rawAmount);
}
