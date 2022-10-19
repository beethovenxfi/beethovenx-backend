import { GraphQLClient } from 'graphql-request';
import { env } from '../../../app/env';
import { subgraphLoadAll } from '../subgraph-util';
import { twentyFourHoursInMs } from '../../common/time';
import { Cache, CacheClass } from 'memory-cache';
import { networkConfig } from '../../config/network-config';
import {
    FarmFragment,
    getSdk,
    ReliquaryPoolsQuery,
    ReliquaryPoolsQueryVariables,
    ReliquaryQuery,
    ReliquaryQueryVariables,
    ReliquaryUsersQuery,
    ReliquaryUsersQueryVariables,
} from './generated/reliquary-subgraph-types';

export class ReliquarySubgraphService {
    private readonly cache: CacheClass<string, any>;
    private readonly client: GraphQLClient;

    constructor() {
        this.cache = new Cache<string, any>();
        this.client = new GraphQLClient(networkConfig.subgraphs.reliquary!);
    }

    public async getReliquary(args: ReliquaryQueryVariables): Promise<ReliquaryQuery> {
        return this.sdk.Reliquary(args);
    }

    public async getFarms(args: ReliquaryPoolsQueryVariables): Promise<ReliquaryPoolsQuery> {
        return this.sdk.ReliquaryPools(args);
    }

    public async getReliquaryUsers(args: ReliquaryUsersQueryVariables): Promise<ReliquaryUsersQuery> {
        return this.sdk.ReliquaryUsers(args);
    }

    public async getAllFarms(args: ReliquaryPoolsQueryVariables): Promise<FarmFragment[]> {
        return subgraphLoadAll<FarmFragment>(this.sdk.ReliquaryPools, 'farms', args);
    }

    // TODO this with paging
    // public async getAllFarmUsers(args: MasterchefUsersQueryVariables): Promise<FarmUserFragment[]> {
    //     return subgraphLoadAll<FarmUserFragment>(this.sdk.MasterchefUsers, 'farmUsers', args);
    // }

    public get sdk() {
        return getSdk(this.client);
    }
}

export const reliquaryService = new ReliquarySubgraphService();
