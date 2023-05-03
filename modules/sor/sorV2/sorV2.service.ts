import { BasePool, SubgraphPoolProvider, ChainId, OnChainPoolDataEnricher, SmartOrderRouter, sorGetSwapsWithPools, Token, Address, SwapKind } from '@balancer/sdk';
import { GqlSorGetSwapsResponseNew } from '../../../schema';
import { PrismaToken } from '@prisma/client';
import { GetSwapsInput } from '../sor.service';
import { tokenService } from '../../token/token.service';
import { networkContext } from '../../network/network-context.service';

// TODO - Check if this has been deployed to same address across networks?
const SOR_QUERIES = '0x1814a3b3e4362caf4eb54cd85b82d39bd7b34e41';

export class SorV2Service {
    private async getToken(tokenAddr: Address, chainId: ChainId): Promise<Token> {
        const tokens = await tokenService.getTokens();
        const prismaToken = this.getPrismaToken(tokenAddr, tokens);
        return new Token(
            chainId,
            tokenAddr,
            prismaToken.decimals,
            prismaToken.symbol,
        );

    }

    private getPrismaToken(tokenAddress: string, tokens: PrismaToken[]): PrismaToken {
        tokenAddress = tokenAddress.toLowerCase();
        const match = tokens.find((token) => token.address === tokenAddress);

        if (!match) {
            throw new Error('Unknown token: ' + tokenAddress);
        }
        return match;
    }

    public async getSwaps({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<GqlSorGetSwapsResponseNew> {
        const pools = await this.getPools();
        const chainId = networkContext.chainId as unknown as ChainId;
        const tIn = await this.getToken(tokenIn as Address, chainId);
        const tOut = await this.getToken(tokenOut as Address, chainId);
        const swap = await sorGetSwapsWithPools(
                    tIn,
                    tOut,
                    SwapKind.GivenIn,
                    swapAmount,
                    pools,
                    // swapOptions,
                );

        if (!swap) throw new Error('Swap is undefined');
        console.log(`Swap`);
        console.log(swap.swaps);
        const result = swap.outputAmount.amount.toString();
        return {
            tokenIn,
            tokenOut,
            result
        }  
    }

    private async getPools(): Promise<BasePool[]> {
        // TODO - Can map this from existing pool data? Or make separate cron job?
        console.log(`Fetching pools...`);
        const chainId = networkContext.chainId as unknown as ChainId;
        const subgraphPoolDataService = new SubgraphPoolProvider(chainId);
        const onChainPoolDataEnricher = new OnChainPoolDataEnricher(
            networkContext.data.rpcUrl,
            SOR_QUERIES,
        );

        const sor = new SmartOrderRouter({
            chainId: chainId,
            poolDataProviders: subgraphPoolDataService,
            poolDataEnrichers: onChainPoolDataEnricher,
            rpcUrl: networkContext.data.rpcUrl,
        });
        const pools = await sor.fetchAndCachePools();
        return pools;
    }
}

export const sorV2Service = new SorV2Service();