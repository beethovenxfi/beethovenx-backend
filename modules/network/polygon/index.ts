import { JsonRpcProvider } from '@ethersproject/providers';
import { polygonNetworkData as data } from './data';
import { polygonWorkerJobs as workerJobs } from './workers';
export * from './services';

export class PolygonNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
