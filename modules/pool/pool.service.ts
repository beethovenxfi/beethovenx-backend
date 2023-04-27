import { Provider } from '@ethersproject/providers';
import { PrismaPoolFilter, PrismaPoolStakingType, PrismaPoolSwap } from '@prisma/client';
import _ from 'lodash';
import { Cache } from 'memory-cache';
import moment from 'moment-timezone';
import { prisma } from '../../prisma/prisma-client';
import {
    GqlPoolBatchSwap,
    GqlPoolFeaturedPoolGroup,
    GqlPoolJoinExit,
    GqlPoolLinear,
    GqlPoolMinimal,
    GqlPoolSnapshotDataRange,
    GqlPoolUnion,
    GqlPoolUserSwapVolume,
    QueryPoolGetBatchSwapsArgs,
    QueryPoolGetJoinExitsArgs,
    QueryPoolGetPoolsArgs,
    QueryPoolGetSwapsArgs,
    QueryPoolGetUserSwapVolumeArgs,
} from '../../schema';
import { coingeckoService } from '../coingecko/coingecko.service';
import { isFantomNetwork, networkConfig } from '../config/network-config';
import { configService } from '../content/content.service';
import { balancerSubgraphService } from '../subgraphs/balancer-subgraph/balancer-subgraph.service';
import { blocksSubgraphService } from '../subgraphs/blocks-subgraph/blocks-subgraph.service';
import { masterchefService } from '../subgraphs/masterchef-subgraph/masterchef.service';
import { reliquarySubgraphService } from '../subgraphs/reliquary-subgraph/reliquary.service';
import { tokenService } from '../token/token.service';
import { userService } from '../user/user.service';
import { jsonRpcProvider } from '../web3/contract';
import { BoostedPoolAprService } from './lib/apr-data-sources/boosted-pool-apr.service';
import { AnkrStakedFtmAprService } from './lib/apr-data-sources/fantom/ankr-staked-ftm-apr.service';
import { MasterchefFarmAprService } from './lib/apr-data-sources/fantom/masterchef-farm-apr.service';
import { ReliquaryFarmAprService } from './lib/apr-data-sources/fantom/reliquary-farm-apr.service';
import { SpookySwapAprService } from './lib/apr-data-sources/fantom/spooky-swap-apr.service';
import { StaderStakedFtmAprService } from './lib/apr-data-sources/fantom/stader-staked-ftm-apr.service';
import { YearnVaultAprService } from './lib/apr-data-sources/fantom/yearn-vault-apr.service';
import { OvernightAprService } from './lib/apr-data-sources/optimism/overnight-apr.service';
import { RocketPoolStakedEthAprService } from './lib/apr-data-sources/optimism/rocket-pool-staked-eth-apr.service';
import { GaugeAprService } from './lib/apr-data-sources/optimism/ve-bal-guage-apr.service';
import { WstethAprService } from './lib/apr-data-sources/optimism/wsteth-apr.service';
import { PhantomStableAprService } from './lib/apr-data-sources/phantom-stable-apr.service';
import { ReaperCryptAprService } from './lib/apr-data-sources/reaper-crypt-apr.service';
import { SwapFeeAprService } from './lib/apr-data-sources/swap-fee-apr.service';
import { PoolAprUpdaterService } from './lib/pool-apr-updater.service';
import { PoolCreatorService } from './lib/pool-creator.service';
import { PoolGqlLoaderService } from './lib/pool-gql-loader.service';
import { PoolOnChainDataService } from './lib/pool-on-chain-data.service';
import { PoolSanityDataLoaderService } from './lib/pool-sanity-data-loader.service';
import { PoolSnapshotService } from './lib/pool-snapshot.service';
import { PoolSwapService } from './lib/pool-swap.service';
import { PoolSyncService } from './lib/pool-sync.service';
import { PoolUsdDataService } from './lib/pool-usd-data.service';
import { ReliquarySnapshotService } from './lib/reliquary-snapshot.service';
import { MasterChefStakingService } from './lib/staking/fantom/master-chef-staking.service';
import { ReliquaryStakingService } from './lib/staking/fantom/reliquary-staking.service';
import { gaugeSerivce } from './lib/staking/optimism/gauge-service';
import { GaugeStakingService } from './lib/staking/optimism/gauge-staking.service';
import { PoolStakingService } from './pool-types';
import { BeefyVaultAprService } from './lib/apr-data-sources/beefy-vault-apr.service copy';

const FEATURED_POOL_GROUPS_CACHE_KEY = 'pool:featuredPoolGroups';

export class PoolService {
    private cache = new Cache<string, any>();
    constructor(
        private readonly provider: Provider,
        private readonly poolCreatorService: PoolCreatorService,
        private readonly poolOnChainDataService: PoolOnChainDataService,
        private readonly poolUsdDataService: PoolUsdDataService,
        private readonly poolGqlLoaderService: PoolGqlLoaderService,
        private readonly poolSanityDataLoaderService: PoolSanityDataLoaderService,
        private readonly poolAprUpdaterService: PoolAprUpdaterService,
        private readonly poolSyncService: PoolSyncService,
        private readonly poolSwapService: PoolSwapService,
        private readonly poolStakingServices: PoolStakingService[],
        private readonly poolSnapshotService: PoolSnapshotService,
        private readonly reliquarySnapshotService: ReliquarySnapshotService,
    ) {}

    public async getGqlPool(id: string): Promise<GqlPoolUnion> {
        return this.poolGqlLoaderService.getPool(id);
    }

    public async getGqlPools(args: QueryPoolGetPoolsArgs): Promise<GqlPoolMinimal[]> {
        return this.poolGqlLoaderService.getPools(args);
    }

    public async getGqlLinearPools(): Promise<GqlPoolLinear[]> {
        return this.poolGqlLoaderService.getLinearPools();
    }

    public async getPoolsCount(args: QueryPoolGetPoolsArgs): Promise<number> {
        return this.poolGqlLoaderService.getPoolsCount(args);
    }

    public async getPoolFilters(): Promise<PrismaPoolFilter[]> {
        return prisma.prismaPoolFilter.findMany({});
    }

    public async getPoolSwaps(args: QueryPoolGetSwapsArgs): Promise<PrismaPoolSwap[]> {
        return this.poolSwapService.getSwaps(args);
    }

    public async getPoolBatchSwaps(args: QueryPoolGetBatchSwapsArgs): Promise<GqlPoolBatchSwap[]> {
        const batchSwaps = await this.poolSwapService.getBatchSwaps(args);

        return batchSwaps.map((batchSwap) => ({
            ...batchSwap,
            swaps: batchSwap.swaps.map((swap) => {
                return {
                    ...swap,
                    pool: this.poolGqlLoaderService.mapToMinimalGqlPool(swap.pool),
                };
            }),
        }));
    }

    public async getPoolJoinExits(args: QueryPoolGetJoinExitsArgs): Promise<GqlPoolJoinExit[]> {
        return this.poolSwapService.getJoinExits(args);
    }

    public async getPoolUserSwapVolume(args: QueryPoolGetUserSwapVolumeArgs): Promise<GqlPoolUserSwapVolume[]> {
        return this.poolSwapService.getUserSwapVolume(args);
    }

    public async getFeaturedPoolGroups(): Promise<GqlPoolFeaturedPoolGroup[]> {
        const cached: GqlPoolFeaturedPoolGroup[] = await this.cache.get(FEATURED_POOL_GROUPS_CACHE_KEY);

        if (cached) {
            return cached;
        }

        const featuredPoolGroups = await this.poolGqlLoaderService.getFeaturedPoolGroups();

        this.cache.put(FEATURED_POOL_GROUPS_CACHE_KEY, featuredPoolGroups, 60 * 5 * 1000);

        return featuredPoolGroups;
    }

    public async getSnapshotsForAllPools(range: GqlPoolSnapshotDataRange) {
        return this.poolSnapshotService.getSnapshotsForAllPools(range);
    }

    public async getSnapshotsForPool(poolId: string, range: GqlPoolSnapshotDataRange) {
        return this.poolSnapshotService.getSnapshotsForPool(poolId, range);
    }

    public async getSnapshotsForReliquaryFarm(id: number, range: GqlPoolSnapshotDataRange) {
        return this.reliquarySnapshotService.getSnapshotsForFarm(id, range);
    }

    public async syncAllPoolsFromSubgraph(): Promise<string[]> {
        const blockNumber = await this.provider.getBlockNumber();

        return this.poolCreatorService.syncAllPoolsFromSubgraph(blockNumber);
    }

    public async reloadStakingForAllPools(stakingTypes: PrismaPoolStakingType[]): Promise<void> {
        await Promise.all(
            this.poolStakingServices.map((stakingService) => stakingService.reloadStakingForAllPools(stakingTypes)),
        );
        // if we reload staking for reliquary, we also need to reload the snapshots because they are deleted while reloading
        if (stakingTypes.includes('RELIQUARY')) {
            this.loadReliquarySnapshotsForAllFarms();
        }
    }

    public async syncPoolAllTokensRelationship(): Promise<void> {
        const pools = await prisma.prismaPool.findMany({ select: { id: true } });

        for (const pool of pools) {
            await this.poolCreatorService.createAllTokensRelationshipForPool(pool.id);
        }
    }

    public async syncNewPoolsFromSubgraph(): Promise<string[]> {
        const blockNumber = await this.provider.getBlockNumber();

        const poolIds = await this.poolCreatorService.syncNewPoolsFromSubgraph(blockNumber);

        if (poolIds.length > 0) {
            await this.updateOnChainDataForPools(poolIds, blockNumber);
            await this.syncSwapsForLast48Hours();
            await this.updateVolumeAndFeeValuesForPools(poolIds);
        }

        return poolIds;
    }

    public async loadOnChainDataForAllPools(): Promise<void> {
        const result = await prisma.prismaPool.findMany({
            select: { id: true },
            where: {
                categories: {
                    none: { category: 'BLACK_LISTED' },
                },
            },
        });
        const poolIds = result.map((item) => item.id);
        const blockNumber = await this.provider.getBlockNumber();

        const chunks = _.chunk(poolIds, 100);

        for (const chunk of chunks) {
            await this.poolOnChainDataService.updateOnChainData(chunk, this.provider, blockNumber);
        }
    }

    public async updateOnChainDataForPools(poolIds: string[], blockNumber: number) {
        const chunks = _.chunk(poolIds, 100);

        for (const chunk of chunks) {
            await this.poolOnChainDataService.updateOnChainData(chunk, this.provider, blockNumber);
        }
    }

    public async loadOnChainDataForPoolsWithActiveUpdates() {
        const blockNumber = await this.provider.getBlockNumber();
        const timestamp = moment().subtract(5, 'minutes').unix();
        console.time('getPoolsWithActiveUpdates');
        const poolIds = await balancerSubgraphService.getPoolsWithActiveUpdates(timestamp);
        console.timeEnd('getPoolsWithActiveUpdates');

        console.time('updateOnChainData');
        await this.poolOnChainDataService.updateOnChainData(poolIds, this.provider, blockNumber);
        console.timeEnd('updateOnChainData');
    }

    public async updateLiquidityValuesForPools(minShares?: number, maxShares?: number): Promise<void> {
        await this.poolUsdDataService.updateLiquidityValuesForPools(minShares, maxShares);
    }

    public async updateVolumeAndFeeValuesForPools(poolIds?: string[]): Promise<void> {
        console.time('updateVolumeAndFeeValuesForPools');
        await this.poolUsdDataService.updateVolumeAndFeeValuesForPools(poolIds);
        console.timeEnd('updateVolumeAndFeeValuesForPools');
    }

    public async syncSwapsForLast48Hours(): Promise<string[]> {
        console.time('syncSwapsForLast48Hours');
        const poolIds = await this.poolSwapService.syncSwapsForLast48Hours();
        console.timeEnd('syncSwapsForLast48Hours');

        return poolIds;
    }

    public async updateYieldCaptureForAllPools() {
        await this.poolUsdDataService.updateYieldCaptureForAllPools();
    }

    public async syncSanityPoolData() {
        await this.poolSanityDataLoaderService.syncPoolSanityData();
    }

    public async syncStakingForPools() {
        await Promise.all(this.poolStakingServices.map((stakingService) => stakingService.syncStakingForPools()));
    }

    public async updatePoolAprs() {
        await this.poolAprUpdaterService.updatePoolAprs();
    }

    public async syncChangedPools() {
        await this.poolSyncService.syncChangedPools();
    }

    public async realodAllPoolAprs() {
        await this.poolAprUpdaterService.realodAllPoolAprs();
    }

    public async updateLiquidity24hAgoForAllPools() {
        await this.poolUsdDataService.updateLiquidity24hAgoForAllPools();
    }

    public async loadSnapshotsForPools(poolIds: string[]) {
        await this.poolSnapshotService.loadAllSnapshotsForPools(poolIds);
    }

    public async loadSnapshotsForAllPools() {
        await prisma.prismaPoolSnapshot.deleteMany({});
        const pools = await prisma.prismaPool.findMany({
            select: { id: true },
            where: {
                dynamicData: {
                    totalSharesNum: {
                        gt: 0.000000000001,
                    },
                },
            },
        });
        const chunks = _.chunk(pools, 10);

        for (const chunk of chunks) {
            const poolIds = chunk.map((pool) => pool.id);
            await this.poolSnapshotService.loadAllSnapshotsForPools(poolIds);
        }
    }

    public async syncLatestSnapshotsForAllPools(daysToSync?: number) {
        await this.poolSnapshotService.syncLatestSnapshotsForAllPools(daysToSync);
    }

    public async syncLatestReliquarySnapshotsForAllFarms() {
        await this.reliquarySnapshotService.syncLatestSnapshotsForAllFarms();
    }

    public async loadReliquarySnapshotsForAllFarms() {
        await prisma.prismaReliquaryTokenBalanceSnapshot.deleteMany({});
        await prisma.prismaReliquaryLevelSnapshot.deleteMany({});
        await prisma.prismaReliquaryFarmSnapshot.deleteMany({});
        const farms = await prisma.prismaPoolStakingReliquaryFarm.findMany({});
        const farmIds = farms.map((farm) => parseFloat(farm.id));
        for (const farmId of farmIds) {
            await this.reliquarySnapshotService.loadAllSnapshotsForFarm(farmId);
        }
    }

    public async updateLifetimeValuesForAllPools() {
        await this.poolUsdDataService.updateLifetimeValuesForAllPools();
    }

    public async createPoolSnapshotsForPoolsMissingSubgraphData(poolId: string) {
        await this.poolSnapshotService.createPoolSnapshotsForPoolsMissingSubgraphData(poolId);
    }

    public async reloadPoolNestedTokens(poolId: string) {
        await this.poolCreatorService.reloadPoolNestedTokens(poolId);
    }

    public async reloadAllTokenNestedPoolIds() {
        await this.poolCreatorService.reloadAllTokenNestedPoolIds();
    }

    public async reloadPoolTokenIndexes(poolId: string) {
        await this.poolCreatorService.reloadPoolTokenIndexes(poolId);
    }
}

export const poolService = new PoolService(
    jsonRpcProvider,
    new PoolCreatorService(userService),
    new PoolOnChainDataService(tokenService),
    new PoolUsdDataService(tokenService, blocksSubgraphService, balancerSubgraphService),
    new PoolGqlLoaderService(configService),
    new PoolSanityDataLoaderService(),
    new PoolAprUpdaterService([
        //order matters for the boosted pool aprs: linear, phantom stable, then boosted
        ...(isFantomNetwork()
            ? [
                  new SpookySwapAprService(tokenService),
                  new YearnVaultAprService(tokenService),
                  new StaderStakedFtmAprService(tokenService),
                  new AnkrStakedFtmAprService(tokenService),
              ]
            : [
                  new RocketPoolStakedEthAprService(tokenService),
                  new WstethAprService(
                      tokenService,
                      networkConfig.lido!.wstEthAprEndpoint,
                      networkConfig.lido!.wstEthContract,
                  ),
                  new OvernightAprService(networkConfig.overnight!.aprEndpoint, tokenService),
              ]),
        new ReaperCryptAprService(
            networkConfig.reaper.linearPoolFactories,
            networkConfig.reaper.averageAPRAcrossLastNHarvests,
            tokenService,
        ),
        new BeefyVaultAprService(networkConfig.beefy.linearPools, tokenService),
        new PhantomStableAprService(networkConfig.balancer.yieldProtocolFeePercentage),
        new BoostedPoolAprService(networkConfig.balancer.yieldProtocolFeePercentage),
        new SwapFeeAprService(networkConfig.balancer.swapProtocolFeePercentage),
        ...(isFantomNetwork()
            ? [new MasterchefFarmAprService(), new ReliquaryFarmAprService()]
            : [
                  new GaugeAprService(gaugeSerivce, tokenService, [
                      networkConfig.beets.address,
                      networkConfig.bal.address,
                  ]),
              ]),
    ]),
    new PoolSyncService(),
    new PoolSwapService(tokenService, balancerSubgraphService),
    isFantomNetwork()
        ? [
              new MasterChefStakingService(masterchefService),
              new ReliquaryStakingService(networkConfig.reliquary!.address, reliquarySubgraphService),
          ]
        : [new GaugeStakingService(gaugeSerivce)],
    new PoolSnapshotService(balancerSubgraphService, coingeckoService),
    new ReliquarySnapshotService(reliquarySubgraphService),
);
