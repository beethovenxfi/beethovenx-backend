import { GraphQLClient } from 'graphql-request';
import { env } from '../../../app/env';
import { subgraphPurgeCacheKeyAtBlock } from '../../util/subgraph-util';
import { twentyFourHoursInMs } from '../../util/time';
import { Cache, CacheClass } from 'memory-cache';
import {
    FarmFragment,
    FarmUserFragment,
    getBuiltGraphSDK,
    MasterchefFarmsQuery,
    MasterchefFarmsQueryVariables,
    MasterchefPortfolioDataQuery,
    MasterchefPortfolioDataQueryVariables,
    MasterchefsQueryVariables,
    MasterchefSubgraph_MasterChef,
    MasterchefUsersQuery,
    MasterchefUsersQueryVariables,
    Sdk,
} from '../../../.graphclient';

const ALL_FARM_USERS_CACHE_KEY = 'masterchef-all-farm-users';

export class MasterchefSubgraphService {
    private readonly cache: CacheClass<string, any>;
    private readonly client: GraphQLClient;
    private sdk: Sdk | null = null;

    constructor() {
        this.cache = new Cache<string, any>();
        this.client = new GraphQLClient(env.MASTERCHEF_SUBGRAPH);
    }

    public async getMasterChef(args: MasterchefsQueryVariables): Promise<MasterchefSubgraph_MasterChef> {
        const sdk = await this.getSdk();
        const response = await sdk.Masterchefs(args);

        if (!response || response.masterChefs.length === 0) {
            throw new Error('Missing masterchef');
        }

        //There is only ever one
        return response.masterChefs[0];
    }

    public async getFarms(args: MasterchefFarmsQueryVariables): Promise<MasterchefFarmsQuery> {
        const sdk = await this.getSdk();
        return sdk.MasterchefFarms(args);
    }

    public async getFarmUsers(args: MasterchefUsersQueryVariables): Promise<MasterchefUsersQuery> {
        const sdk = await this.getSdk();
        return sdk.MasterchefUsers(args);
    }

    public async getFarmUsersAtBlock(address: string, block: number): Promise<FarmUserFragment[]> {
        const cachedUsers = this.cache.get(`${ALL_FARM_USERS_CACHE_KEY}:${block}`) as FarmUserFragment[] | null;

        if (cachedUsers) {
            return cachedUsers.filter((user) => user.address === address) || null;
        }

        const users = await this.getAllFarmUsers({ block: { number: block } });

        this.cache.put(`${ALL_FARM_USERS_CACHE_KEY}:${block}`, users, twentyFourHoursInMs);

        return users.filter((user) => user.id === address);
    }

    public async getAllFarms(args: MasterchefFarmsQueryVariables): Promise<FarmFragment[]> {
        const sdk = await this.getSdk();
        const { farms } = await sdk.MasterchefFarms(args);

        return farms;
    }

    public async getAllFarmUsers(args: MasterchefUsersQueryVariables): Promise<FarmUserFragment[]> {
        const sdk = await this.getSdk();
        //TODO: needs to be reworked
        const { farmUsers } = await sdk.MasterchefUsers({ ...args, first: 10000 });

        return farmUsers;
    }

    public async getPortfolioData(args: MasterchefPortfolioDataQueryVariables): Promise<MasterchefPortfolioDataQuery> {
        const sdk = await this.getSdk();
        return sdk.MasterchefPortfolioData(args);
    }

    public getFarmForPoolAddress(poolAddress: string, farms: FarmFragment[]): FarmFragment | null {
        return farms.find((farm) => farm.pair.toLowerCase() === poolAddress.toLowerCase()) || null;
    }

    public async clearCacheAtBlock(block: number) {
        await subgraphPurgeCacheKeyAtBlock(ALL_FARM_USERS_CACHE_KEY, block);
    }

    private async getSdk(): Promise<Sdk> {
        if (this.sdk === null) {
            this.sdk = await getBuiltGraphSDK();
        }

        return this.sdk;
    }
}

export const masterchefService = new MasterchefSubgraphService();
