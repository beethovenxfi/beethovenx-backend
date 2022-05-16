import _ from 'lodash';
import { Cache, CacheClass } from 'memory-cache';
import { GqlGasEstimatesData } from '../../schema';
import { cache } from '../cache/cache';
import { owlracleService } from './lib/owlracle.service';

const GAS_ESTIMATE_CACHE_KEY = 'gasEstimate';

export class GasEstimateService {
    cache: CacheClass<string, any>;

    constructor() {
        this.cache = new Cache<string, any>();
    }

    public async getGasEstimateData(): Promise<GqlGasEstimatesData[]> {
        const memCached = this.cache.get(GAS_ESTIMATE_CACHE_KEY) as GqlGasEstimatesData[] | null;
        if (memCached) {
            return memCached;
        }

        const cached = await cache.getObjectValue<GqlGasEstimatesData[]>(GAS_ESTIMATE_CACHE_KEY);
        if (cached) {
            this.cache.put(GAS_ESTIMATE_CACHE_KEY, cached, 15000);
            return cached;
        }

        return this.cacheGasEstimateData();
    }

    public async cacheGasEstimateData(): Promise<GqlGasEstimatesData[]> {
        const gasEstimateData = await Promise.all(owlracleService.getGasEstimates());
        await cache.putObjectValue(GAS_ESTIMATE_CACHE_KEY, gasEstimateData);
        return gasEstimateData;
    }
}

export const gasEstimateService = new GasEstimateService();
