import { JsonRpcProvider } from '@ethersproject/providers';
import { gnosisNetworkData as data } from './data';
import { gnosisWorkerJobs as workerJobs } from './workers';
import { createGnosisServices as createServices } from './services';

let services: ReturnType<typeof createServices>;

export class GnosisNetworkConfig {
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
