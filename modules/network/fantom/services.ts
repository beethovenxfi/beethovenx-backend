import { SpookySwapAprService } from '../../pool/lib/apr-data-sources/fantom/spooky-swap-apr.service';
import { tokenService } from '../../token/token.service';
import { PhantomStableAprService } from '../../pool/lib/apr-data-sources/phantom-stable-apr.service';
import { BoostedPoolAprService } from '../../pool/lib/apr-data-sources/boosted-pool-apr.service';
import { SwapFeeAprService } from '../../pool/lib/apr-data-sources/swap-fee-apr.service';
import { MasterchefFarmAprService } from '../../pool/lib/apr-data-sources/fantom/masterchef-farm-apr.service';
import { ReliquaryFarmAprService } from '../../pool/lib/apr-data-sources/fantom/reliquary-farm-apr.service';
import { MasterChefStakingService } from '../../pool/lib/staking/master-chef-staking.service';
import { masterchefService } from '../../subgraphs/masterchef-subgraph/masterchef.service';
import { ReliquaryStakingService } from '../../pool/lib/staking/reliquary-staking.service';
import { reliquarySubgraphService } from '../../subgraphs/reliquary-subgraph/reliquary.service';
import { BeetsPriceHandlerService } from '../../token/lib/token-price-handlers/beets-price-handler.service';
import { FbeetsPriceHandlerService } from '../../token/lib/token-price-handlers/fbeets-price-handler.service';
import { ClqdrPriceHandlerService } from '../../token/lib/token-price-handlers/clqdr-price-handler.service';
import { BptPriceHandlerService } from '../../token/lib/token-price-handlers/bpt-price-handler.service';
import { LinearWrappedTokenPriceHandlerService } from '../../token/lib/token-price-handlers/linear-wrapped-token-price-handler.service';
import { SwapsPriceHandlerService } from '../../token/lib/token-price-handlers/swaps-price-handler.service';
import { UserSyncMasterchefFarmBalanceService } from '../../user/lib/user-sync-masterchef-farm-balance.service';
import { UserSyncReliquaryFarmBalanceService } from '../../user/lib/user-sync-reliquary-farm-balance.service';
import { SanityContentService } from '../../content/sanity-content.service';
import { CoingeckoPriceHandlerService } from '../../token/lib/token-price-handlers/coingecko-price-handler.service';
import { coingeckoService } from '../../coingecko/coingecko.service';
import { IbTokensAprService } from '../../pool/lib/apr-data-sources/ib-tokens-apr.service';
import { BeetswarsGaugeVotingAprService } from '../../pool/lib/apr-data-sources/fantom/beetswars-gauge-voting-apr';
import { fantomNetworkData as data } from './data';

export const createFantomServices = () => ({
    contentService: new SanityContentService(),
    poolAprServices: [
        new IbTokensAprService(data.ibAprConfig),
        // new SpookySwapAprService(tokenService, data.spooky!.xBooContract),
        new PhantomStableAprService(),
        new BoostedPoolAprService(),
        new SwapFeeAprService(data.balancer.swapProtocolFeePercentage),
        new MasterchefFarmAprService(data.beets!.address),
        new ReliquaryFarmAprService(data.beets!.address),
        new BeetswarsGaugeVotingAprService(),
    ],
    poolStakingServices: [
        new MasterChefStakingService(masterchefService, data.masterchef!.excludedFarmIds),
        new ReliquaryStakingService(data.reliquary!.address, reliquarySubgraphService),
    ],
    tokenPriceHandlers: [
        new BeetsPriceHandlerService(
            data.beets!.address,
            data.beets!.beetsPriceProviderRpcUrl,
        ),
        new FbeetsPriceHandlerService(data.fbeets!.address, data.fbeets!.poolId),
        new ClqdrPriceHandlerService(),
        new CoingeckoPriceHandlerService(coingeckoService),
        new BptPriceHandlerService(),
        new LinearWrappedTokenPriceHandlerService(),
        new SwapsPriceHandlerService(),
    ],
    userStakedBalanceServices: [
        new UserSyncMasterchefFarmBalanceService(
            data.fbeets!.address,
            data.fbeets!.farmId,
            data.masterchef!.address,
            data.masterchef!.excludedFarmIds,
        ),
        new UserSyncReliquaryFarmBalanceService(data.reliquary!.address),
    ],
});
