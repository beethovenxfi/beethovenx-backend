import { FantomNetworkConfig } from './fantom';
import { OptimismNetworkConfig } from './optimism';
import type { NetworkConfig } from './network-config-types';
import { MainnetNetworkConfig } from './mainnet';
import { ArbitrumNetworkConfig } from './arbitrum';
import { PolygonNetworkConfig } from './polygon';
import { GnosisNetworkConfig } from './gnosis';
import { ZkevmNetworkConfig } from './zkevm';
import { AvalancheNetworkConfig } from './avalanche';
import { BaseNetworkConfig } from './base';
import { Chain } from '@prisma/client';

export const AllNetworkConfigs: { [chainId: string]: NetworkConfig } = {
    '250': FantomNetworkConfig,
    '10': OptimismNetworkConfig,
    '1': MainnetNetworkConfig,
    '42161': ArbitrumNetworkConfig,
    '137': PolygonNetworkConfig,
    '100': GnosisNetworkConfig,
    '1101': ZkevmNetworkConfig,
    '43114': AvalancheNetworkConfig,
    '8453': BaseNetworkConfig,
};

export const AllNetworkConfigsKeyedOnChain: { [chain in Chain]: NetworkConfig } = {
    FANTOM: FantomNetworkConfig,
    OPTIMISM: OptimismNetworkConfig,
    MAINNET: MainnetNetworkConfig,
    ARBITRUM: ArbitrumNetworkConfig,
    POLYGON: PolygonNetworkConfig,
    GNOSIS: GnosisNetworkConfig,
    ZKEVM: ZkevmNetworkConfig,
    AVALANCHE: AvalancheNetworkConfig,
    BASE: BaseNetworkConfig,
};

export const BalancerChainIds = ['1', '137', '42161', '100', '1101', '43114', '8453'] as const;
export const BeethovenChainIds = ['250', '10'] as const;
const allChains = [...BalancerChainIds, ...BeethovenChainIds] as const;

export type ChainIDs = typeof allChains[number];
