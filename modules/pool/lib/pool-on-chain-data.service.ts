import { Provider } from '@ethersproject/providers';
import VaultAbi from '../abi/Vault.json';
import aTokenRateProvider from '../abi/StaticATokenRateProvider.json';
import WeightedPoolAbi from '../abi/WeightedPool.json';
import StablePoolAbi from '../abi/StablePool.json';
import MetaStablePool from '../abi/MetaStablePool.json';
import ElementPoolAbi from '../abi/ConvergentCurvePool.json';
import LinearPoolAbi from '../abi/LinearPool.json';
import StablePhantomPoolAbi from '../abi/StablePhantomPool.json';
import ComposableStablePoolAbi from '../abi/ComposableStablePool.json';
import LiquidityBootstrappingPoolAbi from '../abi/LiquidityBootstrappingPool.json';
import { Multicaller } from '../../web3/multicaller';
import { BigNumber, Contract } from 'ethers';
import { formatFixed } from '@ethersproject/bignumber';
import { PrismaPoolType } from '@prisma/client';
import { isSameAddress } from '@balancer-labs/sdk';
import { prisma } from '../../../prisma/prisma-client';
import { isComposableStablePool, isStablePool, isWeightedPoolV2 } from './pool-utils';
import { TokenService } from '../../token/token.service';
import { WeiPerEther } from '@ethersproject/constants';
import BalancerPoolDataQueryAbi from '../abi/BalancerPoolDataQueries.json';
import { networkConfig } from '../../config/network-config';
import { jsonRpcProvider } from '../../web3/contract';

enum PoolQueriesTotalSupplyType {
    TOTAL_SUPPLY = 0,
    VIRTUAL_SUPPLY,
    ACTUAL_SUPPLY,
}

enum PoolQuerySwapFeeType {
    SWAP_FEE_PERCENTAGE = 0,
    PERCENT_FEE,
}

interface PoolDataQueryConfig {
    loadTokenBalanceUpdatesAfterBlock: boolean;
    loadTotalSupply: boolean;
    loadSwapFees: boolean;
    loadLinearWrappedTokenRates: boolean;
    loadNormalizedWeights: boolean;
    loadScalingFactors: boolean;
    loadAmps: boolean;
    loadRates: boolean;
    blockNumber: number;
    totalSupplyTypes: PoolQueriesTotalSupplyType[];
    swapFeeTypes: PoolQuerySwapFeeType[];
    linearPoolIdxs: number[];
    weightedPoolIdxs: number[];
    scalingFactorPoolIdxs: number[];
    ampPoolIdxs: number[];
    ratePoolIdxs: number[];
}

const defaultPoolDataQueryConfig: PoolDataQueryConfig = {
    loadTokenBalanceUpdatesAfterBlock: false,
    loadTotalSupply: false,
    loadSwapFees: false,
    loadLinearWrappedTokenRates: false,
    loadNormalizedWeights: false,
    loadScalingFactors: false,
    loadAmps: false,
    loadRates: false,
    blockNumber: 0,
    totalSupplyTypes: [],
    swapFeeTypes: [],
    linearPoolIdxs: [],
    weightedPoolIdxs: [],
    scalingFactorPoolIdxs: [],
    ampPoolIdxs: [],
    ratePoolIdxs: [],
};
interface MulticallExecuteResult {
    targets?: string[];
    swapEnabled?: boolean;
}

const SUPPORTED_POOL_TYPES: PrismaPoolType[] = [
    'WEIGHTED',
    'STABLE',
    'META_STABLE',
    'PHANTOM_STABLE',
    'LINEAR',
    'LIQUIDITY_BOOTSTRAPPING',
    'ELEMENT',
];

export interface poolIdWithType {
    id: string;
    type: PrismaPoolType;
}

export class PoolOnChainDataService {
    constructor(private readonly tokenService: TokenService) {}

    public async updateOnChainData(poolIds: string[], provider: Provider, blockNumber: number): Promise<void> {
        if (poolIds.length === 0) return;

        console.log(poolIds[0]);

        const pools = await prisma.prismaPool.findMany({
            where: { id: { in: poolIds } },
            include: {
                tokens: {
                    orderBy: { index: 'asc' },
                    include: { dynamicData: true, token: true },
                },
                stableDynamicData: true,
                dynamicData: true,
                linearDynamicData: true,
                linearData: true,
            },
        });

        const retrievedPoolIds = pools.map((pool) => pool.id);

        const weightedPoolIndexes: number[] = [];
        const linearPoolIdexes: number[] = [];
        const stablePoolIdexes: number[] = [];
        const ratePoolIdexes: number[] = [];
        const scalingFactorPoolIndexes: number[] = [];
        for (const pool of pools) {
            if (pool.type === 'WEIGHTED' || pool.type === 'LIQUIDITY_BOOTSTRAPPING' || pool.type === 'INVESTMENT') {
                weightedPoolIndexes.push(retrievedPoolIds.findIndex((orderedPoolId) => orderedPoolId === pool.id));
            }
            if (pool.type === 'LINEAR') {
                linearPoolIdexes.push(retrievedPoolIds.findIndex((orderedPoolId) => orderedPoolId === pool.id));
            }
            if (isStablePool(pool.type)) {
                stablePoolIdexes.push(retrievedPoolIds.findIndex((orderedPoolId) => orderedPoolId === pool.id));
            }
            if (pool.type === 'LINEAR' || isComposableStablePool(pool)) {
                ratePoolIdexes.push(retrievedPoolIds.findIndex((orderedPoolId) => orderedPoolId === pool.id));
            }
            if (pool.type === 'LINEAR' || isComposableStablePool(pool) || pool.type === 'META_STABLE') {
                scalingFactorPoolIndexes.push(retrievedPoolIds.findIndex((orderedPoolId) => orderedPoolId === pool.id));
            }
        }

        const poolDataQueryResult = await this.getPoolData({
            poolIds: retrievedPoolIds,
            config: {
                loadTokenBalanceUpdatesAfterBlock: true,
                blockNumber: 0, // always get balances from all pools
                loadAmps: stablePoolIdexes.length > 0,
                ampPoolIdxs: stablePoolIdexes,
                loadSwapFees: true,
                swapFeeTypes: pools.map((pool) => {
                    if (
                        pool.type === 'WEIGHTED' ||
                        pool.type === 'LIQUIDITY_BOOTSTRAPPING' ||
                        pool.type === 'INVESTMENT' ||
                        pool.type === 'LINEAR' ||
                        isStablePool(pool.type)
                        // MetaStable & StablePhantom is the same as Stable for swapfee purposes
                    ) {
                        return PoolQuerySwapFeeType.SWAP_FEE_PERCENTAGE;
                    } else {
                        return PoolQuerySwapFeeType.PERCENT_FEE;
                    }
                }),
                loadTotalSupply: true,
                totalSupplyTypes: pools.map((pool) => {
                    if (isComposableStablePool(pool) || isWeightedPoolV2(pool) || pool.type === 'PHANTOM_STABLE') {
                        return PoolQueriesTotalSupplyType.ACTUAL_SUPPLY;
                    } else if (pool.type === 'LINEAR') {
                        return PoolQueriesTotalSupplyType.VIRTUAL_SUPPLY;
                    } else {
                        return PoolQueriesTotalSupplyType.TOTAL_SUPPLY;
                    }
                }),
                loadNormalizedWeights: weightedPoolIndexes.length > 0,
                weightedPoolIdxs: weightedPoolIndexes,
                loadLinearWrappedTokenRates: linearPoolIdexes.length > 0,
                linearPoolIdxs: linearPoolIdexes,
                loadRates: ratePoolIdexes.length > 0,
                ratePoolIdxs: ratePoolIdexes,
                loadScalingFactors: scalingFactorPoolIndexes.length > 0,
                scalingFactorPoolIdxs: scalingFactorPoolIndexes,
            },
        });

        const poolDataResultPerPool = retrievedPoolIds.map((poolId, i) => ({
            id: retrievedPoolIds[i],
            balances: poolDataQueryResult.balances[i],
            totalSupply: poolDataQueryResult.totalSupplies[i],
            weights: weightedPoolIndexes.includes(i)
                ? poolDataQueryResult.weights[weightedPoolIndexes.indexOf(i)]
                : undefined,
            amp: stablePoolIdexes.includes(i) ? poolDataQueryResult.amps[stablePoolIdexes.indexOf(i)] : undefined,
            wrappedTokenRate: linearPoolIdexes.includes(i)
                ? poolDataQueryResult.linearWrappedTokenRates[linearPoolIdexes.indexOf(i)]
                : undefined,
            swapFee: poolDataQueryResult.swapFees[i],
            rate: linearPoolIdexes.includes(i) ? poolDataQueryResult.rates[linearPoolIdexes.indexOf(i)] : undefined,
            scalingFactors: scalingFactorPoolIndexes.includes(i)
                ? poolDataQueryResult.scalingFactors[scalingFactorPoolIndexes.indexOf(i)]
                : undefined,
            ignored: poolDataQueryResult.ignoreIdxs.some((index) => index.eq(i)),
        }));

        const tokenPrices = await this.tokenService.getTokenPrices();

        const abis: any = Object.values(
            // Remove duplicate entries using their names
            Object.fromEntries(
                [...ElementPoolAbi, ...LinearPoolAbi, ...LiquidityBootstrappingPoolAbi].map((row) => [row.name, row]),
            ),
        );

        const multiPool = new Multicaller(networkConfig.multicall, provider, abis);

        pools.forEach((pool) => {
            if (!SUPPORTED_POOL_TYPES.includes(pool.type || '')) {
                console.error(`Unknown pool type: ${pool.type} ${pool.id}`);
                return;
            }

            if (pool.type === 'LINEAR') {
                multiPool.call(`${pool.id}.targets`, pool.address, 'getTargets');
            }

            if (pool.type === 'LIQUIDITY_BOOTSTRAPPING' || pool.type === 'INVESTMENT') {
                multiPool.call(`${pool.id}.swapEnabled`, pool.address, 'getSwapEnabled');
            }
        });

        let poolsOnChainData = {} as Record<string, MulticallExecuteResult>;

        try {
            poolsOnChainData = (await multiPool.execute()) as Record<string, MulticallExecuteResult>;
        } catch (err: any) {
            console.error(err);
            throw `Issue with multicall execution. ${err}`;
        }

        const poolsOnChainDataArray = Object.entries(poolsOnChainData);

        for (const poolData of poolDataResultPerPool) {
            if (poolData.ignored) {
                console.log(`Pool query return with error, skipping: ${poolData.id}`);
                continue;
            }
            const poolId = poolData.id;
            const pool = pools.find((pool) => pool.id === poolId)!;
            let multicallResult;
            for (const [id, data] of poolsOnChainDataArray) {
                if (id === poolId) {
                    multicallResult = data;
                }
            }

            try {
                if (isStablePool(pool.type)) {
                    if (!poolData.amp) {
                        console.error(`Stable Pool Missing Amp: ${poolId}`);
                        continue;
                    }

                    // Need to scale amp by precision to match expected Subgraph scale
                    // amp is stored with 3 decimals of precision
                    const amp = formatFixed(poolData.amp, 3);

                    //only update if amp has changed
                    if (!pool.stableDynamicData || pool.stableDynamicData.amp !== amp) {
                        await prisma.prismaPoolStableDynamicData.upsert({
                            where: { id: pool.id },
                            create: { id: pool.id, poolId: pool.id, amp, blockNumber },
                            update: { amp, blockNumber },
                        });
                    }
                }

                if (pool.type === 'LINEAR') {
                    if (!multicallResult?.targets) {
                        console.error(`Linear Pool Missing Targets: ${poolId}`);
                        continue;
                    } else {
                        const lowerTarget = formatFixed(multicallResult.targets[0], 18);
                        const upperTarget = formatFixed(multicallResult.targets[1], 18);

                        if (
                            !pool.linearDynamicData ||
                            pool.linearDynamicData.lowerTarget !== lowerTarget ||
                            pool.linearDynamicData.upperTarget !== upperTarget
                        ) {
                            await prisma.prismaPoolLinearDynamicData.upsert({
                                where: { id: pool.id },
                                create: {
                                    id: pool.id,
                                    poolId: pool.id,
                                    upperTarget,
                                    lowerTarget,
                                    blockNumber,
                                },
                                update: { upperTarget, lowerTarget, blockNumber },
                            });
                        }
                    }
                }

                const swapFee = formatFixed(poolData.swapFee, 18);
                const totalShares = formatFixed(poolData.totalSupply, 18);
                const swapEnabled =
                    typeof multicallResult?.swapEnabled !== 'undefined'
                        ? multicallResult.swapEnabled
                        : pool.dynamicData?.swapEnabled;

                if (
                    pool.dynamicData &&
                    (pool.dynamicData.swapFee !== swapFee ||
                        pool.dynamicData.totalShares !== totalShares ||
                        pool.dynamicData.swapEnabled !== swapEnabled)
                ) {
                    await prisma.prismaPoolDynamicData.update({
                        where: { id: pool.id },
                        data: {
                            swapFee,
                            totalShares,
                            totalSharesNum: parseFloat(totalShares),
                            swapEnabled: typeof swapEnabled !== 'undefined' ? swapEnabled : true,
                            blockNumber,
                        },
                    });
                }

                for (const poolToken of pool.tokens) {
                    console.log(poolToken.address);
                    const balance = formatFixed(poolData.balances[poolToken.index], poolToken.token.decimals);
                    const weight = poolData.weights ? formatFixed(poolData.weights[poolToken.index], 18) : null;

                    let priceRate = '1.0';

                    // set token rate from scaling factors
                    if (poolData.scalingFactors && poolData.scalingFactors[poolToken.index]) {
                        priceRate = formatFixed(
                            poolData.scalingFactors[poolToken.index]
                                .mul(10 ^ poolToken.token.decimals)
                                .div(`1000000000000000000`),
                            18,
                        );
                    }

                    // override the rate of the phantom bpt with pool.getRate if present
                    if (poolData.rate && isSameAddress(poolToken.address, pool.address)) {
                        priceRate = formatFixed(poolData.rate, 18);
                    }

                    // override the rate of the wrapped token with pool.getWrappedTokenRate if present
                    if (poolData.wrappedTokenRate && pool.linearData?.wrappedIndex === poolToken.index) {
                        priceRate = formatFixed(poolData.wrappedTokenRate, 18);
                    }

                    if (
                        !poolToken.dynamicData ||
                        poolToken.dynamicData.balance !== balance ||
                        poolToken.dynamicData.priceRate !== priceRate ||
                        poolToken.dynamicData.weight !== weight
                    ) {
                        await prisma.prismaPoolTokenDynamicData.upsert({
                            where: { id: poolToken.id },
                            create: {
                                id: poolToken.id,
                                poolTokenId: poolToken.id,
                                blockNumber,
                                priceRate,
                                weight,
                                balance,
                                balanceUSD:
                                    poolToken.address === pool.address
                                        ? 0
                                        : this.tokenService.getPriceForToken(tokenPrices, poolToken.address) *
                                          parseFloat(balance),
                            },
                            update: {
                                blockNumber,
                                priceRate,
                                weight,
                                balance,
                                balanceUSD:
                                    poolToken.address === pool.address
                                        ? 0
                                        : this.tokenService.getPriceForToken(tokenPrices, poolToken.address) *
                                          parseFloat(balance),
                            },
                        });
                    }
                }
            } catch (e) {
                console.log('error syncing on chain data', e);
            }
        }
    }
    public async getPoolData({
        poolIds,
        config,
    }: {
        poolIds: string[];
        config: Partial<PoolDataQueryConfig>;
    }): Promise<{
        balances: BigNumber[][];
        totalSupplies: BigNumber[];
        swapFees: BigNumber[];
        linearWrappedTokenRates: BigNumber[];
        weights: BigNumber[][];
        scalingFactors: BigNumber[][];
        amps: BigNumber[];
        rates: BigNumber[];
        ignoreIdxs: BigNumber[];
    }> {
        const contract = new Contract(
            networkConfig.balancer.poolDataQueryContract,
            BalancerPoolDataQueryAbi,
            jsonRpcProvider,
        );

        const response = await contract.getPoolData(poolIds, {
            ...defaultPoolDataQueryConfig,
            ...config,
        });
        if (response[8].length > 0) {
            console.log('error');
        }

        return {
            balances: response[0],
            totalSupplies: response[1],
            swapFees: response[2],
            linearWrappedTokenRates: response[3],
            weights: response[4],
            scalingFactors: response[5],
            amps: response[6],
            rates: response[7],
            ignoreIdxs: response[8],
        };
    }
}
