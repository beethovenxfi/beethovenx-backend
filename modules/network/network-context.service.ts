import { AllNetworkConfigs, BalancerChainIds, BeethovenChainIds, ChainIDs } from './network-config';
import { env } from '../../app/env';
import { Chain } from '@prisma/client';
import type { NetworkConfig, NetworkData, NetworkServices } from './network-config-types';
import { BaseProvider } from '@ethersproject/providers';
import { getRequestScopeContextValue } from '../context/request-scoped-context';
import { networkServiceFactories } from './network-service-factories';

const services: Map<ChainIDs, NetworkServices> = new Map();

class NetworkContextService {
    constructor(
        private readonly defaultChainId: ChainIDs = env.DEFAULT_CHAIN_ID as ChainIDs,
        private configs = AllNetworkConfigs
    ) {}

    public isValidChainId(chainId: ChainIDs) {
        return !!this.configs[chainId];
    }

    get chainId(): ChainIDs {
        const chainId = getRequestScopeContextValue<ChainIDs>('chainId');

        return chainId ?? this.defaultChainId;
    }

    public get config(): NetworkConfig {
        return this.configs[this.chainId];
    }

    public get data(): NetworkData {
        return this.config.data;
    }

    public get services(): NetworkServices {
        if (!services.get(this.chainId)) {
            // TODO: We might need to start passing all the configuration data down to the service factories
            services.set(this.chainId, networkServiceFactories[this.chainId]());
        }

        return services.get(this.chainId)!;
    }

    public get chain(): Chain {
        return this.data.chain.prismaId;
    }

    public get provider(): BaseProvider {
        return this.config.provider;
    }

    public get isFantomNetwork() {
        return this.data.chain.id === 250;
    }

    public get isMainnet() {
        return this.data.chain.id === 1;
    }

    public get isBalancerChain(): boolean {
        return BalancerChainIds.includes(this.chainId as any);
    }

    public get isBeethovenChain(): boolean {
        return BeethovenChainIds.includes(this.chainId as any);
    }

    public get protocolSupportedChainIds(): typeof BalancerChainIds | typeof BeethovenChainIds {
        return this.isBalancerChain ? BalancerChainIds : BeethovenChainIds;
    }
}

export const networkContext = new NetworkContextService(env.DEFAULT_CHAIN_ID as ChainIDs, AllNetworkConfigs);
