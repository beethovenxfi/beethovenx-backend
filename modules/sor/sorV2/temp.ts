import { 
    BasePool, 
    SubgraphPoolProvider, 
    ChainId, 
    OnChainPoolDataEnricher, 
    SmartOrderRouter, 
    sorGetSwapsWithPools, 
    Token, 
    SwapKind, 
} from '@balancer/sdk';
import { networkContext } from '../../network/network-context.service';

// TODO - Check if this has been deployed to same address across networks?
// - If we keep then can use: poolDataQueryContract: https://github.com/beethovenxfi/beethovenx-backend/blob/sor-v2/modules/network/network-config-types.ts#L87
const SOR_QUERIES = '0x1814a3b3e4362caf4eb54cd85b82d39bd7b34e41';

// Just using to compare results
// Fetches pools using Subgraph/Onchain queries.
export async function getSwapCompare(tIn: Token, tOut: Token, swapAmount: any) {
    console.time('poolsFromExternal');
    const poolsFromExternal = await getBasePoolsFromExternal();
    console.timeEnd('poolsFromExternal');
    const swap = await sorGetSwapsWithPools(
        tIn,
        tOut,
        SwapKind.GivenIn,
        swapAmount,
        poolsFromExternal,
        // swapOptions,
    );

    if (!swap) throw new Error('Swap is undefined');
    console.log(`Swap Compare:`);
    console.log(`No of pools: `, poolsFromExternal.length);
    console.log(swap.swaps);
    console.log(swap.outputAmount.amount.toString());
}

    /**
 * Uses b-sdk to fetch/enrich pools. Uses Subgraph and Onchain calls.
 * ! Used for test/compare right now.
 * @returns 
 */
async function getBasePoolsFromExternal(): Promise<BasePool[]> {
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