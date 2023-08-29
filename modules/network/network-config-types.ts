import { Chain } from '@prisma/client';
import { BigNumber } from 'ethers';
import { PoolAprService, PoolStakingService } from '../pool/pool-types';
import { UserStakedBalanceService } from '../user/user-types';
import { TokenPriceHandler } from '../token/token-types';
import { BaseProvider } from '@ethersproject/providers';
import { GqlChain } from '../../schema';
import { ContentService } from '../content/content-types';

export interface NetworkConfig {
    data: NetworkData;
    contentService: ContentService;
    poolStakingServices: PoolStakingService[];
    poolAprServices: PoolAprService[];
    userStakedBalanceServices: UserStakedBalanceService[];
    tokenPriceHandlers: TokenPriceHandler[];
    provider: BaseProvider;
    workerJobs: WorkerJob[];
}
export interface WorkerJob {
    name: string;
    interval: number;
    alarmEvaluationPeriod?: number;
    alarmDatapointsToAlarm?: number;
}

export type DeploymentEnv = 'canary' | 'main';

export interface NetworkData {
    chain: {
        slug: string;
        id: number;
        nativeAssetAddress: string;
        wrappedNativeAssetAddress: string;
        prismaId: Chain;
        gqlId: GqlChain;
    };
    eth: {
        address: string;
        addressFormatted: string;
        symbol: string;
        name: string;
    };
    weth: {
        address: string;
        addressFormatted: string;
    };
    rpcUrl: string;
    rpcMaxBlockRange: number;
    coingecko: {
        nativeAssetId: string;
        platformId: string;
        excludedTokenAddresses: string[];
    };
    tokenPrices: {
        maxHourlyPriceHistoryNumDays: number;
    };
    subgraphs: {
        startDate: string;
        balancer: string;
        blocks: string;
        masterchef?: string;
        reliquary?: string;
        beetsBar?: string;
        gauge?: string;
        veBalLocks?: string;
        userBalances: string;
    };
    sanity?: {
        projectId: string;
        dataset: string;
    };
    protocolToken: 'beets' | 'bal';
    beets?: {
        address: string;
        beetsPriceProviderRpcUrl: string;
    };
    fbeets?: {
        address: string;
        farmId: string;
        poolId: string;
        poolAddress: string;
    };
    bal?: {
        address: string;
    };
    veBal?: {
        address: string;
        delegationProxy: string;
    };
    gaugeControllerAddress?: string;
    gaugeControllerHelperAddress?: string;
    balancer: {
        vault: string;
        weightedPoolV2Factories: string[];
        composableStablePoolFactories: string[];
        yieldProtocolFeePercentage: number;
        swapProtocolFeePercentage: number;
        poolDataQueryContract: string;
        excludedPoolDataQueryPoolIds?: string[];
        factoriesWithpoolSpecificProtocolFeePercentagesProvider?: string[];
    };
    multicall: string;
    multicall3: string;
    masterchef?: {
        address: string;
        excludedFarmIds: string[];
    };
    ibAprConfig: AprConfig;
    reliquary?: {
        address: string;
        excludedFarmIds: string[];
    };
    copper?: {
        proxyAddress: string;
    };
    beefy?: {
        linearPools: string[];
    };
    lido?: {
        wstEthContract: string;
        wstEthAprEndpoint: string;
    };
    stader?: {
        sFtmxContract: string;
    };
    rocket?: {
        rEthContract: string;
    };
    spooky?: {
        xBooContract: string;
    };
    ankr?: {
        ankrFtmContract: string;
        ankrEthContract: string;
    };
    overnight?: {
        aprEndpoint: string;
    };
    avgBlockSpeed: number;
    sor: {
        [key in DeploymentEnv]: {
            url: string;
            maxPools: number;
            forceRefresh: boolean;
            gasPrice: BigNumber;
            swapGas: BigNumber;
        };
    };
    datastudio?: {
        [key in DeploymentEnv]: {
            user: string;
            sheetId: string;
            compositionTabName: string;
            databaseTabName: string;
            emissionDataTabName: string;
        };
    };
    monitoring: {
        [key in DeploymentEnv]: {
            alarmTopicArn: string;
        };
    };
}

export interface AprConfig {
    aave?: {
        [version: string]: {
            subgraphUrl: string;
            tokens: {
                [underlyingAssetName: string]: {
                    underlyingAssetAddress: string;
                    aTokenAddress: string;
                    wrappedTokens: {
                        [wrappedTokenName: string]: string;
                    };
                };
            };
        };
    };
    ankr?: {
        sourceUrl: string;
        tokens: {
            [underlyingAssetName: string]: {
                address: string;
                serviceName: string;
            };
        };
    };
    beefy?: {
        sourceUrl: string;
        tokens: {
            [tokenName: string]: {
                address: string;
                // To get the vaultId, get the vault address from the token contract(token.vault()),
                // and search for the vault address in the link: https://api.beefy.finance/vaults
                vaultId: string;
            };
        };
    };
    euler?: {
        subgraphUrl: string;
        tokens: {
            [tokenName: string]: string;
        };
    };
    gearbox?: {
        sourceUrl: string;
        tokens: {
            [tokenName: string]: string;
        };
    };
    idle?: {
        sourceUrl: string;
        authorizationHeader: string;
        tokens: {
            [tokenName: string]: {
                address: string;
                wrapped4626Address: string;
            };
        };
    };
    ovix?: {
        rpcUrl: string;
        tokens: {
            [tokenName: string]: {
                yieldAddress: string;
                wrappedAddress: string;
            };
        };
    };
    reaper?: {
        multiStrategy?: {
            subgraphUrl: string;
            tokens: {
                [tokenName: string]: {
                    address: string;
                    isSftmX?: boolean;
                    isWstETH?: boolean;
                };
            };
        };
        singleStrategy?: {
            averageAPRAcrossLastNHarvests: number;
            tokens: {
                [tokenName: string]: {
                    address: string;
                    isSftmX?: boolean;
                    isWstETH?: boolean;
                };
            };
        };
    };
    tessera?: {
        rpcUrl: string;
        tokens: {
            [tokenName: string]: {
                tesseraPoolAddress: string;
                tokenAddress: string;
            };
        };
    };
    tetu?: {
        sourceUrl: string;
        tokens: {
            [tokenName: string]: string;
        };
    };
    tranchess?: {
        sourceUrl: string;
        tokens: {
            [tokenName: string]: {
                address: string;
                underlyingAssetName: string;
            };
        };
    };
    yearn?: {
        sourceUrl: string;
    };
    defaultHandlers?: {
        [tokenName: string]: {
            sourceUrl: string;
            tokens: {
                [tokenName: string]: string;
            };
            path?: string;
            scale?: number;
            group?: string;
        };
    };
    fixedAprTokens?: {
        [tokenName: string]: {
            address: string;
            value: number;
            group?: string;
        };
    };
}
