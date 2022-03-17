import axios from 'axios';
import _ from 'lodash';
import { env } from '../../../app/env';

interface OwlracleRequest {
    apikey: string;
    blocks: number;
    percentile: number;
    accept: string;
    version: number;
}

interface Speed {
    acceptance: number;
    gasPrice: number;
    estimatedFee: number;
}

export interface OwlracleResponse {
    timestamp: string;
    baseFee: number;
    lastBlock: number;
    avgTime: number;
    avgTx: number;
    avgGas: number;
    speeds: Speed[];
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
            accept: '35,60,90',
            version: 2,
        };
    }

    public async getGasEstimates(): Promise<OwlracleResponse> {
        try {
            const response = await this.get(this.requestParams);
            return response as OwlracleResponse;
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
