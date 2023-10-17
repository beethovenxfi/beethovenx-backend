import { BigNumber } from '@ethersproject/bignumber';
import { DeploymentEnv, NetworkData } from "../network-config-types";
import { env } from '../../../app/env';

export const data: NetworkData = {
    chain: {
        slug: 'zkevm',
        id: 1101,
        nativeAssetAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        wrappedNativeAssetAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
        prismaId: 'ZKEVM',
        gqlId: 'ZKEVM',
    },
    subgraphs: {
        startDate: '2023-05-17',
        balancer: 'https://api.studio.thegraph.com/query/24660/balancer-polygon-zk-v2/version/latest',
        beetsBar: 'https://',
        blocks: 'https://api.studio.thegraph.com/query/48427/bleu-polygon-zkevm-blocks/version/latest',
        gauge: 'https://api.studio.thegraph.com/query/24660/balancer-gauges-polygon-zk/version/latest',
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
        address: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
        addressFormatted: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9',
    },
    coingecko: {
        nativeAssetId: 'ethereum',
        platformId: 'polygon-zkevm',
        excludedTokenAddresses: [],
    },
    tokenPrices: {
        maxHourlyPriceHistoryNumDays: 100,
    },
    rpcUrl:
        env.ALCHEMY_API_KEY && (env.DEPLOYMENT_ENV as DeploymentEnv) === 'main'
            ? `https://polygonzkevm-mainnet.g.alchemy.com/v2/${env.ALCHEMY_API_KEY}`
            : 'https://zkevm-rpc.com',
    rpcMaxBlockRange: 2000,
    protocolToken: 'bal',
    bal: {
        address: '0x120ef59b80774f02211563834d8e3b72cb1649d6',
    },
    veBal: {
        address: '0xc128a9954e6c874ea3d62ce62b468ba073093f25',
        delegationProxy: '0xc7e5ed1054a24ef31d827e6f86caa58b3bc168d7',
    },
    balancer: {
        vault: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        composableStablePoolFactories: [
            '0x8ea89804145c007e7d226001a96955ad53836087',
            '0x956ccab09898c0af2aca5e6c229c3ad4e93d9288',
        ],
        weightedPoolV2Factories: ['0x03f3fb107e74f2eac9358862e91ad3c692712054'],
        swapProtocolFeePercentage: 0.5,
        yieldProtocolFeePercentage: 0.5,
    },
    multicall: '0xca11bde05977b3631167028862be2a173976ca11',
    multicall3: '0xca11bde05977b3631167028862be2a173976ca11',
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
    ibAprConfig: {
        ovix: {
            tokens: {
                USDT: {
                    yieldAddress: '0xad41c77d99e282267c1492cdefe528d7d5044253',
                    wrappedAddress: '0x550d3bb1f77f97e4debb45d4f817d7b9f9a1affb',
                },
                USDC: {
                    yieldAddress: '0x68d9baa40394da2e2c1ca05d30bf33f52823ee7b',
                    wrappedAddress: '0x3a6789fc7c05a83cfdff5d2f9428ad9868b4ff85',
                },
            },
        },
        defaultHandlers: {
            wstETH: {
                tokenAddress: '0x5d8cff95d7a57c0bf50b30b43c7cc0d52825d4a9',
                sourceUrl: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
                path: 'data.smaApr',
                isIbYield: true,
            },
            rETH: {
                tokenAddress: '0xb23c20efce6e24acca0cef9b7b7aa196b84ec942',
                sourceUrl: 'https://rocketpool.net/api/mainnet/payload',
                path: 'rethAPR',
                isIbYield: true,
            },
        },
    },
    beefy: {
        linearPools: [''],
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
