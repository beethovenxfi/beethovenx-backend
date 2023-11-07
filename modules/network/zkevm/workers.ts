import { every } from '../../../worker/intervals';
import { env } from '../../../app/env';
import { DeploymentEnv, WorkerJob } from '../network-config-types';

/*
For sub-minute jobs we set the alarmEvaluationPeriod and alarmDatapointsToAlarm to 1 instead of the default 3. 
This is needed because the minimum alarm period is 1 minute and we want the alarm to trigger already after 1 minute instead of 3.

For every 1 days jobs we set the alarmEvaluationPeriod and alarmDatapointsToAlarm to 1 instead of the default 3. 
This is needed because the maximum alarm evaluation period is 1 day (period * evaluationPeriod).
*/
export const zkevmWorkerJobs: WorkerJob[] = [
    {
        name: 'update-token-prices',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(10, 'minutes') : every(2, 'minutes'),
    },
    {
        name: 'update-liquidity-for-inactive-pools',
        interval: every(1, 'days'),
        alarmEvaluationPeriod: 1,
        alarmDatapointsToAlarm: 1,
    },
    {
        name: 'update-liquidity-for-active-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(8, 'minutes') : every(4, 'minutes'),
    },
    {
        name: 'update-pool-apr',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(7, 'minutes') : every(5, 'minutes'),
    },
    {
        name: 'load-on-chain-data-for-pools-with-active-updates',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(9, 'minutes') : every(5, 'minutes'),
    },
    {
        name: 'sync-new-pools-from-subgraph',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(12, 'minutes') : every(8, 'minutes'),
    },
    {
        name: 'sync-tokens-from-pool-tokens',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(10, 'minutes') : every(7, 'minutes'),
    },
    {
        name: 'update-liquidity-24h-ago-for-all-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(15, 'minutes') : every(8, 'minutes'),
    },
    {
        name: 'cache-average-block-time',
        interval: every(1, 'hours'),
    },
    {
        name: 'sync-staking-for-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(15, 'minutes') : every(10, 'minutes'),
    },
    {
        name: 'sync-latest-snapshots-for-all-pools',
        interval: every(90, 'minutes'),
    },
    {
        name: 'update-lifetime-values-for-all-pools',
        interval: every(45, 'minutes'),
    },
    {
        name: 'sync-changed-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(2, 'minutes') : every(1, 'minutes'),
        alarmEvaluationPeriod: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? 3 : 1,
        alarmDatapointsToAlarm: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? 3 : 1,
    },
    {
        name: 'user-sync-wallet-balances-for-all-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(29, 'minutes') : every(9, 'minutes'),
    },
    {
        name: 'user-sync-staked-balances',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(31, 'minutes') : every(11, 'minutes'),
    },
    {
        name: 'sync-coingecko-coinids',
        interval: every(2, 'hours'),
    },
    {
        name: 'purge-old-tokenprices',
        interval: every(1, 'days'),
        alarmEvaluationPeriod: 1,
        alarmDatapointsToAlarm: 1,
    },
    {
        name: 'update-fee-volume-yield-all-pools',
        interval: every(75, 'minutes'),
    },
    {
        name: 'sync-vebal-balances',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(20, 'minutes') : every(14, 'minutes'),
    },
    {
        name: 'sync-vebal-totalSupply',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(20, 'minutes') : every(16, 'minutes'),
    },
];
