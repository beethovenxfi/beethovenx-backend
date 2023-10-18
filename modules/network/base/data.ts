import { BigNumber } from '@ethersproject/bignumber';
import { NetworkData } from "../network-config-types";

export const baseNetworkData: NetworkData = {
    chain: {
        slug: 'base',
        id: 8453,
        nativeAssetAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        wrappedNativeAssetAddress: '0x4200000000000000000000000000000000000006',
        prismaId: 'BASE',
        gqlId: 'BASE',
    },
    subgraphs: {
        startDate: '2023-07-10',
        balancer: 'https://api.studio.thegraph.com/query/24660/balancer-base-v2/version/latest',
        beetsBar: '',
        blocks: 'https://api.studio.thegraph.com/query/48427/bleu-base-blocks/version/latest',
        gauge: 'https://api.studio.thegraph.com/query/24660/balancer-gauges-base/version/latest',
        veBalLocks: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
        userBalances: '',
    },
    eth: {
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        addressFormatted: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'ETH',
        name: 'Ether',
    },
    weth: {
        address: '0x4200000000000000000000000000000000000006',
        addressFormatted: '0x4200000000000000000000000000000000000006',
    },
    coingecko: {
        nativeAssetId: 'ethereum',
        platformId: 'base',
        excludedTokenAddresses: [],
    },
    tokenPrices: {
        maxHourlyPriceHistoryNumDays: 100,
    },
    rpcUrl: 'https://base.gateway.tenderly.co/7mM7DbBouY1JjnQd9MMDsd',
    rpcMaxBlockRange: 500,
    sanity: {
        projectId: '',
        dataset: '',
    },
    protocolToken: 'bal',
    bal: {
        address: '0x4158734d47fc9692176b5085e0f52ee0da5d47f1',
    },
    veBal: {
        address: '0xc128a9954e6c874ea3d62ce62b468ba073093f25',
        delegationProxy: '0xd87f44df0159dc78029ab9ca7d7e57e7249f5acd',
    },
    balancer: {
        vault: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        composableStablePoolFactories: ['0x8df317a729fcaa260306d7de28888932cb579b88'],
        weightedPoolV2Factories: ['0x4c32a8a8fda4e24139b51b456b42290f51d6a1c4'],
        swapProtocolFeePercentage: 0.5,
        yieldProtocolFeePercentage: 0.5,
    },
    ibAprConfig: {
        defaultHandlers: {
            cbETH: {
                tokenAddress: '0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22',
                sourceUrl: 'https://api.exchange.coinbase.com/wrapped-assets/CBETH/',
                path: 'apy',
                scale: 1,
                isIbYield: true,
            },
        },
    },
    multicall: '0xca11bde05977b3631167028862be2a173976ca11',
    multicall3: '0xca11bde05977b3631167028862be2a173976ca11',
    avgBlockSpeed: 2,
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
    monitoring: {
        main: {
            alarmTopicArn: 'arn:aws:sns:ca-central-1:118697801881:api_alarms',
        },
        canary: {
            alarmTopicArn: 'arn:aws:sns:eu-central-1:118697801881:api_alarms',
        },
    },
};
