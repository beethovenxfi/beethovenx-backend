import { JsonRpcProvider } from '@ethersproject/providers';
import { mainnetNetworkData as data } from './data';
import { mainnetWorkerJobs as workerJobs } from './workers';

export class MainnetNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
