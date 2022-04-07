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

    constructor() {
        this.baseUrl = 'https://owlracle.info/ftm/gas';
        this.requestParams = {
            apikey: env.OWLRACLE_API_KEY,
            blocks: 200,
            percentile: 0.3,
            accept: '50,70,90',
            version: 2,
        };
    }

    public async getGasEstimates(): Promise<GqlGasEstimatesData> {
        try {
            const response = await this.get<GqlGasEstimatesData>(this.requestParams);

            // sort low to high on acceptance
            const sortedSpeeds = response.speeds.sort((a, b) => {
                if (a.acceptance < b.acceptance) return -1;
                if (a.acceptance > b.acceptance) return 1;
                return 0;
            });
            const sortedResponse = {
                ...response,
                speeds: [...sortedSpeeds],
            };
            return sortedResponse;
        } catch (error) {
            console.error('Unable to fetch Owlracle gas estimates', error);
            throw error;
        }
    }

    private async get<T>(params: any): Promise<T> {
        const { data } = await axios.get(this.baseUrl, { params: { ...params } });
        return data;
    }
}

export const owlracleService = new OwlracleService();
