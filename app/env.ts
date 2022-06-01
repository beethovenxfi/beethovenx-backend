import { EnvType, load } from 'ts-dotenv';
import { resolve } from 'path';

type Env = EnvType<typeof schema>;

export const schema = {
    REDIS_URL: String,
    REDIS_PORT: Number,
    PORT: Number,
    NODE_ENV: String,
    BALANCER_SUBGRAPH: String,
    MASTERCHEF_SUBGRAPH: String,
    BLOCKS_SUBGRAPH: String,
    CHAIN_ID: String,
    CHAIN_SLUG: String,
    NATIVE_ASSET_ADDRESS: String,
    WRAPPED_NATIVE_ASSET_ADDRESS: String,
    COINGECKO_NATIVE_ASSET_ID: String,
    COINGECKO_PLATFORM_ID: String,
    BEETS_ADDRESS: String,
    SUBGRAPH_START_DATE: String,
    BEETS_BAR_SUBGRAPH: String,
    CHANGELOG_SUBGRAPH: String,
    GAUGE_SUBGRAPH: String,
    FBEETS_ADDRESS: String,
    FBEETS_POOL_ID: String,
    FBEETS_FARM_ID: String,
    ADMIN_API_KEY: String,
    SANITY_PROJECT_ID: String,
    SANITY_DATASET: String,
    SANITY_API_TOKEN: String,
    COPPER_PROXY_ADDRESS: String,
    RPC_URL: String,
    YEARN_VAULTS_ENDPOINT: String,
    MASTERCHEF_ADDRESS: String,
    POOL_SYNC_INTERVAL_MS: String,
};

export const env: Env = load(schema, {
    path: resolve(__dirname, '../.env'),
    overrideProcessEnv: process.env.NODE_ENV !== 'production',
});
