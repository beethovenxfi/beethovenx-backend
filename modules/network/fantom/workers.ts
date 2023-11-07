import { every } from '../../../worker/intervals';
import { env } from '../../../app/env';
import { DeploymentEnv } from '../network-config-types';

/*
For sub-minute jobs we set the alarmEvaluationPeriod and alarmDatapointsToAlarm to 1 instead of the default 3. 
This is needed because the minimum alarm period is 1 minute and we want the alarm to trigger already after 1 minute instead of 3.

For every 1 days jobs we set the alarmEvaluationPeriod and alarmDatapointsToAlarm to 1 instead of the default 3. 
This is needed because the maximum alarm evaluation period is 1 day (period * evaluationPeriod).
*/
export const fantomWorkerJobs = [
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
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(6, 'minutes') : every(2, 'minutes'),
    },
    {
        name: 'update-pool-apr',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(6, 'minutes') : every(2, 'minutes'),
    },
    {
        name: 'load-on-chain-data-for-pools-with-active-updates',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(4, 'minutes') : every(1, 'minutes'),
    },
    {
        name: 'sync-new-pools-from-subgraph',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(6, 'minutes') : every(2, 'minutes'),
    },
    {
        name: 'sync-sanity-pool-data',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(9, 'minutes') : every(3, 'minutes'),
    },
    {
        name: 'sync-tokens-from-pool-tokens',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(10, 'minutes') : every(5, 'minutes'),
    },
    {
        name: 'update-liquidity-24h-ago-for-all-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(10, 'minutes') : every(5, 'minutes'),
    },
    {
        name: 'cache-average-block-time',
        interval: every(1, 'hours'),
    },
    {
        name: 'sync-staking-for-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(10, 'minutes') : every(5, 'minutes'),
    },
    {
        name: 'cache-protocol-data',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(5, 'minutes') : every(1, 'minutes'),
    },
    {
        name: 'sync-latest-snapshots-for-all-pools',
        interval: every(90, 'minutes'),
    },
    {
        name: 'update-lifetime-values-for-all-pools',
        interval: every(50, 'minutes'),
    },
    {
        name: 'sync-changed-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(2, 'minutes') : every(30, 'seconds'),
        alarmEvaluationPeriod: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? 3 : 1,
        alarmDatapointsToAlarm: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? 3 : 1,
    },
    {
        name: 'user-sync-wallet-balances-for-all-pools',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(5, 'minutes') : every(20, 'seconds'),
        alarmEvaluationPeriod: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? 3 : 1,
        alarmDatapointsToAlarm: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? 3 : 1,
    },
    {
        name: 'user-sync-staked-balances',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(5, 'minutes') : every(20, 'seconds'),
        alarmEvaluationPeriod: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? 3 : 1,
        alarmDatapointsToAlarm: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? 3 : 1,
    },
    {
        name: 'sync-latest-reliquary-snapshots',
        interval: every(1, 'hours'),
    },
    {
        name: 'sync-latest-relic-snapshots',
        interval: every(1, 'hours'),
    },
    {
        name: 'purge-old-tokenprices',
        interval: every(1, 'days'),
        alarmEvaluationPeriod: 1,
        alarmDatapointsToAlarm: 1,
    },
    {
        name: 'sync-coingecko-coinids',
        interval: every(2, 'hours'),
    },
    {
        name: 'update-fee-volume-yield-all-pools',
        interval: every(1, 'hours'),
    },
    {
        name: 'feed-data-to-datastudio',
        interval: (env.DEPLOYMENT_ENV as DeploymentEnv) === 'canary' ? every(5, 'minutes') : every(1, 'minutes'),
    },
];