import * as Sentry from '@sentry/node';
import { Express, NextFunction } from 'express';
import { tokenService } from '../modules/token/token.service';
import { poolService } from '../modules/pool/pool.service';
import { beetsService } from '../modules/beets/beets.service';
import { blocksSubgraphService } from '../modules/subgraphs/blocks-subgraph/blocks-subgraph.service';
import { userService } from '../modules/user/user.service';
import { WorkerJob } from './manual-jobs';
import { protocolService } from '../modules/protocol/protocol.service';

const runningJobs: Set<string> = new Set();

const defaultSamplingRate = 0.01;

async function runIfNotAlreadyRunning(
    id: string,
    fn: () => any,
    samplingRate: number,
    res: any,
    next: NextFunction,
): Promise<void> {
    try {
        Sentry.configureScope((scope) => {
            scope.setTag('samplingRate', samplingRate);
        });
        if (runningJobs.has(id)) {
            console.log('Skipping job', id);
            Sentry.configureScope((scope) => {
                scope.setTag('samplingRate', 0);
            });
            return;
        }
        runningJobs.add(id);
        try {
            console.time(id);
            console.log(`Start job ${id}`);
            await fn();
        } finally {
            runningJobs.delete(id);
            console.timeEnd(id);
            console.log(`Finished job ${id}`);
            res.sendStatus(200);
        }
    } catch (error) {
        Sentry.configureScope((scope) => {
            scope.setTag('error', 'load-token-prices');
            scope.setTag('samplingRate', 1);
        });
        next(error);
    }
}

export function configureWorkerRoutes(app: Express) {
    // all manual triggered (e.g. fast running) jobs will be handled here
    app.post('/', async (req, res, next) => {
        const job = req.body as WorkerJob;
        Sentry.configureScope((scope) => scope.setTransactionName(`POST /${job.type} - manual`));
        switch (job.type) {
            case 'sync-pools':
                await runIfNotAlreadyRunning(job.type, poolService.syncChangedPools, defaultSamplingRate, res, next);
                break;
            case 'user-sync-wallet-balances-for-all-pools':
                await runIfNotAlreadyRunning(
                    job.type,
                    userService.syncWalletBalancesForAllPools,
                    defaultSamplingRate,
                    res,
                    next,
                );
                break;
            case 'user-sync-staked-balances':
                await runIfNotAlreadyRunning(job.type, userService.syncStakedBalances, defaultSamplingRate, res, next);
                break;
            default:
                throw new Error(`Unhandled job type ${job.type}`);
        }
    });

    app.post('/load-token-prices', async (req, res, next) => {
        await runIfNotAlreadyRunning('load-token-prices', tokenService.loadTokenPrices, defaultSamplingRate, res, next);
    });

    app.post('/update-liquidity-for-all-pools', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'update-liquidity-for-all-pools',
            poolService.updateLiquidityValuesForAllPools,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/update-pool-apr', async (req, res, next) => {
        await runIfNotAlreadyRunning('update-pool-apr', () => poolService.updatePoolAprs(), 0.01, res, next);
    });
    app.post('/load-on-chain-data-for-pools-with-active-updates', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'load-on-chain-data-for-pools-with-active-updates',
            poolService.loadOnChainDataForPoolsWithActiveUpdates,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/sync-new-pools-from-subgraph', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'sync-new-pools-from-subgraph',
            poolService.syncNewPoolsFromSubgraph,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/sync-sanity-pool-data', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'sync-sanity-pool-data',
            poolService.syncSanityPoolData,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/sync-tokens-from-pool-tokens', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'sync-tokens-from-pool-tokens',
            tokenService.syncSanityData,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/update-liquidity-24h-ago-for-all-pools', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'update-liquidity-24h-ago-for-all-pools',
            poolService.updateLiquidity24hAgoForAllPools,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/sync-fbeets-ratio', async (req, res, next) => {
        await runIfNotAlreadyRunning('sync-fbeets-ratio', beetsService.syncFbeetsRatio, defaultSamplingRate, res, next);
    });
    app.post('/cache-average-block-time', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'cache-average-block-time',
            blocksSubgraphService.cacheAverageBlockTime,
            defaultSamplingRate,
            res,
            next,
        );
    });

    app.post('/sync-token-dynamic-data', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'sync-token-dynamic-data',
            tokenService.syncTokenDynamicData,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/sync-staking-for-pools', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'sync-staking-for-pools',
            poolService.syncStakingForPools,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/cache-protocol-data', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'cache-protocol-data',
            protocolService.cacheProtocolMetrics,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/sync-latest-snapshots-for-all-pools', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'sync-latest-snapshots-for-all-pools',
            poolService.syncLatestSnapshotsForAllPools,
            defaultSamplingRate,
            res,
            next,
        );
    });
    app.post('/update-lifetime-values-for-all-pools', async (req, res, next) => {
        await runIfNotAlreadyRunning(
            'update-lifetime-values-for-all-pools',
            poolService.updateLifetimeValuesForAllPools,
            defaultSamplingRate,
            res,
            next,
        );
    });
}
