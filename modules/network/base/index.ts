import { JsonRpcProvider } from '@ethersproject/providers';
import { baseNetworkData as data } from './data';
import { baseWorkerJobs as workerJobs } from './workers';

export class BaseNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
