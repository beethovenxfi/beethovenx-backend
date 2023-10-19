import { fantomCreateServices } from './fantom';
import { optimismCreateServices } from './optimism';
import { mainnetCreateServices } from './mainnet/services';
import { arbitrumCreateServices } from './arbitrum';
import { polygonCreateServices } from './polygon';
import { gnosisCreateServices } from './gnosis';
import { zkevmCreateServices } from './zkevm';
import { avalancheCreateServices } from './avalanche';
import { baseCreateServices } from './base';

export const networkServiceFactories = {
    '250': fantomCreateServices,
    '10': optimismCreateServices,
    '1': mainnetCreateServices,
    '42161': arbitrumCreateServices,
    '137': polygonCreateServices,
    '100': gnosisCreateServices,
    '1101': zkevmCreateServices,
    '43114': avalancheCreateServices,
    '8453': baseCreateServices,
};
