import { BigNumber, ethers } from 'ethers';
import { NetworkConfig, NetworkData } from './network-config-types';
import { tokenService } from '../token/token.service';
import { WstethAprService } from '../pool/lib/apr-data-sources/optimism/wsteth-apr.service';
import { ReaperCryptAprService } from '../pool/lib/apr-data-sources/reaper-crypt-apr.service';
import { PhantomStableAprService } from '../pool/lib/apr-data-sources/phantom-stable-apr.service';
import { BoostedPoolAprService } from '../pool/lib/apr-data-sources/boosted-pool-apr.service';
import { SwapFeeAprService } from '../pool/lib/apr-data-sources/swap-fee-apr.service';
import { GaugeAprService } from '../pool/lib/apr-data-sources/ve-bal-gauge-apr.service';
import { GaugeStakingService } from '../pool/lib/staking/gauge-staking.service';
import { BptPriceHandlerService } from '../token/lib/token-price-handlers/bpt-price-handler.service';
import { LinearWrappedTokenPriceHandlerService } from '../token/lib/token-price-handlers/linear-wrapped-token-price-handler.service';
import { SwapsPriceHandlerService } from '../token/lib/token-price-handlers/swaps-price-handler.service';
import { UserSyncGaugeBalanceService } from '../user/lib/user-sync-gauge-balance.service';
import { every } from '../../worker/intervals';
import { GithubContentService } from '../content/github-content.service';
import { gaugeSubgraphService } from '../subgraphs/gauge-subgraph/gauge-subgraph.service';
import { coingeckoService } from '../coingecko/coingecko.service';
import { CoingeckoPriceHandlerService } from '../token/lib/token-price-handlers/coingecko-price-handler.service';
import { IbTokensAprService } from '../pool/lib/apr-data-sources/ib-tokens-apr.service';

const underlyingTokens = {
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
    wETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
};

export const mainnetNetworkData: NetworkData = {
    chain: {
        slug: 'ethereum',
        id: 1,
        nativeAssetAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        wrappedNativeAssetAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        prismaId: 'MAINNET',
        gqlId: 'MAINNET',
    },
    subgraphs: {
        startDate: '2019-04-20',
        balancer: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
        beetsBar: 'https://',
        blocks: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
        gauge: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
        veBalLocks: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
        userBalances: 'https://',
    },
    eth: {
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        addressFormatted: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'ETH',
        name: 'Ether',
    },
    weth: {
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        addressFormatted: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
    coingecko: {
        nativeAssetId: 'ethereum',
        platformId: 'ethereum',
        excludedTokenAddresses: [],
    },
    tokenPrices: {
        maxHourlyPriceHistoryNumDays: 100,
    },
    rpcUrl: 'https://cloudflare-eth.com',
    rpcMaxBlockRange: 700,
    beetsPriceProviderRpcUrl: 'https://rpc.ftm.tools',
    sanity: {
        projectId: '',
        dataset: '',
    },
    protocolToken: 'bal',
    beets: {
        address: '0x0000000000000000000000000000000000000000',
    },
    bal: {
        address: '0xba100000625a3754423978a60c9317c58a424e3D',
    },
    veBal: {
        address: '0xc128a9954e6c874ea3d62ce62b468ba073093f25',
        delegationProxy: '0x0000000000000000000000000000000000000000',
    },
    gaugeControllerAddress: '0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD',
    balancer: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        composableStablePoolFactories: [
            '0xf9ac7B9dF2b3454E841110CcE5550bD5AC6f875F',
            '0x85a80afee867aDf27B50BdB7b76DA70f1E853062',
            '0xdba127fBc23fb20F5929C546af220A991b5C6e01',
            '0xfADa0f4547AB2de89D1304A668C39B3E09Aa7c76',
            '0xDB8d758BCb971e482B2C45f7F8a7740283A1bd3A',
        ],
        weightedPoolV2Factories: [
            '0xcC508a455F5b0073973107Db6a878DdBDab957bC',
            '0x5Dd94Da3644DDD055fcf6B3E1aa310Bb7801EB8b',
            '0x897888115Ada5773E02aA29F775430BFB5F34c51',
        ],
        swapProtocolFeePercentage: 0.5,
        yieldProtocolFeePercentage: 0.5,
        poolDataQueryContract: '0xf5CDdF6feD9C589f1Be04899F48f9738531daD59',
        excludedPoolDataQueryPoolIds: ['0xf71d0774b214c4cf51e33eb3d30ef98132e4dbaa00000000000000000000046e'],
    },
    multicall: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    multicall3: '0xca11bde05977b3631167028862be2a173976ca11',
    masterchef: {
        address: '0x0000000000000000000000000000000000000000',
        excludedFarmIds: [],
    },
    avgBlockSpeed: 10,
    sor: {
        main: {
            url: 'https://uu6cfghhd5lqa7py3nojxkivd40zuugb.lambda-url.ca-central-1.on.aws/',
            maxPools: 8,
            forceRefresh: false,
            gasPrice: BigNumber.from(10),
            swapGas: BigNumber.from('1000000'),
        },
        canary: {
            url: 'https://ksa66wlkjbvteijxmflqjehsay0jmekw.lambda-url.eu-central-1.on.aws/',
            maxPools: 8,
            forceRefresh: false,
            gasPrice: BigNumber.from(10),
            swapGas: BigNumber.from('1000000'),
        },
    },
    ibAprConfig: {
        aave: {
            v2: {
                subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
                tokens: {
                    USDC: {
                        underlyingAssetAddress: underlyingTokens.USDC,
                        aTokenAddress: '0xbcca60bb61934080951369a648fb03df4f96263c',
                        wrappedTokens: {
                            waUSDC: '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de',
                        },
                    },
                    USDT: {
                        underlyingAssetAddress: underlyingTokens.USDT,
                        aTokenAddress: '0x3ed3b47dd13ec9a98b44e6204a523e766b225811',
                        wrappedTokens: {
                            waUSDT: '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58',
                        },
                    },
                    DAI: {
                        underlyingAssetAddress: underlyingTokens.DAI,
                        aTokenAddress: '0x028171bca77440897b824ca71d1c56cac55b68a3',
                        wrappedTokens: {
                            waDAI: '0x02d60b84491589974263d922d9cc7a3152618ef6',
                        },
                    },
                },
            },
            v3: {
                subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3',
                tokens: {
                    USDC: {
                        underlyingAssetAddress: underlyingTokens.USDC,
                        aTokenAddress: '0x98c23e9d8f34fefb1b7bd6a91b7ff122f4e16f5c',
                        wrappedTokens: {
                            waUSDC: '0x57d20c946a7a3812a7225b881cdcd8431d23431c',
                            stataEthUSDC: '0x02c2d189b45ce213a40097b62d311cf0dd16ec92',
                        },
                    },
                    USDT: {
                        underlyingAssetAddress: underlyingTokens.USDT,
                        aTokenAddress: '0x23878914efe38d27c4d67ab83ed1b93a74d4086a',
                        wrappedTokens: {
                            waUSDT: '0xa7e0e66f38b8ad8343cff67118c1f33e827d1455',
                            stataEthUSDT: '0x65799b9fd4206cdaa4a1db79254fcbc2fd2ffee6',
                        },
                    },
                    DAI: {
                        underlyingAssetAddress: underlyingTokens.DAI,
                        aTokenAddress: '0x018008bfb33d285247a21d44e50697654f754e63',
                        wrappedTokens: {
                            waDAI: '0x098256c06ab24f5655c5506a6488781bd711c14b',
                            stataEthDAI: '0x098256c06ab24f5655c5506a6488781bd711c14b',
                        },
                    },
                    wETH: {
                        underlyingAssetAddress: underlyingTokens.wETH,
                        aTokenAddress: '0x4d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e8',
                        wrappedTokens: {
                            waWETH: '0x59463bb67ddd04fe58ed291ba36c26d99a39fbc6',
                            stataEthWETH: '0x03928473f25bb2da6bc880b07ecbadc636822264',
                        },
                    },
                },
            },
        },
        ankr: {
            sourceUrl: 'https://api.staking.ankr.com/v1alpha/metrics',
            tokens: {
                ankrETH: {
                    address: '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb',
                    serviceName: 'eth',
                },
            },
        },
        euler: {
            subgraphUrl: 'https://api.thegraph.com/subgraphs/name/euler-xyz/euler-mainnet',
            tokens: {
                eUSDC: '0xeb91861f8a4e1c12333f42dce8fb0ecdc28da716',
                eDAI: '0xe025e3ca2be02316033184551d4d3aa22024d9dc',
                eUSDT: '0x4d19f33948b99800b6113ff3e83bec9b537c85d2',
                eFRAX: '0x5484451a88a35cd0878a1be177435ca8a0e4054e',
            },
        },
        gearbox: {
            sourceUrl: 'https://mainnet.gearbox.foundation/api/pools',
            tokens: {
                dDAI: '0x6cfaf95457d7688022fc53e7abe052ef8dfbbdba',
                dUSDC: '0xc411db5f5eb3f7d552f9b8454b2d74097ccde6e3',
            },
        },
        idle: {
            sourceUrl: 'https://api.idle.finance/junior-rates/',
            authorizationHeader:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IkFwcDciLCJpYXQiOjE2NzAyMzc1Mjd9.L12KJEt8fW1Cvy3o7Nl4OJ2wtEjzlObaAYJ9aC_CY6M',
            tokens: {
                idleDAI: {
                    address: '0xec9482040e6483b7459cc0db05d51dfa3d3068e1',
                    wrapped4626Address: '0x0c80f31b840c6564e6c5e18f386fad96b63514ca',
                },
                idleUSDC: {
                    address: '0xdc7777c771a6e4b3a82830781bdde4dbc78f320e',
                    wrapped4626Address: '0xc3da79e0de523eef7ac1e4ca9abfe3aac9973133',
                },
                idleUSDT: {
                    address: '0xfa3afc9a194babd56e743fa3b7aa2ccbed3eaaad',
                    wrapped4626Address: '0x544897a3b944fdeb1f94a0ed973ea31a80ae18e1',
                },
            },
        },
        tessera: {
            rpcUrl: 'https://rpc.ankr.com/eth',
            tokens: {
                sAPE: {
                    tesseraPoolAddress: '0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9',
                    tokenAddress: '0x7966c5bae631294d7cffcea5430b78c2f76db6fa',
                },
            },
        },
        tranchess: {
            sourceUrl: 'https://tranchess.com/eth/api/v3/funds',
            tokens: {
                qETH: {
                    address: '0x93ef1ea305d11a9b2a3ebb9bb4fcc34695292e7d',
                    underlyingAssetName: 'WETH',
                },
            },
        },
        defaultHandlers: {
            vETH: {
                tokens: {
                    vETH: '0x4bc3263eb5bb2ef7ad9ab6fb68be80e43b43801f',
                },
                sourceUrl: 'https://apy.liebi.com/veth',
                path: 'veth',
            },
            stETH: {
                tokens: {
                    stETH: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
                    wstETH: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
                },
                sourceUrl: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
                path: 'data.smaApr',
            },
            cbETH: {
                tokens: {
                    cbETH: '0xbe9895146f7af43049ca1c1ae358b0541ea49704',
                },
                sourceUrl: 'https://api.exchange.coinbase.com/wrapped-assets/CBETH/',
                path: 'apy',
                scale: 1,
            },
            sfrxETH: {
                tokens: { sfrxETH: '0xac3e018457b222d93114458476f3e3416abbe38f' },
                sourceUrl: 'https://api.frax.finance/v2/frxeth/summary/latest',
                path: 'sfrxethApr',
            },
            rETH: {
                tokens: {
                    rETH: '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593',
                },
                sourceUrl: 'https://drop-api.stafi.io/reth/v1/poolData',
                path: 'data.stakeApr',
            },
            USDR: {
                tokens: {
                    USDR: '0xaf0d9d65fc54de245cda37af3d18cbec860a4d4b',
                },
                sourceUrl: 'http://usdr-api.us-east-1.elasticbeanstalk.com/usdr/apy',
                path: 'usdr',
            },
            swETH: {
                tokens: {
                    swETH: '0xf951e335afb289353dc249e82926178eac7ded78',
                },
                sourceUrl: 'https://v3.svc.swellnetwork.io/api/tokens/sweth/apr',
            },
            wjAURA: {
                tokens: {
                    wjAURA: '0x198d7387fa97a73f05b8578cdeff8f2a1f34cd1f',
                },
                sourceUrl: 'https://data.jonesdao.io/api/v1/jones/apy-wjaura',
                path: 'wjauraApy',
            },
            overnight: {
                tokens: {
                    lpUsdcUsdPlus: '0x1aafc31091d93c3ff003cff5d2d8f7ba2e728425',
                    UsdcUsdPlus: '0x6933ec1ca55c06a894107860c92acdfd2dd8512f',
                },
                sourceUrl: 'https://app.overnight.fi/api/balancer/week/apr',
                group: 'OVERNIGHT',
                scale: 1,
            },
        },
    },
    beefy: {
        linearPools: [''],
    },
    lido: {
        wstEthAprEndpoint: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
        wstEthContract: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
    },
    datastudio: {
        main: {
            user: 'datafeed-service@datastudio-366113.iam.gserviceaccount.com',
            sheetId: '11anHUEb9snGwvB-errb5HvO8TvoLTRJhkDdD80Gxw1Q',
            databaseTabName: 'Database v2',
            compositionTabName: 'Pool Composition v2',
            emissionDataTabName: 'EmissionData',
        },
        canary: {
            user: 'datafeed-service@datastudio-366113.iam.gserviceaccount.com',
            sheetId: '1HnJOuRQXGy06tNgqjYMzQNIsaCSCC01Yxe_lZhXBDpY',
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

export const mainnetNetworkConfig: NetworkConfig = {
    data: mainnetNetworkData,
    contentService: new GithubContentService(),
    provider: new ethers.providers.JsonRpcProvider(mainnetNetworkData.rpcUrl),
    poolAprServices: [
        new IbTokensAprService(
            mainnetNetworkData.ibAprConfig,
            mainnetNetworkData.chain.prismaId,
            mainnetNetworkData.chain.id,
            tokenService,
        ),
        new WstethAprService(tokenService, mainnetNetworkData.lido!.wstEthContract),
        new PhantomStableAprService(),
        new BoostedPoolAprService(),
        new SwapFeeAprService(mainnetNetworkData.balancer.swapProtocolFeePercentage),
        new GaugeAprService(gaugeSubgraphService, tokenService, [
            mainnetNetworkData.beets.address,
            mainnetNetworkData.bal.address,
        ]),
    ],
    poolStakingServices: [new GaugeStakingService(gaugeSubgraphService)],
    tokenPriceHandlers: [
        new CoingeckoPriceHandlerService(coingeckoService),
        new BptPriceHandlerService(),
        new LinearWrappedTokenPriceHandlerService(),
        new SwapsPriceHandlerService(),
    ],
    userStakedBalanceServices: [new UserSyncGaugeBalanceService()],
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
            name: 'sync-tokens-from-pool-tokens',
            interval: every(5, 'minutes'),
        },
        {
            name: 'update-liquidity-24h-ago-for-all-pools',
            interval: every(5, 'minutes'),
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
            name: 'sync-coingecko-coinids',
            interval: every(2, 'hours'),
        },
        {
            name: 'purge-old-tokenprices',
            interval: every(1, 'days'),
            alarmEvaluationPeriod: 1,
            alarmDatapointsToAlarm: 1,
        },
        {
            name: 'update-fee-volume-yield-all-pools',
            interval: every(1, 'hours'),
        },
        {
            name: 'sync-vebal-balances',
            interval: every(1, 'minutes'),
        },
        {
            name: 'sync-vebal-totalSupply',
            interval: every(5, 'minutes'),
        },
        {
            name: 'sync-vebal-voting-gauges',
            interval: every(5, 'minutes'),
        },
        // The following are multichain jobs and should only run once for all chains.
        {
            name: 'sync-global-coingecko-prices',
            interval: every(2, 'minutes'),
        },
    ],
};
