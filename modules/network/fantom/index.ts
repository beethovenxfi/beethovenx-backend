import { JsonRpcProvider } from '@ethersproject/providers';
import { fantomNetworkData as data } from './data';
import { fantomWorkerJobs as workerJobs } from './workers';
export * from './services';

export class FantomNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
