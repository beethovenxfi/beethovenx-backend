import axios from 'axios';
import _ from 'lodash';
import { env } from '../../../app/env';
import { GqlGasEstimatesData } from '../../../schema';

interface OwlracleRequest {
    apikey: string;
    blocks: number;
    percentile: number;
    accept: string;
    version: number;
}
export class OwlracleService {
    private readonly baseUrl: string;
    private readonly requestParams: OwlracleRequest;

    chains = [
        { id: 250, name: 'ftm' },
        //{ id: 137, name: 'poly' },
    ];

    constructor() {
        this.baseUrl = 'https://owlracle.info/';
        this.requestParams = {
            apikey: env.OWLRACLE_API_KEY,
            blocks: 200,
            percentile: 0.3,
            accept: '50,70,90',
            version: 2,
        };
    }

    public async getGasEstimate(chain: any): Promise<GqlGasEstimatesData> {
        try {
            const response = await this.get<GqlGasEstimatesData>(chain.name, this.requestParams);

            // sort low to high on acceptance
            const sortedSpeeds = response.speeds.sort((a, b) => {
                if (a.acceptance < b.acceptance) return -1;
                if (a.acceptance > b.acceptance) return 1;
                return 0;
            });
            const sortedResponse = {
                ...response,
                speeds: [...sortedSpeeds],
                chainId: chain.id,
            };
            return sortedResponse;
        } catch (error) {
            console.error('Unable to fetch Owlracle gas estimates', error);
            throw error;
        }
    }

    public getGasEstimates(): Promise<GqlGasEstimatesData>[] {
        return this.chains.map(async (chain) => await this.getGasEstimate(chain));
    }

    private async get<T>(chainName: string, params: any): Promise<T> {
        const { data } = await axios.get(`${this.baseUrl}${chainName}/gas`, { params: { ...params } });
        return data;
    }
}

export const owlracleService = new OwlracleService();
