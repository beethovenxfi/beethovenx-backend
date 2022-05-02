import { GraphQLClient } from 'graphql-request';
import { env } from '../../../app/env';
import _ from 'lodash';
import { subgraphPurgeCacheKeyAtBlock } from '../../util/subgraph-util';
import { Cache, CacheClass } from 'memory-cache';
import { fiveMinutesInMs, fiveMinutesInSeconds, twentyFourHoursInMs } from '../../util/time';
import { cache } from '../../cache/cache';
import { BalancerUserPoolShare } from './balancer-subgraph-types';
import {
    BalancerJoinExitsQuery,
    BalancerJoinExitsQueryVariables,
    BalancerLatestPriceFragment,
    BalancerLatestPricesQuery,
    BalancerLatestPricesQueryVariables,
    BalancerPoolFragment,
    BalancerPoolQuery,
    BalancerPoolQueryVariables,
    BalancerPoolShareFragment,
    BalancerPoolSharesQueryVariables,
    BalancerPoolSnapshotFragment,
    BalancerPoolSnapshotsQuery,
    BalancerPoolSnapshotsQueryVariables,
    BalancerPoolsQuery,
    BalancerPoolsQueryVariables,
    BalancerPortfolioDataQuery,
    BalancerPortfolioPoolsDataQuery,
    BalancerProtocolDataQueryVariables,
    BalancerSubgraph_Balancer,
    BalancerSwapFragment,
    BalancerSwapsQuery,
    BalancerSwapsQueryVariables,
    BalancerTokenPriceFragment,
    BalancerTokenPricesQuery,
    BalancerTokenPricesQueryVariables,
    BalancerTradePairSnapshotsQuery,
    BalancerTradePairSnapshotsQueryVariables,
    BalancerUserFragment,
    BalancerUsersQueryVariables,
    getBuiltGraphSDK,
    Sdk,
} from '../../../.graphclient';

const ALL_USERS_CACHE_KEY = 'balance-subgraph_all-users';
const ALL_POOLS_CACHE_KEY = 'balance-subgraph_all-pools';
const ALL_JOIN_EXITS_CACHE_KEY = 'balance-subgraph_all-join-exits';
const PORTFOLIO_POOLS_CACHE_KEY = 'balance-subgraph_portfolio-pools';
const USER_CACHE_KEY_PREFIX = 'balance-subgraph_user:';

export class BalancerSubgraphService {
    private cache: CacheClass<string, any>;
    private readonly client: GraphQLClient;
    private sdk: Sdk | null = null;

    constructor() {
        this.cache = new Cache<string, any>();
        this.client = new GraphQLClient(env.BALANCER_SUBGRAPH);
    }

    public async getProtocolData(args: BalancerProtocolDataQueryVariables): Promise<BalancerSubgraph_Balancer> {
        const sdk = await this.getSdk();
        const { balancers } = await sdk.BalancerProtocolData(args);

        if (balancers.length === 0) {
            throw new Error('Missing protocol data');
        }

        //There is only ever one
        return balancers[0] as BalancerSubgraph_Balancer;
    }

    public async getTokenPrices(args: BalancerTokenPricesQueryVariables): Promise<BalancerTokenPricesQuery> {
        const sdk = await this.getSdk();
        return sdk.BalancerTokenPrices(args);
    }

    public async getPools(args: BalancerPoolsQueryVariables): Promise<BalancerPoolsQuery> {
        const sdk = await this.getSdk();
        return sdk.BalancerPools(args);
    }

    public async getSwaps(args: BalancerSwapsQueryVariables): Promise<BalancerSwapsQuery> {
        const sdk = await this.getSdk();
        return sdk.BalancerSwaps(args);
    }

    public async getAllSwaps(args: BalancerSwapsQueryVariables): Promise<BalancerSwapFragment[]> {
        const sdk = await this.getSdk();

        const { swaps } = await sdk.BalancerSwaps({ ...args, first: 5000 });

        return swaps;
    }

    public async getPool(args: BalancerPoolQueryVariables): Promise<BalancerPoolQuery> {
        const sdk = await this.getSdk();
        return sdk.BalancerPool(args);
    }

    public async getPortfolioData(id: string, previousBlockNumber: number): Promise<BalancerPortfolioDataQuery> {
        const sdk = await this.getSdk();
        return sdk.BalancerPortfolioData({ id, previousBlockNumber });
    }

    public async getUser(userAddress: string): Promise<BalancerUserFragment | null> {
        const sdk = await this.getSdk();
        const { users } = await sdk.BalancerUsers({ where: { id: userAddress.toLowerCase() }, first: 1 });

        if (users.length === 0) {
            return null;
        }

        return this.normalizeBalancerUser(users[0]);
    }

    public async getAllUsers(args: BalancerUsersQueryVariables): Promise<BalancerUserFragment[]> {
        const sdk = await this.getSdk();

        //TODO: need to rework this
        const { users } = await sdk.BalancerUsers({ ...args, first: 10000 });

        return users.map((user) => this.normalizeBalancerUser(user));
    }

    public async getPoolShares(args: BalancerPoolSharesQueryVariables): Promise<BalancerUserPoolShare[]> {
        const sdk = await this.getSdk();
        const { poolShares } = await sdk.BalancerPoolShares(args);

        return poolShares.map((shares) => ({
            ...shares,
            //ensure the user balance isn't negative, unsure how the subgraph ever allows this to happen
            balance: parseFloat(shares.balance) < 0 ? '0' : shares.balance,
            poolAddress: shares.id.split('-')[0],
            userAddress: shares.id.split('-')[1],
        }));
    }

    public async getAllPoolShares(args: BalancerPoolSharesQueryVariables): Promise<BalancerUserPoolShare[]> {
        const sdk = await this.getSdk();

        //TODO: need to rework this
        const { poolShares } = await sdk.BalancerPoolShares({ ...args, first: 10000 });

        return poolShares.map((shares) => ({
            ...shares,
            //ensure the user balance isn't negative, unsure how the subgraph ever allows this to happen
            balance: parseFloat(shares.balance) < 0 ? '0' : shares.balance,
            poolAddress: shares.id.split('-')[0],
            userAddress: shares.id.split('-')[1],
        }));
    }

    public async getLatestPrices(args: BalancerLatestPricesQueryVariables): Promise<BalancerLatestPricesQuery> {
        const sdk = await this.getSdk();
        return sdk.BalancerLatestPrices(args);
    }

    public async getLatestPrice(id: string): Promise<BalancerLatestPriceFragment | null> {
        const sdk = await this.getSdk();
        const { latestPrice } = await sdk.BalancerLatestPrice({ id });

        return latestPrice || null;
    }

    public async getAllTokenPrices(args: BalancerTokenPricesQueryVariables): Promise<BalancerTokenPriceFragment[]> {
        const sdk = await this.getSdk();
        //TODO: rework
        const { tokenPrices } = await sdk.BalancerTokenPrices({ ...args, first: 5000 });

        return tokenPrices;
    }

    public async getAllPools(args: BalancerPoolsQueryVariables): Promise<BalancerPoolFragment[]> {
        const sdk = await this.getSdk();
        //TODO: rework
        const { pools } = await sdk.BalancerPools({ ...args, first: 1000 });

        return pools;
    }

    public async getPoolJoinExits(args: BalancerJoinExitsQueryVariables): Promise<BalancerJoinExitsQuery> {
        const sdk = await this.getSdk();
        return sdk.BalancerJoinExits(args);
    }

    public async cachePortfolioPoolsData(previousBlockNumber: number): Promise<BalancerPortfolioPoolsDataQuery> {
        const sdk = await this.getSdk();
        const response = await sdk.BalancerPortfolioPoolsData({ previousBlockNumber });

        await cache.putObjectValue(PORTFOLIO_POOLS_CACHE_KEY, response, 5);

        return response;
    }

    public async getPortfolioPoolsData(previousBlockNumber: number): Promise<BalancerPortfolioPoolsDataQuery> {
        const memCached = this.cache.get(PORTFOLIO_POOLS_CACHE_KEY) as BalancerPortfolioPoolsDataQuery | null;

        if (memCached) {
            return memCached;
        }

        const cached = await cache.getObjectValue<BalancerPortfolioPoolsDataQuery>(PORTFOLIO_POOLS_CACHE_KEY);

        if (cached) {
            this.cache.put(PORTFOLIO_POOLS_CACHE_KEY, cached, fiveMinutesInMs);

            return cached;
        }

        return this.cachePortfolioPoolsData(previousBlockNumber);
    }

    public async getAllPoolsAtBlock(block: number): Promise<BalancerPoolFragment[]> {
        const sdk = await this.getSdk();
        const cached = this.cache.get(`${ALL_POOLS_CACHE_KEY}:${block}`) as BalancerPoolFragment[] | null;

        if (cached) {
            return cached;
        }

        const { pools } = await sdk.BalancerPools({
            first: 1000,
            where: { totalShares_gt: '0' },
            block: { number: block },
        });

        this.cache.put(`${ALL_POOLS_CACHE_KEY}:${block}`, pools, twentyFourHoursInMs);

        return pools;
    }

    public async getTradePairSnapshots(
        args: BalancerTradePairSnapshotsQueryVariables,
    ): Promise<BalancerTradePairSnapshotsQuery> {
        const sdk = await this.getSdk();
        return sdk.BalancerTradePairSnapshots(args);
    }

    public async clearCacheAtBlock(block: number) {
        await subgraphPurgeCacheKeyAtBlock(ALL_USERS_CACHE_KEY, block);
        await subgraphPurgeCacheKeyAtBlock(ALL_POOLS_CACHE_KEY, block);
        await subgraphPurgeCacheKeyAtBlock(ALL_JOIN_EXITS_CACHE_KEY, block);
    }

    public async clearPoolsAtBlock(block: number) {
        await subgraphPurgeCacheKeyAtBlock(ALL_POOLS_CACHE_KEY, block);
    }

    private normalizeBalancerUser(user: BalancerUserFragment): BalancerUserFragment {
        return {
            ...user,
            sharesOwned: user.sharesOwned?.map((shares) => ({
                ...shares,
                //ensure the user balance isn't negative, unsure how the subgraph ever allows this to happen
                balance: parseFloat(shares.balance) < 0 ? '0' : shares.balance,
            })),
        };
    }

    private async getSdk(): Promise<Sdk> {
        if (this.sdk === null) {
            this.sdk = await getBuiltGraphSDK();
        }

        return this.sdk;
    }
}

export const balancerSubgraphService = new BalancerSubgraphService();
