import { GraphQLClient } from 'graphql-request';
import { Cache, CacheClass } from 'memory-cache';
import { networkConfig } from '../../config/network-config';
import { subgraphLoadAll } from '../subgraph-util';
import {
    getSdk,
    ReliquaryFarmFragment,
    ReliquaryPoolsQuery,
    ReliquaryPoolsQueryVariables,
    ReliquaryQuery,
    ReliquaryQueryVariables,
    ReliquaryUserFragment,
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

    public async getAllFarms(args: ReliquaryPoolsQueryVariables): Promise<ReliquaryFarmFragment[]> {
        return subgraphLoadAll<ReliquaryFarmFragment>(this.sdk.ReliquaryPools, 'farms', args);
    }

    public async getAllFarmUsers(args: ReliquaryUsersQueryVariables): Promise<ReliquaryUserFragment[]> {
        return subgraphLoadAll<ReliquaryUserFragment>(this.sdk.ReliquaryUsers, 'reliquaryUsers', args);
    }

    public get sdk() {
        return getSdk(this.client);
    }
}

export const reliquaryService = new ReliquarySubgraphService();
