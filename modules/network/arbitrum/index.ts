import { JsonRpcProvider } from '@ethersproject/providers';
import { data } from './data';
import { workerJobs } from './workers';
import { createServices } from './services';

let services: ReturnType<typeof createServices>;

export class arbitrumNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })

    static get contentService() {
        if (!services) services = createServices();

        return services.contentService;
    }

    static get poolAprServices() {
        if (!services) services = createServices();

        return services.poolAprServices;
    }

    static get poolStakingServices() {
        if (!services) services = createServices();

        return services.poolStakingServices;
    }

    static get tokenPriceHandlers() {
        if (!services) services = createServices();

        return services.tokenPriceHandlers;
    }

    static get userStakedBalanceServices() {
        if (!services) services = createServices();

        return services.userStakedBalanceServices;
    }
    
};
