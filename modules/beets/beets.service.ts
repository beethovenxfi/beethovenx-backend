import _ from 'lodash';
import { Cache, CacheClass } from 'memory-cache';
import { env } from '../../app/env';
import { GqlBeetsConfig, GqlBeetsProtocolData } from '../../schema';
import { balancerSubgraphService } from '../balancer-subgraph/balancer-subgraph.service';
import { balancerService } from '../balancer/balancer.service';
import { blocksSubgraphService } from '../blocks-subgraph/blocks-subgraph.service';
import { cache } from '../cache/cache';
import { sanityClient } from '../sanity/sanity';
import { tokenPriceService } from '../token-price/token-price.service';
import { fiveMinutesInMs } from '../util/time';
import { getCirculatingSupply } from './beets';

export class BeetsService {
    constructor(private readonly fBeetsService: FbeetsService) {}

    public async getFbeetsRatio(): Promise<string> {
        return this.fBeetsService.getRatio();
    }

    public async getFBeetsPrice(): Promise<number> {
        const protocolData = await this.getProtocolData();
        return parseFloat(protocolData.beetsPrice);
    }

    public async getProtocolData(): Promise<GqlBeetsProtocolData> {
        const memCached = this.cache.get(PROTOCOL_DATA_CACHE_KEY) as GqlBeetsProtocolData | null;

        if (memCached) {
            return memCached;
        }

        const cached = await cache.getObjectValue<GqlBeetsProtocolData>(PROTOCOL_DATA_CACHE_KEY);

        if (cached) {
            this.cache.put(PROTOCOL_DATA_CACHE_KEY, cached, 15000);

            return cached;
        }

        return this.cacheProtocolData();
    }

    public async getBeetsPrice(): Promise<string> {
        const tokenPrices = await tokenService.getTokenPrices();
        return tokenService.getPriceForToken(tokenPrices, networkConfig.beets.address).toString();
    }
}

export const beetsService = new BeetsService(
    new FbeetsService(
        getContractAt(networkConfig.fbeets?.address ?? AddressZero, FreshBeetsAbi),
        getContractAt(networkConfig.fbeets?.poolAddress ?? AddressZero, ERC20),
    ),
);
