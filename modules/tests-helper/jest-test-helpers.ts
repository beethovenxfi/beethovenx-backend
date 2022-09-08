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

export type TestDatabase = {
    postgres: StartedTestContainer;
    // prisma: PrismaClient;
    stop: () => Promise<void>;
};

/*
                id: pool.id,
                createTime: pool.createTime,
                address: pool.address,
                symbol: pool.symbol || '',
                name: pool.name || '',
                decimals: 18,
                type: poolType,
                owner: pool.owner || ZERO_ADDRESS,
                factory: pool.factory,
                tokens: {
                    createMany: {
                        data: poolTokens.map((token, index) => {
                            const nestedPool = allPools.find((nestedPool) => {
                                const poolType = this.mapSubgraphPoolTypeToPoolType(nestedPool.poolType || '');

                                return (
                                    nestedPool.address === token.address &&
                                    (poolType === 'LINEAR' || poolType === 'PHANTOM_STABLE')
                                );
                            });

                            return {
                                id: token.id,
                                address: token.address,
                                nestedPoolId: nestedPool?.id,
                                index,
                            };
                        }),
                    },
                },
                linearData:
                    poolType === 'LINEAR'
                        ? {
                              create: {
                                  id: pool.id,
                                  mainIndex: pool.mainIndex || 0,
                                  wrappedIndex: pool.wrappedIndex || 0,
                              },
                          }
                        : undefined,
                linearDynamicData:
                    poolType === 'LINEAR'
                        ? {
                              create: {
                                  id: pool.id,
                                  upperTarget: pool.upperTarget || '',
                                  lowerTarget: pool.lowerTarget || '',
                                  blockNumber,
                              },
                          }
                        : undefined,
                elementData:
                    poolType === 'ELEMENT'
                        ? {
                              create: {
                                  id: pool.id,
                                  unitSeconds: pool.unitSeconds || '',
                                  principalToken: pool.principalToken || '',
                                  baseToken: pool.baseToken || '',
                              },
                          }
                        : undefined,
                stableDynamicData:
                    poolType === 'STABLE' || poolType === 'PHANTOM_STABLE' || poolType === 'META_STABLE'
                        ? {
                              create: {
                                  id: pool.id,
                                  amp: pool.amp || '',
                                  blockNumber,
                              },
                          }
                        : undefined,
                dynamicData: {
                    create: {
                        id: pool.id,
                        blockNumber,
                        swapFee: pool.swapFee,
                        swapEnabled: pool.swapEnabled,
                        totalShares: pool.totalShares,
                        totalSharesNum: parseFloat(pool.totalShares),
                        totalLiquidity: Math.max(parseFloat(pool.totalLiquidity), 0),
                        volume24h: 0,
                        fees24h: 0,
                        volume48h: 0,
                        fees48h: 0,
                    },
                },*/

// const defaultWeightedPool: Prisma.PrismaPoolCreateInput = {
//     id: '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f',
//     createTime: moment().subtract(10, 'days').unix(),
//     address: '0xf3a602d30dcb723a74a0198313a7551feaca7dac',
//     symbol: 'BPT-QUARTET',
//     name: 'A Late Quartet',
//     decimals: 18,
//     type: PrismaPoolType.WEIGHTED,
//     owner: '0x0000000000000000000000000000000000000000',
//     factory: '0x92b377187bccc6556fced2f1e6dad65850c20630',
//     tokens: {
//         createMany: {
//             data: [{
//                 id: "0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-0x04068da6c83afcfa0e13ba15a6696662335d5b75",
//                 address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
//                 index: 0,
//             },
//             {
//                 id: "0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
//                 address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
//                 index: 1,
//               },
//               {
//                 id: "0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-0x321162cd933e2be498cd2267a90534a804051b11",
//                 address: "0x321162cd933e2be498cd2267a90534a804051b11",
//                 index: 2,
//               },
//               {
//                 id: "0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f-0x74b23882a30290451a17c44f4f05243b6b58c76d",
//                 address: "0x74b23882a30290451a17c44f4f05243b6b58c76d",
//                 index: 3,
//               }]
//         }
//     }
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

let postgres: StartedTestContainer;

export async function startTestDb(dbConfig: TestDatabaseConfig = defaultTestDatabaseConfig): Promise<TestDatabase> {
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
