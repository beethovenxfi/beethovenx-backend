import { cache } from '../cache/cache';

export async function subgraphPurgeCacheKeyAtBlock(cacheKey: string, block: number): Promise<number> {
    return cache.deleteKey(`${cacheKey}_${block}`);
}
