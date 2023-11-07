import { fantomCreateServices } from './fantom/services';
import { optimismCreateServices } from './optimism/services';
import { mainnetCreateServices } from './mainnet/services';
import { arbitrumCreateServices } from './arbitrum/services';
import { polygonCreateServices } from './polygon/services';
import { gnosisCreateServices } from './gnosis/services';
import { zkevmCreateServices } from './zkevm/services';
import { avalancheCreateServices } from './avalanche/services';
import { baseCreateServices } from './base/services';

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
