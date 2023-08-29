import { BigNumber, ethers } from 'ethers';
import { NetworkConfig, NetworkData } from './network-config-types';
import { tokenService } from '../token/token.service';
import { StaderStakedFtmAprService } from '../pool/lib/apr-data-sources/fantom/stader-staked-ftm-apr.service';
import { PhantomStableAprService } from '../pool/lib/apr-data-sources/phantom-stable-apr.service';
import { BoostedPoolAprService } from '../pool/lib/apr-data-sources/boosted-pool-apr.service';
import { SwapFeeAprService } from '../pool/lib/apr-data-sources/swap-fee-apr.service';
import { MasterchefFarmAprService } from '../pool/lib/apr-data-sources/fantom/masterchef-farm-apr.service';
import { ReliquaryFarmAprService } from '../pool/lib/apr-data-sources/fantom/reliquary-farm-apr.service';
import { MasterChefStakingService } from '../pool/lib/staking/master-chef-staking.service';
import { masterchefService } from '../subgraphs/masterchef-subgraph/masterchef.service';
import { ReliquaryStakingService } from '../pool/lib/staking/reliquary-staking.service';
import { reliquarySubgraphService } from '../subgraphs/reliquary-subgraph/reliquary.service';
import { BeetsPriceHandlerService } from '../token/lib/token-price-handlers/beets-price-handler.service';
import { FbeetsPriceHandlerService } from '../token/lib/token-price-handlers/fbeets-price-handler.service';
import { ClqdrPriceHandlerService } from '../token/lib/token-price-handlers/clqdr-price-handler.service';
import { BptPriceHandlerService } from '../token/lib/token-price-handlers/bpt-price-handler.service';
import { LinearWrappedTokenPriceHandlerService } from '../token/lib/token-price-handlers/linear-wrapped-token-price-handler.service';
import { SwapsPriceHandlerService } from '../token/lib/token-price-handlers/swaps-price-handler.service';
import { UserSyncMasterchefFarmBalanceService } from '../user/lib/user-sync-masterchef-farm-balance.service';
import { UserSyncReliquaryFarmBalanceService } from '../user/lib/user-sync-reliquary-farm-balance.service';
import { every } from '../../worker/intervals';
import { SanityContentService } from '../content/sanity-content.service';
import { CoingeckoPriceHandlerService } from '../token/lib/token-price-handlers/coingecko-price-handler.service';
import { coingeckoService } from '../coingecko/coingecko.service';
import { IbTokensAprService } from '../pool/lib/apr-data-sources/ib-tokens-apr.service';

const fantomNetworkData: NetworkData = {
    chain: {
        slug: 'fantom',
        id: 250,
        nativeAssetAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        wrappedNativeAssetAddress: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        prismaId: 'FANTOM',
        gqlId: 'FANTOM',
    },
    subgraphs: {
        startDate: '2021-10-08',
        balancer: 'https://api.thegraph.com/subgraphs/name/beethovenxfi/beethovenx',
        beetsBar: 'https://api.thegraph.com/subgraphs/name/beethovenxfi/beets-bar',
        blocks: 'https://api.thegraph.com/subgraphs/name/beethovenxfi/fantom-blocks',
        masterchef: 'https://api.thegraph.com/subgraphs/name/beethovenxfi/masterchefv2',
        reliquary: 'https://api.thegraph.com/subgraphs/name/beethovenxfi/reliquary',
        userBalances: 'https://api.thegraph.com/subgraphs/name/beethovenxfi/user-bpt-balances-fantom',
    },
    eth: {
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        addressFormatted: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'FTM',
        name: 'Fantom',
    },
    weth: {
        address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        addressFormatted: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    },
    coingecko: {
        nativeAssetId: 'fantom',
        platformId: 'fantom',
        excludedTokenAddresses: [
            '0x04068da6c83afcfa0e13ba15a6696662335d5b75', // multi usdc
            '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e', // multi usdt
            '0x049d68029688eabf473097a2fc38ef61633a3c7a', // multi dai
            '0x321162cd933e2be498cd2267a90534a804051b11', // multi wbtc
            '0x74b23882a30290451a17c44f4f05243b6b58c76d', // mutli weth
            '0xcfc785741dc0e98ad4c9f6394bb9d43cd1ef5179', // ankrftm
        ],
    },
    tokenPrices: {
        maxHourlyPriceHistoryNumDays: 100,
    },
    rpcUrl: 'https://rpc.ftm.tools',
    rpcMaxBlockRange: 2000,
    beetsPriceProviderRpcUrl: 'https://rpc.ftm.tools',
    sanity: {
        projectId: '1g2ag2hb',
        dataset: 'production',
    },
    protocolToken: 'beets',
    beets: {
        address: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e',
    },
    fbeets: {
        address: '0xfcef8a994209d6916eb2c86cdd2afd60aa6f54b1',
        farmId: '22',
        poolId: '0xcde5a11a4acb4ee4c805352cec57e236bdbc3837000200000000000000000019',
        poolAddress: '0xcde5a11a4acb4ee4c805352cec57e236bdbc3837',
    },
    bal: {
        address: '',
    },
    balancer: {
        vault: '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce',
        composableStablePoolFactories: [
            '0x5AdAF6509BCEc3219455348AC45d6D3261b1A990',
            '0xB384A86F2Fd7788720db42f9daa60fc07EcBeA06',
            '0x44814E3A603bb7F1198617995c5696C232F6e8Ed',
            '0x911566c808bF00acB200B418564440A2Af177548',
            '0x5c3094982cF3c97A06b7d62A6f7669F14a199B19',
            '0x23F03a4fb344d8B98833d2ACe093cc305E03474f',
        ],
        weightedPoolV2Factories: [
            '0xB2ED595Afc445b47Db7043bEC25e772bf0FA1fbb',
            '0x8ea1c497c16726E097f62C8C9FBD944143F27090',
            '0xea87F3dFfc679035653C0FBa70e7bfe46E3FB733',
            '0xd678b6Acd834Cc969Bb19Ce82727f2a541fb7941',
            '0xb841Df73861E65E6D61a80F503F095a91ce75e15',
        ],
        swapProtocolFeePercentage: 0.25,
        yieldProtocolFeePercentage: 0.25,
        poolDataQueryContract: '0x9642Dbba0753B1518022d7617Be079f0d7EFD165',
        factoriesWithpoolSpecificProtocolFeePercentagesProvider: [
            '0xb841df73861e65e6d61a80f503f095a91ce75e15',
            '0x5c3094982cf3c97a06b7d62a6f7669f14a199b19',
        ],
    },
    multicall: '0x66335d7ad8011f6aa3f48aadcb523b62b38ed961',
    multicall3: '0xca11bde05977b3631167028862be2a173976ca11',
    masterchef: {
        address: '0x8166994d9ebBe5829EC86Bd81258149B87faCfd3',
        excludedFarmIds: [
            '34', //OHM bonding farm
            '28', //OHM bonding farm
            '9', //old fidellio dueto (non fbeets)
            '98', //reliquary beets streaming farm
        ],
    },
    reliquary: {
        address: '0x1ed6411670c709F4e163854654BD52c74E66D7eC',
        excludedFarmIds: [
            '0', // test with dummy token
            '1', // test with fresh beets pool BPT
        ],
    },
    avgBlockSpeed: 1,
    sor: {
        main: {
            url: 'https://2bz6hsr2y54svqgow7tbwwsrta0icouy.lambda-url.ca-central-1.on.aws/',
            maxPools: 8,
            forceRefresh: false,
            gasPrice: BigNumber.from(10),
            swapGas: BigNumber.from('1000000'),
        },
        canary: {
            url: 'https://mep53ds2noe6rhicd67q7raqhq0dkupc.lambda-url.eu-central-1.on.aws/',
            maxPools: 8,
            forceRefresh: false,
            gasPrice: BigNumber.from(10),
            swapGas: BigNumber.from('1000000'),
        },
    },
    ibAprConfig: {
        ankr: {
            sourceUrl: 'https://api.staking.ankr.com/v1alpha/metrics',
            tokens: {
                ankrETH: {
                    address: '0x12d8ce035c5de3ce39b1fdd4c1d5a745eaba3b8c',
                    serviceName: 'eth',
                },
                ankrFTM: {
                    address: '0xcfc785741dc0e98ad4c9f6394bb9d43cd1ef5179',
                    serviceName: 'ftm',
                },
            },
        },
        reaper: {
            multiStrategy: {
                subgraphUrl: 'https://api.thegraph.com/subgraphs/name/byte-masons/multi-strategy-vaults-fantom',
                tokens: {
                    rfwBTC: {
                        address: '0xfa985463b7fa975d06cde703ec72efccf293c605',
                    },
                    rffUSDT: {
                        address: '0xaea55c0e84af6e5ef8c9b7042fb6ab682516214a',
                    },
                    rfWFTM: {
                        address: '0x963ffcd14d471e279245ee1570ad64ca78d8e67e',
                    },
                    rfWETH: {
                        address: '0xc052627bc73117d2cb3569f133419550156bdfa1',
                    },
                    rfDAI: {
                        address: '0x16e4399fa9ba6e58f12bf2d2bc35f8bde8a9a4ab',
                    },
                    rfUSDC: {
                        address: '0xd55c59da5872de866e39b1e3af2065330ea8acd6',
                    },
                    rfUSDCCrypt: {
                        // Not named as Multi-Strategy in the contract, but is multi-strategy
                        address: '0x4455aef4b5d8ffe3436184e8a1ec99607f9a4340',
                    },
                    rfWFTMCrypt: {
                        // Not named Multi-Strategy in the contract, but is multi-strategy
                        address: '0xe4a54b6a175cf3f6d7a5e8ab7544c3e6e364dbf9',
                    },
                    rfWETHCrypt: {
                        // Not named Multi-Strategy in the contract, but is multi-strategy
                        address: '0x152d62dccc2c7c7930c4483cc2a24fefd23c24c2',
                    },
                    rfDAICrypt: {
                        // Not named Multi-Strategy in the contract, but is multi-strategy
                        address: '0x5427f192137405e6a4143d1c3321359bab2dbd87',
                    },
                    rfWBTCCrypt: {
                        // Not named Multi-Strategy in the contract, but is multi-strategy
                        address: '0x660c6ec76bd83f53263681f83cbeb35042dcd1cc',
                    },
                },
            },
            singleStrategy: {
                averageAPRAcrossLastNHarvests: 5,
                tokens: {
                    rfGrainSFTMX: {
                        address: '0xab30a4956c7d838234e24f1c3e50082c0607f35f',
                        isSftmX: true,
                    },
                    rfGrainFTM: {
                        address: '0xc5b29d59d0b4717aa0dd8d11597d9fd3a05d86bb',
                    },
                },
            },
        },
        yearn: {
            sourceUrl: 'https://d28fcsszptni1s.cloudfront.net/v1/chains/250/vaults/all',
        },
    },
    copper: {
        proxyAddress: '0xbC8a71C75ffbd2807c021F4F81a8832392dEF93c',
    },
    beefy: {
        linearPools: [''],
    },
    spooky: {
        xBooContract: '0x841fad6eae12c286d1fd18d1d525dffa75c7effe',
    },
    stader: {
        sFtmxContract: '0xd7028092c830b5c8fce061af2e593413ebbc1fc1',
    },
    ankr: {
        ankrFtmContract: '0xcfc785741dc0e98ad4c9f6394bb9d43cd1ef5179',
        ankrEthContract: '0x12d8ce035c5de3ce39b1fdd4c1d5a745eaba3b8c',
    },
    datastudio: {
        main: {
            user: 'datafeed-service@datastudio-366113.iam.gserviceaccount.com',
            sheetId: '1Ifbfh8njyssWKuLlUvlfXt-r3rnd4gAIP5sSM-lEuBU',
            databaseTabName: 'Database v2',
            compositionTabName: 'Pool Composition v2',
            emissionDataTabName: 'EmissionData',
        },
        canary: {
            user: 'datafeed-service@datastudio-366113.iam.gserviceaccount.com',
            sheetId: '17bYDbQAdMwGevfJ7thiwI8mjYeZppVRi8gD8ER6CtSs',
            databaseTabName: 'Database v2',
            compositionTabName: 'Pool Composition v2',
            emissionDataTabName: 'EmissionData',
        },
    },
    monitoring: {
        main: {
            alarmTopicArn: 'arn:aws:sns:ca-central-1:118697801881:api_alarms',
        },
        canary: {
            alarmTopicArn: 'arn:aws:sns:eu-central-1:118697801881:api_alarms',
        },
    },
};

export const fantomNetworkConfig: NetworkConfig = {
    data: fantomNetworkData,
    contentService: new SanityContentService(),
    provider: new ethers.providers.JsonRpcProvider(fantomNetworkData.rpcUrl),
    poolAprServices: [
        new IbTokensAprService(
            fantomNetworkData.ibAprConfig,
            fantomNetworkData.chain.prismaId,
            fantomNetworkData.chain.id,
            tokenService,
        ),
        // new SpookySwapAprService(tokenService, fantomNetworkData.spooky!.xBooContract),
        new StaderStakedFtmAprService(tokenService, fantomNetworkData.stader!.sFtmxContract),
        new PhantomStableAprService(),
        new BoostedPoolAprService(),
        new SwapFeeAprService(fantomNetworkData.balancer.swapProtocolFeePercentage),
        new MasterchefFarmAprService(),
        new ReliquaryFarmAprService(),
    ],
    poolStakingServices: [
        new MasterChefStakingService(masterchefService),
        new ReliquaryStakingService(fantomNetworkData.reliquary!.address, reliquarySubgraphService),
    ],
    tokenPriceHandlers: [
        new BeetsPriceHandlerService(),
        new FbeetsPriceHandlerService(fantomNetworkData.fbeets!.address, fantomNetworkData.fbeets!.poolId),
        new ClqdrPriceHandlerService(),
        new CoingeckoPriceHandlerService(coingeckoService),
        new BptPriceHandlerService(),
        new LinearWrappedTokenPriceHandlerService(),
        new SwapsPriceHandlerService(),
    ],
    userStakedBalanceServices: [
        new UserSyncMasterchefFarmBalanceService(fantomNetworkData.fbeets!.address, fantomNetworkData.fbeets!.farmId),
        new UserSyncReliquaryFarmBalanceService(fantomNetworkData.reliquary!.address),
    ],
    /*
    For sub-minute jobs we set the alarmEvaluationPeriod and alarmDatapointsToAlarm to 1 instead of the default 3. 
    This is needed because the minimum alarm period is 1 minute and we want the alarm to trigger already after 1 minute instead of 3.

    For every 1 days jobs we set the alarmEvaluationPeriod and alarmDatapointsToAlarm to 1 instead of the default 3. 
    This is needed because the maximum alarm evaluation period is 1 day (period * evaluationPeriod).
    */
    workerJobs: [
        {
            name: 'update-token-prices',
            interval: every(2, 'minutes'),
        },
        {
            name: 'update-liquidity-for-inactive-pools',
            interval: every(1, 'days'),
            alarmEvaluationPeriod: 1,
            alarmDatapointsToAlarm: 1,
        },
        {
            name: 'update-liquidity-for-active-pools',
            interval: every(1, 'minutes'),
        },
        {
            name: 'update-pool-apr',
            interval: every(1, 'minutes'),
        },
        {
            name: 'load-on-chain-data-for-pools-with-active-updates',
            interval: every(1, 'minutes'),
        },
        {
            name: 'sync-new-pools-from-subgraph',
            interval: every(1, 'minutes'),
        },
        {
            name: 'sync-sanity-pool-data',
            interval: every(3, 'minutes'),
        },
        {
            name: 'sync-tokens-from-pool-tokens',
            interval: every(5, 'minutes'),
        },
        {
            name: 'update-liquidity-24h-ago-for-all-pools',
            interval: every(5, 'minutes'),
        },
        {
            name: 'sync-fbeets-ratio',
            interval: every(12, 'hours'),
        },
        {
            name: 'cache-average-block-time',
            interval: every(1, 'hours'),
        },
        {
            name: 'sync-staking-for-pools',
            interval: every(5, 'minutes'),
        },
        {
            name: 'cache-protocol-data',
            interval: every(1, 'minutes'),
        },
        {
            name: 'sync-latest-snapshots-for-all-pools',
            interval: every(1, 'hours'),
        },
        {
            name: 'update-lifetime-values-for-all-pools',
            interval: every(30, 'minutes'),
        },
        {
            name: 'sync-changed-pools',
            interval: every(15, 'seconds'),
            alarmEvaluationPeriod: 1,
            alarmDatapointsToAlarm: 1,
        },
        {
            name: 'user-sync-wallet-balances-for-all-pools',
            interval: every(10, 'seconds'),
            alarmEvaluationPeriod: 1,
            alarmDatapointsToAlarm: 1,
        },
        {
            name: 'user-sync-staked-balances',
            interval: every(10, 'seconds'),
            alarmEvaluationPeriod: 1,
            alarmDatapointsToAlarm: 1,
        },
        {
            name: 'sync-user-snapshots',
            interval: every(1, 'hours'),
        },
        {
            name: 'sync-latest-reliquary-snapshots',
            interval: every(1, 'hours'),
        },
        {
            name: 'sync-latest-relic-snapshots',
            interval: every(1, 'hours'),
        },
        {
            name: 'purge-old-tokenprices',
            interval: every(1, 'days'),
            alarmEvaluationPeriod: 1,
            alarmDatapointsToAlarm: 1,
        },
        {
            name: 'sync-coingecko-coinids',
            interval: every(2, 'hours'),
        },
        {
            name: 'update-fee-volume-yield-all-pools',
            interval: every(1, 'hours'),
        },
        {
            name: 'feed-data-to-datastudio',
            interval: every(1, 'minutes'),
        },
    ],
};
