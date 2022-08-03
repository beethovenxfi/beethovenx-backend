import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/gauge-subgraph-types';
import { networkConfig } from '../../config/network-config';

export class GaugeSubgraphService {
    private readonly client: GraphQLClient;

    constructor() {
        this.client = new GraphQLClient(networkConfig.subgraphs.gauge);
    }
    public async getAllGauges() {
        const gaugesQuery = await this.sdk.LiquidityGauges();
        return gaugesQuery.liquidityGauges;
    }

    public async getUserGauges(userAddress: string) {
        const userGaugesQuery = await this.sdk.UserGauges({ userAddress });
        return userGaugesQuery.user;
    }
    public async getStreamers() {
        const streamersQuery = await this.sdk.Streamers();
        return streamersQuery.streamers;
    }

    public get sdk() {
        return getSdk(this.client);
    }
}

export const gaugeSubgraphService = new GaugeSubgraphService();
