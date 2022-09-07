import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Prisma, PrismaClient, PrismaPool, PrismaPoolType } from '@prisma/client';
import { commandSync } from 'execa';
import { prisma, setPrisma } from '../../prisma/prisma-client';
import _ from 'lodash';

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type TestDatabase = {
    postgres: StartedTestContainer;
    prisma: PrismaClient;
    stop: () => Promise<void>;
};

// const defaultWeightedPool: Prisma.PrismaPoolCreateInput = {
//     id: '0xcde5a11a4acb4ee4c805352cec57e236bdbc3837000200000000000000000019',
//     createTime: 1633797478,
//     address: '0xcde5a11a4acb4ee4c805352cec57e236bdbc3837',
//     symbol: 'BPT-BEETS-FTM',
//     name: 'The Fidelio Duetto',
//     owner: '0x0000000000000000000000000000000000000000',
//     type: PrismaPoolType.WEIGHTED,
//     factory: '0x92b377187bccc6556fced2f1e6dad65850c20630',
//     decimals: 18,

//     linearDynamicData: {
//         create: {
//             blockNumber: 1,
//         },
//     },
// };

// createPool({
//     linearDynamicData: {
//         create: {
//             blockNumber: 123,
//         },
//     },
// });

// export async function createPool(pool: DeepPartial<Prisma.PrismaPoolCreateInput>) {
//     _.merge(defaultWeightedPool, pool);

//     prisma.prismaPool.create({
//         data: _.merge(defaultWeightedPool, pool),
//     });
// }

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

export async function createTestDb(
    prismaConfig: TestDatabasePrismaConfig = defaultTestDatabasePrismaConfig,
    dbConfig: TestDatabaseConfig = defaultTestDatabaseConfig,
): Promise<TestDatabase> {
    try {
        const postgres = await new GenericContainer('postgres')
            .withEnv('POSTGRES_USER', dbConfig.user)
            .withEnv('POSTGRES_PASSWORD', dbConfig.password)
            .withEnv('POSTGRES_DB', dbConfig.dbName)
            .withExposedPorts(5432)
            .start();

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

        return {
            postgres,
            prisma,
            stop: async () => {
                await prisma.$disconnect();
                await postgres.stop();
            },
        };
    } catch (error) {
        console.error('Error spinning up test database', error);
        throw error;
    }
}
