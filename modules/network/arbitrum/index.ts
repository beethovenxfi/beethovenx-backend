import { JsonRpcProvider } from '@ethersproject/providers';
import { arbitrumNetworkData as data } from './data';
import { arbitrumWorkerJobs as workerJobs } from './workers';
export * from './services';

export class ArbitrumNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
