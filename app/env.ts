import { EnvType, load } from 'ts-dotenv';
import { resolve } from 'path';

type Env = EnvType<typeof schema>;

export const schema = {
    PORT: Number,
    NODE_ENV: String,
    DEFAULT_CHAIN_ID: String,
    DEPLOYMENT_ENV: String,
    ADMIN_API_KEY: String,
    SANITY_API_TOKEN: {
        type: String,
        optional: true
    },
    SENTRY_DSN: {
        type: String,
        optional: true,
    },
    WORKER_QUEUE_URL: String,
    AWS_REGION: String,
    PROTOCOL: String,
};

export const env: Env = load(schema, {
    path: resolve(__dirname, '../.env'),
    overrideProcessEnv: process.env.NODE_ENV !== 'production',
});
