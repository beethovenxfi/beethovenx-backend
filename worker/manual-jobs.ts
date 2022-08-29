import { isFantomNetwork } from '../modules/config/network-config';
import { createAlertsIfNotExist } from './create-alerts';
import { fantomJobs } from './fantom-jobs';
import { optimismJobs } from './optimism-jobs';
import { workerQueue } from './queue';

export type WorkerJob = {
    name: string;
    interval: number;
};

async function scheduleJobWithInterval(job: string, intervalMs: number): Promise<void> {
    await workerQueue.sendWithInterval(JSON.stringify({ type: job }), intervalMs);
}

export async function scheduleJobsAndAlert(): Promise<void> {
    if (isFantomNetwork()) {
        await createAlertsIfNotExist(fantomJobs);
        fantomJobs.forEach(async (job) => await scheduleJobWithInterval(job.name, job.interval));
    } else {
        await createAlertsIfNotExist(optimismJobs);
        optimismJobs.forEach(async (job) => await scheduleJobWithInterval(job.name, job.interval));
    }
}
