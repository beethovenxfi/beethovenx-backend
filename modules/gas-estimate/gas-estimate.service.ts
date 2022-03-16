import _ from 'lodash';
import { Cache, CacheClass } from 'memory-cache';
import { cache } from '../cache/cache';
import { owlracleService, OwlracleResponse } from './lib/owlracle.service';

const GAS_ESTIMATE_CACHE_KEY = 'beetsGasEstimate';

export class GasEstimateService {
    cache: CacheClass<string, any>;

    constructor() {
        this.cache = new Cache<string, any>();
    }

    public async getGasEstimateData(): Promise<OwlracleResponse> {
        const memCached = this.cache.get(GAS_ESTIMATE_CACHE_KEY) as OwlracleResponse | null;
        if (memCached) {
            return memCached;
        }

        const cached = await cache.getObjectValue<OwlracleResponse>(GAS_ESTIMATE_CACHE_KEY);
        if (cached) {
            this.cache.put(GAS_ESTIMATE_CACHE_KEY, cached, 15000);
            return cached;
        }

        return this.cacheGasEstimateData();
    }

    public async cacheGasEstimateData(): Promise<OwlracleResponse> {
        const gasEstimateData = await owlracleService.getGasEstimates();
        await cache.putObjectValue(GAS_ESTIMATE_CACHE_KEY, gasEstimateData);

        return gasEstimateData;
    }
}

export const gasEstimateService = new GasEstimateService();
