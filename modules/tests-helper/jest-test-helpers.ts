import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Prisma, PrismaClient, PrismaPool, PrismaPoolType } from '@prisma/client';
import { commandSync } from 'execa';
import { prisma, setPrisma } from '../../prisma/prisma-client';
import _ from 'lodash';
import moment from 'moment';

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type TestDatabaseContainer = {
    postgres: StartedTestContainer;
    stop: () => Promise<void>;
};

const defaultPoolTokens: Prisma.PrismaTokenCreateInput[] = [
    {
        address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
    },
    {
        address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        symbol: 'wFTM',
        name: 'Wrapped Fantom',
        decimals: 18,
    },
    {
        address: '0x321162cd933e2be498cd2267a90534a804051b11',
        symbol: 'wBTC',
        name: 'Wrapped Bitcoin',
        decimals: 8,
    },
    {
        address: '0x74b23882a30290451a17c44f4f05243b6b58c76d',
        symbol: 'wETH',
        name: 'Wrapped Ethereum',
        decimals: 18,
    },
];

export async function createDefaultTokens(tokens: DeepPartial<Prisma.PrismaTokenCreateInput>[]) {
    await prisma.prismaToken.createMany({
        data: _.merge(defaultPoolTokens, tokens),
    });
}

const defaultWeightedPool: Prisma.PrismaPoolCreateInput = {
    id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f',
    createTime: moment().subtract(10, 'days').unix(),
    address: '0xf3a602d30dcb723a74a0198313a7551feaca7dac',
    symbol: 'BPT-QUARTET',
    name: 'A Late Quartet',
    decimals: 18,
    type: PrismaPoolType.WEIGHTED,
    owner: '0x0000000000000000000000000000000000000000',
    factory: '0x92b377187bccc6556fced2f1e6dad65850c20630',
    tokens: {
        createMany: {
            data: [
                {
                    id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-0x04068da6c83afcfa0e13ba15a6696662335d5b75',
                    address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
                    index: 0,
                },
                {
                    id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
                    address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
                    index: 1,
                },
                {
                    id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-0x321162cd933e2be498cd2267a90534a804051b11',
                    address: '0x321162cd933e2be498cd2267a90534a804051b11',
                    index: 2,
                },
                {
                    id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-0x74b23882a30290451a17c44f4f05243b6b58c76d',
                    address: '0x74b23882a30290451a17c44f4f05243b6b58c76d',
                    index: 3,
                },
            ],
        },
    },
    dynamicData: {
        create: {
            id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f',
            blockNumber: 45000000,
            swapFee: '0.0025',
            swapEnabled: true,
            totalShares: '98618',
            totalSharesNum: 98618,
            totalLiquidity: 6128429,
            volume24h: 650860,
            fees24h: 1626,
            volume48h: 1082006,
            fees48h: 2705,
        },
    },
};

export async function createWeightedPoolFromDefault(
    pool: DeepPartial<Prisma.PrismaPoolCreateInput>,
    tokens: DeepPartial<Prisma.PrismaTokenCreateInput>[],
) {
    createDefaultTokens(tokens);

    _.merge(defaultWeightedPool, pool);

    await prisma.prismaPool.create({
        data: _.merge(defaultWeightedPool, pool),
    });
}

const defaultWeightedPoolSnapshot: Prisma.PrismaPoolSnapshotCreateInput = {
    id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-1660089600',
    pool: {
        connect: { id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f' },
    },
    timestamp: 1660089600,
    fees24h: 2515,
    volume24h: 1006335,
    swapsCount: 760976,
    holdersCount: 100,
    sharePrice: 74.3,
    totalLiquidity: 7824300.8,
    totalShares: '105175.6',
    totalSharesNum: 105175.6,
    totalSwapFee: 1698548.418925,
    totalSwapVolume: 1066689432.036545,
    amounts: ['2168756.502379', '4663180.282740217636656087', '79.26189779', '1022.899752557829627982'],
};

export async function createWeightedPoolSnapshotFromDefault(
    snapshot: DeepPartial<Prisma.PrismaPoolSnapshotCreateInput>,
) {
    await prisma.prismaPoolSnapshot.create({
        data: _.merge(defaultWeightedPoolSnapshot, snapshot),
    });
}

export type TestDatabasePrismaConfig = {
    generateClient: boolean;
    schemaFile: string;
};

export type TestDatabaseConfig = {
    user: string;
    password: string;
    dbName: string;
};

const defaultTestDatabaseConfig: TestDatabaseConfig = {
    user: 'beetx',
    password: 'let-me-in',
    dbName: 'beetx',
};

const defaultTestDatabasePrismaConfig: TestDatabasePrismaConfig = {
    generateClient: true,
    schemaFile: path.join(__dirname, '../../prisma/schema.prisma'),
};

// module.exports = async function globalCreateTestDb() {
//     createTestDb();
// };

let postgres: StartedTestContainer;

export async function startTestDb(
    dbConfig: TestDatabaseConfig = defaultTestDatabaseConfig,
): Promise<TestDatabaseContainer> {
    try {
        postgres = await new GenericContainer('postgres')
            .withEnv('POSTGRES_USER', dbConfig.user)
            .withEnv('POSTGRES_PASSWORD', dbConfig.password)
            .withEnv('POSTGRES_DB', dbConfig.dbName)
            .withExposedPorts(5432)
            .start();

        return {
            postgres,
            stop: async () => {
                await postgres.stop();
            },
        };
    } catch (error) {
        console.error('Error spinning up test database', error);
        throw error;
    }
}

export async function createSchemaForTest(
    prismaConfig: TestDatabasePrismaConfig = defaultTestDatabasePrismaConfig,
    dbConfig: TestDatabaseConfig = defaultTestDatabaseConfig,
) {
    const schema = `test_${uuidv4()}`;
    const connectionString = `postgresql://${dbConfig.user}:${
        dbConfig.password
    }@${postgres.getHost()}:${postgres.getMappedPort(5432)}/${dbConfig.dbName}?schema=${schema}`;

    commandSync(`yarn prisma db push --schema ${prismaConfig.schemaFile} --skip-generate`, {
        env: {
            DATABASE_URL: connectionString,
        },
    });
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: connectionString,
            },
        },
    });

    setPrisma(prisma);
}
