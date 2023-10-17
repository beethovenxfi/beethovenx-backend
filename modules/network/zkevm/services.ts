import { tokenService } from '../../token/token.service';
import { PhantomStableAprService } from '../../pool/lib/apr-data-sources/phantom-stable-apr.service';
import { BoostedPoolAprService } from '../../pool/lib/apr-data-sources/boosted-pool-apr.service';
import { SwapFeeAprService } from '../../pool/lib/apr-data-sources/swap-fee-apr.service';
import { BptPriceHandlerService } from '../../token/lib/token-price-handlers/bpt-price-handler.service';
import { LinearWrappedTokenPriceHandlerService } from '../../token/lib/token-price-handlers/linear-wrapped-token-price-handler.service';
import { SwapsPriceHandlerService } from '../../token/lib/token-price-handlers/swaps-price-handler.service';
import { CoingeckoPriceHandlerService } from '../../token/lib/token-price-handlers/coingecko-price-handler.service';
import { coingeckoService } from '../../coingecko/coingecko.service';
import { IbTokensAprService } from '../../pool/lib/apr-data-sources/ib-tokens-apr.service';
import { GithubContentService } from '../../content/github-content.service';
import { GaugeAprService } from '../../pool/lib/apr-data-sources/ve-bal-gauge-apr.service';
import { GaugeStakingService } from '../../pool/lib/staking/gauge-staking.service';
import { gaugeSubgraphService } from '../../subgraphs/gauge-subgraph/gauge-subgraph.service';
import { UserSyncGaugeBalanceService } from '../../user/lib/user-sync-gauge-balance.service';
import { data } from './data';

export const createServices = () => ({
    contentService: new GithubContentService(),
    poolAprServices: [
        new IbTokensAprService(data.ibAprConfig),
        new PhantomStableAprService(),
        new BoostedPoolAprService(),
        new SwapFeeAprService(data.balancer.swapProtocolFeePercentage),
        new GaugeAprService(tokenService, [data.bal!.address]),
    ],
    poolStakingServices: [new GaugeStakingService(gaugeSubgraphService, data.bal!.address)],
    tokenPriceHandlers: [
        new CoingeckoPriceHandlerService(coingeckoService),
        new BptPriceHandlerService(),
        new LinearWrappedTokenPriceHandlerService(),
        new SwapsPriceHandlerService(),
    ],
    userStakedBalanceServices: [new UserSyncGaugeBalanceService()],
});
