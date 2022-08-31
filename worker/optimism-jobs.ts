import { every, Duration } from './intervals';

export const optimismJobs = [
    {
        name: 'load-token-prices',
        interval: every(1, Duration.Minutes),
    },
    {
        name: 'update-liquidity-for-inactive-pools',
        interval: every(1, Duration.Days),
    },
    {
        name: 'update-liquidity-for-active-pools',
        interval: every(1, Duration.Minutes),
    },
    {
        name: 'update-pool-apr',
        interval: every(1, Duration.Minutes),
    },
    {
        name: 'load-on-chain-data-for-pools-with-active-updates',
        interval: every(1, Duration.Minutes),
    },
    {
        name: 'sync-new-pools-from-subgraph',
        interval: every(1, Duration.Minutes),
    },
    {
        name: 'sync-sanity-pool-data',
        interval: every(3, Duration.Minutes),
    },
    {
        name: 'sync-tokens-from-pool-tokens',
        interval: every(5, Duration.Minutes),
    },
    {
        name: 'update-liquidity-24h-ago-for-all-pools',
        interval: every(5, Duration.Minutes),
    },
    {
        name: 'cache-average-block-time',
        interval: every(30, Duration.Minutes),
    },
    {
        name: 'sync-token-dynamic-data',
        interval: every(1, Duration.Minutes),
    },
    {
        name: 'sync-staking-for-pools',
        interval: every(5, Duration.Minutes),
    },
    {
        name: 'sync-latest-snapshots-for-all-pools',
        interval: every(1, Duration.Hours),
    },
    {
        name: 'update-lifetime-values-for-all-pools',
        interval: every(20, Duration.Minutes),
    },
    {
        name: 'sync-changed-pools',
        interval: every(15, Duration.Seconds),
    },
    {
        name: 'user-sync-wallet-balances-for-all-pools',
        interval: every(10, Duration.Seconds),
    },
    {
        name: 'user-sync-staked-balances',
        interval: every(10, Duration.Seconds),
    },
];
