import express from 'express';
import * as Sentry from '@sentry/node';
import { env } from '../app/env';
import * as Tracing from '@sentry/tracing';
import { prisma } from '../prisma/prisma-client';
import { configureWorkerRoutes } from './job-handlers';
import { scheduleManualJobs } from './manual-jobs';

export function startWorker() {
    const app = express();

    Sentry.init({
        dsn: env.SENTRY_DSN,
        environment: env.NODE_ENV,
        enabled: env.NODE_ENV === 'production',
        integrations: [
            new Tracing.Integrations.Prisma({ client: prisma }),
            new Tracing.Integrations.Express({ app }),
            new Sentry.Integrations.Http({ tracing: true }),
        ],
        tracesSampler: (samplingContext) => {
            const defaultSamplingRate = 0.01;
            const tags = samplingContext.transactionContext.tags;

            if (tags && tags['samplingRate']) {
                return parseFloat(tags['samplingRate'].toString());
            } else {
                return defaultSamplingRate;
            }
        },
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
    app.use(express.json());

    configureWorkerRoutes(app);
    app.use(
        Sentry.Handlers.errorHandler({
            shouldHandleError(): boolean {
                return true;
            },
        }),
    );

    scheduleManualJobs();

    app.listen(env.PORT, () => {
        console.log(`Worker listening on port ${env.PORT}`);
    });
}
