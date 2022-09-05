import { Cache, CacheClass } from 'memory-cache';
import { GraphQLClient } from 'graphql-request';
import { networkConfig } from '../../config/network-config';

import moment from 'moment-timezone';
import {
    getSdk,
    OrderDirection,
    QueryUserBalanceSnapshotsArgs,
    UserBalanceSnapshot_OrderBy,
    UserBalanceSnapshotsQuery,
} from './generated/user-snapshot-subgraph-types';

export class UserSnapshotSubgraphService {
    private readonly cache: CacheClass<string, any>;
    private readonly client: GraphQLClient;

    constructor() {
        this.cache = new Cache<string, any>();
        this.client = new GraphQLClient(networkConfig.subgraphs.userBalances);
    }

    public async getMetadata() {
        const { meta } = await this.sdk.UserSnapshotGetMeta();

        if (!meta) {
            throw new Error('Missing meta data');
        }

        return meta;
    }

    public async userBalanceSnapshots(args: QueryUserBalanceSnapshotsArgs): Promise<UserBalanceSnapshotsQuery> {
        return this.sdk.UserBalanceSnapshots(args);
    }

    public async getUserBalanceSnapshotsForLastNDays(
        userAddress: string,
        numDays: number,
    ): Promise<UserBalanceSnapshotsQuery> {
        //TODO: what if numDays is > 1000? we've got some time before we need to worry about this though
        const timestamp = moment().utc().startOf('day').subtract(numDays, 'days').unix();

        return this.sdk.UserBalanceSnapshots({
            where: { user: userAddress.toLowerCase(), timestamp_gte: timestamp },
            orderBy: UserBalanceSnapshot_OrderBy.Timestamp,
            orderDirection: OrderDirection.Asc,
        });
    }

    public async getAllBalanceSnapshotsForLastNDays(numDays: number): Promise<UserBalanceSnapshotsQuery> {
        let timestamp = 0;
        if (numDays > 0) {
            timestamp = moment().utc().startOf('day').subtract(numDays, 'days').unix();
        }

        let allSnapshots: UserBalanceSnapshotsQuery = {
            snapshots: [],
        };
        let lastId = '';
        do {
            const result = await this.sdk.UserBalanceSnapshots({
                where: { timestamp_gte: timestamp, id_gt: lastId },
                first: 1000,
                orderBy: UserBalanceSnapshot_OrderBy.Id,
                orderDirection: OrderDirection.Asc,
            });
            if (result.snapshots.length == 0) {
                break;
            }
            allSnapshots.snapshots = [...allSnapshots.snapshots, ...result.snapshots];
            console.log(`Got ${result.snapshots.length} from subgraph, now got ${allSnapshots.snapshots.length}`);
            lastId = result.snapshots[result.snapshots.length - 1].id;
        } while (true);

        console.log(`Total: ${allSnapshots.snapshots.length}`);
        return allSnapshots;
    }

    public get sdk() {
        return getSdk(this.client);
    }
}

export const userSnapshotSubgraphService = new UserSnapshotSubgraphService();
