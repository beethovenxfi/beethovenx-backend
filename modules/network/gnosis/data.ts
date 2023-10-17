import { BigNumber } from '@ethersproject/bignumber';
import { NetworkData } from "../network-config-types";

export const data: NetworkData = {
    chain: {
        slug: 'gnosis',
        id: 100,
        nativeAssetAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        wrappedNativeAssetAddress: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
        prismaId: 'GNOSIS',
        gqlId: 'GNOSIS',
    },
    subgraphs: {
        startDate: '2021-08-23',
        balancer: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gnosis-chain-v2',
        beetsBar: 'https://',
        blocks: 'https://api.thegraph.com/subgraphs/name/rebase-agency/gnosis-chain-blocks',
        gauge: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges-gnosis-chain',
        veBalLocks: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
        userBalances: 'https://',
    },
    eth: {
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        addressFormatted: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'xDAI',
        name: 'xDAI',
    },
    weth: {
        address: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
        addressFormatted: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    },
    coingecko: {
        nativeAssetId: 'xdai',
        platformId: 'xdai',
        excludedTokenAddresses: [],
    },
    tokenPrices: {
        maxHourlyPriceHistoryNumDays: 100,
    },
    rpcUrl: 'https://rpc.gnosis.gateway.fm',
    rpcMaxBlockRange: 2000,
    protocolToken: 'bal',
    bal: {
        address: '0x7ef541e2a22058048904fe5744f9c7e4c57af717',
    },
    veBal: {
        address: '0xc128a9954e6c874ea3d62ce62b468ba073093f25',
        delegationProxy: '0x7a2535f5fb47b8e44c02ef5d9990588313fe8f05',
    },
    balancer: {
        vault: '0xba12222222228d8ba445958a75a0704d566bf2c8',
        composableStablePoolFactories: [
            '0x76578ecf9a141296ec657847fb45b0585bcda3a6',
            '0xc128468b7ce63ea702c1f104d55a2566b13d3abd',
            '0xd87f44df0159dc78029ab9ca7d7e57e7249f5acd',
            '0x4bdcc2fb18aeb9e2d281b0278d946445070eada7',
        ],
        weightedPoolV2Factories: [
            '0x6cad2ea22bfa7f4c14aae92e47f510cd5c509bc7',
            '0xf302f9f50958c5593770fdf4d4812309ff77414f',
            '0xc128a9954e6c874ea3d62ce62b468ba073093f25',
        ],
        swapProtocolFeePercentage: 0.5,
        yieldProtocolFeePercentage: 0.5,
    },
    multicall: '0xbb6fab6b627947dae0a75808250d8b2652952cb5',
    multicall3: '0xca11bde05977b3631167028862be2a173976ca11',
    avgBlockSpeed: 1,
    sor: {
        main: {
            url: '',
            maxPools: 8,
            forceRefresh: false,
            gasPrice: BigNumber.from(10),
            swapGas: BigNumber.from('1000000'),
        },
        canary: {
            url: '',
            maxPools: 8,
            forceRefresh: false,
            gasPrice: BigNumber.from(10),
            swapGas: BigNumber.from('1000000'),
        },
    },
    ibAprConfig: {
        defaultHandlers: {
            wstETH: {
                tokenAddress: '0x6c76971f98945ae98dd7d4dfca8711ebea946ea6',
                sourceUrl: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
                path: 'data.smaApr',
                isIbYield: true,
            },
        },
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
    beefy: {
        linearPools: [''],
    },
};
