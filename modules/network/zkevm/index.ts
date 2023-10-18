import { JsonRpcProvider } from '@ethersproject/providers';
import { zkevmNetworkData as data } from './data';
import { zkevmWorkerJobs as workerJobs } from './workers';
export * from './services';

export class ZkevmNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
