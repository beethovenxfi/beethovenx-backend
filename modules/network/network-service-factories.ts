import { createFantomServices } from './fantom';
import { createOptimismServices } from './optimism';
import { createMainnetServices } from './mainnet/services';
import { createArbitrumServices } from './arbitrum';
import { createPolygonServices } from './polygon';
import { createGnosisServices } from './gnosis';
import { createZkevmServices } from './zkevm';
import { createAvalancheServices } from './avalanche';
import { createBaseServices } from './base';

export const networkServiceFactories = {
    '250': createFantomServices,
    '10': createOptimismServices,
    '1': createMainnetServices,
    '42161': createArbitrumServices,
    '137': createPolygonServices,
    '100': createGnosisServices,
    '1101': createZkevmServices,
    '43114': createAvalancheServices,
    '8453': createBaseServices,
};