import moment from 'moment-timezone';
import { prisma } from '../../prisma/prisma-client';
import { BalancerSubgraphService } from '../subgraphs/balancer-subgraph/balancer-subgraph.service';
import { Cache } from 'memory-cache';
import { PrismaUserBalanceType, PrismaLastBlockSyncedCategory } from '@prisma/client';
import { GqlLatestSyncedBlocks } from '../../schema';
import _ from 'lodash';

export type ProtocolMetrics = {
    poolCount: string;
    swapFee24h: string;
    swapVolume24h: string;
    totalLiquidity: string;
    totalSwapFee: string;
    totalSwapVolume: string;
};

export type LatestsSyncedBlocks = {
    userWalletSyncBlock: string;
    userStakeSyncBlock: string;
    poolSyncBlock: string;
};

export const PROTOCOL_METRICS_CACHE_KEY = 'protocol:metrics';

export class ProtocolService {
    private cache = new Cache<string, ProtocolMetrics>();

    constructor(private balancerSubgraphService: BalancerSubgraphService) {}

    public async getMetrics(): Promise<ProtocolMetrics> {
        const cached = this.cache.get(PROTOCOL_METRICS_CACHE_KEY);

        if (cached) {
            return cached;
        }

        return this.cacheProtocolMetrics();
    }

    public async cacheProtocolMetrics(): Promise<ProtocolMetrics> {
        const { totalSwapFee, totalSwapVolume, poolCount } = await this.balancerSubgraphService.getProtocolData({});

        const oneDayAgo = moment().subtract(24, 'hours').unix();
        const pools = await prisma.prismaPool.findMany({
            where: { categories: { none: { category: 'BLACK_LISTED' } }, type: { notIn: ['LINEAR'] } },
            include: { dynamicData: true },
        });
        const swaps = await prisma.prismaPoolSwap.findMany({ where: { timestamp: { gte: oneDayAgo } } });
        const filteredSwaps = swaps.filter((swap) => pools.find((pool) => pool.id === swap.poolId));

        const totalLiquidity = _.sumBy(pools, (pool) => (!pool.dynamicData ? 0 : pool.dynamicData.totalLiquidity));

        const swapVolume24h = _.sumBy(filteredSwaps, (swap) => swap.valueUSD);
        const swapFee24h = _.sumBy(filteredSwaps, (swap) => {
            const pool = pools.find((pool) => pool.id === swap.poolId);

            return parseFloat(pool?.dynamicData?.swapFee || '0') * swap.valueUSD;
        });

        const protocolData: ProtocolMetrics = {
            totalLiquidity: `${totalLiquidity}`,
            totalSwapFee,
            totalSwapVolume,
            poolCount: `${poolCount}`,
            swapVolume24h: `${swapVolume24h}`,
            swapFee24h: `${swapFee24h}`,
        };

        this.cache.put(PROTOCOL_METRICS_CACHE_KEY, protocolData, 60 * 30 * 1000);

        return protocolData;
    }

    public async getLatestSyncedBlocks(): Promise<LatestsSyncedBlocks> {
        const userStakeSyncBlock = await prisma.prismaUserBalanceSyncStatus.findUnique({
            where: { type: PrismaUserBalanceType.STAKED },
        });

        const userWalletSyncBlock = await prisma.prismaUserBalanceSyncStatus.findUnique({
            where: { type: PrismaUserBalanceType.WALLET },
        });

        const poolSyncBlock = await prisma.prismaLastBlockSynced.findUnique({
            where: { category: PrismaLastBlockSyncedCategory.POOLS },
        });

        return {
            userWalletSyncBlock: `${userWalletSyncBlock?.blockNumber}`,
            userStakeSyncBlock: `${userStakeSyncBlock?.blockNumber}`,
            poolSyncBlock: `${poolSyncBlock?.blockNumber}`,
        };
    }
}

export const protocolService = new ProtocolService(new BalancerSubgraphService());
