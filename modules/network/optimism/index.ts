import { JsonRpcProvider } from '@ethersproject/providers';
import { optimismNetworkData as data } from './data';
import { optimismWorkerJobs as workerJobs } from './workers';
export * from './services';

export class OptimismNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
