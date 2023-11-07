import { JsonRpcProvider } from '@ethersproject/providers';
import { gnosisNetworkData as data } from './data';
import { gnosisWorkerJobs as workerJobs } from './workers';

export class GnosisNetworkConfig {
    static data = data;
    static workerJobs = workerJobs;
    static provider = new JsonRpcProvider({ url: data.rpcUrl, timeout: 60000 })
};
