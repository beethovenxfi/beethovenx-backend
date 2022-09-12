import { PrismaPoolType } from '@prisma/client';
import { networkConfig } from '../../config/network-config';

export function isStablePool(poolType: PrismaPoolType) {
    return (
        poolType === 'STABLE' ||
        poolType === 'META_STABLE' ||
        poolType === 'PHANTOM_STABLE' ||
        poolType === 'COMPOSABLE_STABLE'
    );
}

export function isWeightedPoolV2(poolType: PrismaPoolType, factoryAddress?: string | null) {
    return poolType === 'WEIGHTED' && factoryAddress === networkConfig.balancer.weightedPoolV2Factory;
}
