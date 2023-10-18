import { JsonRpcProvider } from '@ethersproject/providers';
import { avalancheNetworkData as data } from './data';
import { avalancheWorkerJobs as workerJobs } from './workers';
export * from './services';

export class AvalancheNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
