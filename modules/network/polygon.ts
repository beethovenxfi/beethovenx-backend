import { BigNumber, ethers } from 'ethers';
import { NetworkConfig, NetworkData } from './network-config-types';
import { tokenService } from '../token/token.service';
import { PhantomStableAprService } from '../pool/lib/apr-data-sources/phantom-stable-apr.service';
import { BoostedPoolAprService } from '../pool/lib/apr-data-sources/boosted-pool-apr.service';
import { SwapFeeAprService } from '../pool/lib/apr-data-sources/swap-fee-apr.service';
import { GaugeAprService } from '../pool/lib/apr-data-sources/ve-bal-guage-apr.service';
import { GaugeStakingService } from '../pool/lib/staking/gauge-staking.service';
import { BeetsPriceHandlerService } from '../token/lib/token-price-handlers/beets-price-handler.service';
import { BptPriceHandlerService } from '../token/lib/token-price-handlers/bpt-price-handler.service';
import { LinearWrappedTokenPriceHandlerService } from '../token/lib/token-price-handlers/linear-wrapped-token-price-handler.service';
import { SwapsPriceHandlerService } from '../token/lib/token-price-handlers/swaps-price-handler.service';
import { UserSyncGaugeBalanceService } from '../user/lib/user-sync-gauge-balance.service';
import { every } from '../../worker/intervals';
import { GithubContentService } from '../content/github-content.service';
import { gaugeSubgraphService } from '../subgraphs/gauge-subgraph/gauge-subgraph.service';

const polygonNetworkData: NetworkData = {
    chain: {
        slug: 'polygon',
        id: 137,
        nativeAssetAddress: '0x0000000000000000000000000000000000001010',
        wrappedNativeAssetAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        prismaId: 'POLYGON',
        gqlId: 'POLYGON',
    },
    subgraphs: {
        startDate: '2021-06-16',
        balancer: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-prune-v2',
        beetsBar: 'https://',
        blocks: 'https://api.thegraph.com/subgraphs/name/ianlapham/polygon-blocks',
        gauge: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-polygon',
        userBalances: 'https://',
    },
    eth: {
        address: '0x0000000000000000000000000000000000001010',
        addressFormatted: '0x0000000000000000000000000000000000001010',
        symbol: 'MATIC',
        name: 'Matic',
    },
    weth: {
        address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        addressFormatted: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    },
    coingecko: {
        nativeAssetId: 'matic',
        platformId: 'polygon-pos',
    },
    tokenPrices: {
        maxHourlyPriceHistoryNumDays: 100,
    },
    rpcUrl: 'https://polygon-rpc.com',
    rpcMaxBlockRange: 2000,
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
        address: '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3',
    },
    balancer: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        composableStablePoolFactories: [
            '0x136FD06Fa01eCF624C7F2B3CB15742c1339dC2c4',
            '0x85a80afee867aDf27B50BdB7b76DA70f1E853062',
            '0x7bc6C0E73EDAa66eF3F6E2f27b0EE8661834c6C9',
        ],
        weightedPoolV2Factories: [
            '0x0e39C3D9b2ec765eFd9c5c70BB290B1fCD8536E3',
            '0x82e4cFaef85b1B6299935340c964C942280327f4',
        ],
        poolsInRecoveryMode: [
            '0x02d2e2d7a89d6c5cb3681cfcb6f7dac02a55eda400000000000000000000088f',
            '0x05f21bacc4fd8590d1eaca9830a64b66a733316c00000000000000000000087e',
            '0x089443665084fc50aa6f1d0dc0307333fd481b85000000000000000000000884',
            '0x0a95e37fdc3853082e5100a91dbdfcc0e7a2bc8900000000000000000000087c',
            '0x11202b1ec9271bf000c1d1ec7a4f70b93519a862000000000000000000000890',
            '0x2d09717c39f2e598d3283f77df339d55acdc9941000000000000000000000881',
            '0x2d46979fd4c5f7a04f65111399cff3da2dab5bd9000000000000000000000807',
            '0x373b347bc87998b151a5e9b6bb6ca692b766648a000000000000000000000923',
            '0x47401399b2eca91930c99126df20a11531f99465000000000000000000000840',
            '0x48e6b98ef6329f8f0a30ebb8c7c960330d64808500000000000000000000075b',
            '0x4973f591784d9c94052a6c3ebd553fcd37bb0e5500020000000000000000087f',
            '0x600bd01b6526611079e12e1ff93aba7a3e34226f0000000000000000000009e4',
            '0x7079a25dec33be61bbd81b2fb69b468e80d3e72c0000000000000000000009ff',
            '0x76afd126f46ab4fdf2ece8b1a2c149f7cf95d9fb00000000000000000000085c',
            '0x7913e4c8d00044689ff5c7c12d2f1b4a2fde4994000000000000000000000860',
            '0x7982c1b61abdc36942301ff2377d92b43784f120000000000000000000000861',
            '0x7a4ffa9285aeb177e0806e03367ce3850438668a000000000000000000000891',
            '0x7d60a4cb5ca92e2da965637025122296ea6854f900000000000000000000085e',
            '0x7f408fbcfc88917bff6a79b0ed0646fa090627de000000000000000000000863',
            '0x8159462d255c1d24915cb51ec361f700174cd99400000000000000000000075d',
            '0x8ac5fafe2e52e52f5352aec64b64ff8b305e1d4a0002000000000000000007ab',
            '0x92bc61bd96f275ea5507a3e1e5fbf0bc69cc98dc00000000000000000000085d',
            '0x94970a3f6a6aab442aefad68ff57abec0b9e3c0100000000000000000000085f',
            '0x9d75cc71555ddabcb89b52c818c2c689e2191401000200000000000000000762',
            '0x9e0a3a9b5a4e0b6dc299a56ef19002f23842be8d000000000000000000000862',
            '0xa48d164f6eb0edc68bd03b56fa59e12f24499ad10000000000000000000007c4',
            '0xb20fc01d21a50d2c734c4a1262b4404d41fa7bf000000000000000000000075c',
            '0xb54b2125b711cd183edd3dd09433439d5396165200000000000000000000075e',
            '0xb553c155f95ab42b674d6fe501693e30d54a47e2000000000000000000000755',
            '0xbf29ef6e23af0ac5b6bf931c8b3f1080f5bc120600000000000000000000091f',
            '0xe22483774bd8611be2ad2f4194078dac9159f4ba0000000000000000000008f0',
            '0xe2dc0e0f2c358d6e31836dee69a558ab8d1390e70000000000000000000009fa',
        ],
        swapProtocolFeePercentage: 0.5,
        yieldProtocolFeePercentage: 0.5,
    },
    multicall: '0x275617327c958bD06b5D6b871E7f491D76113dd8',
    masterchef: {
        address: '0x0000000000000000000000000000000000000000',
        excludedFarmIds: [],
    },
    avgBlockSpeed: 1,
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
    yearn: {
        vaultsEndpoint: 'https://#/',
    },
    reaper: {
        linearPoolFactories: [],
        averageAPRAcrossLastNHarvests: 2,
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

export const polygonNetworkConfig: NetworkConfig = {
    data: polygonNetworkData,
    contentService: new GithubContentService(),
    provider: new ethers.providers.JsonRpcProvider(polygonNetworkData.rpcUrl),
    poolAprServices: [
        new PhantomStableAprService(polygonNetworkData.balancer.yieldProtocolFeePercentage),
        new BoostedPoolAprService(polygonNetworkData.balancer.yieldProtocolFeePercentage),
        new SwapFeeAprService(polygonNetworkData.balancer.swapProtocolFeePercentage),
        new GaugeAprService(gaugeSubgraphService, tokenService, [
            polygonNetworkData.beets.address,
            polygonNetworkData.bal.address,
        ]),
    ],
    poolStakingServices: [new GaugeStakingService(gaugeSubgraphService)],
    tokenPriceHandlers: [
        new BeetsPriceHandlerService(),
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
    ],
};