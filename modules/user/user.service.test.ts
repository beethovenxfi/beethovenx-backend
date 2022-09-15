import moment from 'moment';
import { graphql } from 'msw';
import { prisma } from '../../prisma/prisma-client';
import { networkConfig } from '../config/network-config';
import { PoolSnapshotService } from '../pool/lib/pool-snapshot.service';
import {
    createSchemaForTest as createDedicatedSchemaForTest,
    createWeightedPoolFromDefault,
    defaultTokens,
    createRandomSnapshotsForPool,
    createUserPoolBalanceSnapshot,
} from '../tests-helper/jest-test-helpers';
import { server } from '../tests-helper/mocks/server';
import { userService } from './user.service';

/*
TEST SETUP:
- Two different weighted pools, both with random snapshots (complete, one spanshot per day)
- pool1 has also a farm specified
- One user 

*/
const poolId1 = '0x001a';
const poolName1 = 'Test pool 1';
const poolAddress1 = '0x001';
const farmId1 = '0x001a-stake';

const poolId2 = '0x002a';
const poolName2 = 'Test pool 2';
const poolAddress2 = '0x002';

const userAddress = '0x0000000000000000000000000000000000000001';

beforeAll(async () => {
    await createDedicatedSchemaForTest();
    // add pool(s) to DB -> including pricing
    // await createDefaultTokens([]);
    const pool1 = await createWeightedPoolFromDefault(
        {
            id: poolId1,
            name: poolName1,
            address: poolAddress1,
            staking: {
                create: {
                    id: farmId1,
                },
            },
        },
        [defaultTokens.usdc, defaultTokens.wftm, defaultTokens.wbtc, defaultTokens.beets],
    );

    // create 30 snapshotsfor pool1
    await createRandomSnapshotsForPool(pool1.id, pool1.tokens.length, 30);

    const pool2 = await createWeightedPoolFromDefault(
        {
            id: poolId2,
            name: poolName2,
            address: poolAddress2,
        },
        [defaultTokens.usdc, defaultTokens.beets],
    );

    // create 30 snapshots for pool2
    await createRandomSnapshotsForPool(pool2.id, pool2.tokens.length, 30);

    // create user
    await prisma.prismaUser.create({
        data: {
            address: userAddress,
        },
    });
}, 60000);

afterEach(async () => {
    server.resetHandlers();
});

beforeEach(async () => {});

test('The user requests the user stats for the first time, requesting from snapshot, persiting to db.', async () => {
    /*
    Scenario: 
    - The user requests the user stats for the first time
    - The user joined pool1 three days ago, joined again one day ago, added some to farm and joined another pool one day ago

    Mock data for user-balance-subgraph (important that timestamps are ASC, as this is requested like this form the function under test):
    - Create three snapshots for user
    - First snapshot from three days ago, where he only has 1 bpts from pool1 in his wallet
    - Seconds snapshot from one day ago, where he has 0.5 bpt from pool1 and 1 bpt from pool2 in his wallet and 1 bpt from pool1 in the farm
    - Third snapshot from today, where he has only 1 bpt from pool2 in his wallet 

    Behaviour under test:
    - Snapshot inference that a fourth snapshot is created for missing day two days ago
    - Snapshots are retrieved from subgraph and persisted in DB
    - Only snapshots for requested pool are persisted in DB
    - Balances are correctly returned and summarized (farmbalance + walletbalance = totalbalance)
    - USD values are correctly calculated based on pool snapshot values
    */
    const thisMorning = moment().startOf('day').unix();
    const oneDayInSeconds = 86400;
    const newestSnapshotTimestamp = thisMorning;

    server.use(
        ...[
            graphql.query('UserBalanceSnapshots', async (req, res, ctx) => {
                const requestJson = await req.json();
                if (requestJson.variables.where.timestamp_gte > newestSnapshotTimestamp) {
                    return res(
                        ctx.data({
                            snapshots: [],
                        }),
                    );
                }
                // important, sort snapshots ASC
                return res(
                    ctx.data({
                        snapshots: [
                            {
                                id: `${userAddress}-${thisMorning - 3 * oneDayInSeconds}`,
                                user: {
                                    id: userAddress,
                                },
                                timestamp: thisMorning - 3 * oneDayInSeconds,
                                walletTokens: [poolAddress1],
                                walletBalances: ['1'],
                                gauges: [],
                                gaugeBalances: [],
                                farms: [],
                                farmBalances: [],
                            },
                            {
                                id: `${userAddress}-${thisMorning - oneDayInSeconds}`,
                                user: {
                                    id: userAddress,
                                },
                                timestamp: thisMorning - oneDayInSeconds,
                                walletTokens: [poolAddress1, poolAddress2],
                                walletBalances: ['0.5', '1'],
                                gauges: [],
                                gaugeBalances: [],
                                farms: [farmId1],
                                farmBalances: ['1.0'],
                            },
                            {
                                id: `${userAddress}-${newestSnapshotTimestamp}`,
                                user: {
                                    id: userAddress,
                                },
                                timestamp: newestSnapshotTimestamp,
                                walletTokens: [poolAddress1, poolAddress2],
                                walletBalances: ['0', '1'],
                                gauges: [],
                                gaugeBalances: [],
                                farms: [],
                                farmBalances: [],
                            },
                        ],
                    }),
                );
            }),
        ],
    );

    const snapshotsFromService = await userService.getUserBalanceSnapshotsForPool(userAddress, poolId1, 'THIRTY_DAYS');
    //check if 4th snapshot has been inferred from three present ones
    expect(snapshotsFromService.length).toBe(4);
    const snapshotsFromDb = await prisma.prismaUserPoolBalanceSnapshot.findMany({
        where: {
            userAddress: userAddress,
        },
        include: { pool: true },
    });

    // check if the 4 snapshots have been persisted
    expect(snapshotsFromDb.length).toBe(4);

    // check if balances are calculated correctly
    expect(snapshotsFromService[0].walletBalance).toBe('1');
    expect(snapshotsFromService[0].timestamp).toBe(thisMorning - 3 * oneDayInSeconds);
    expect(snapshotsFromService[1].walletBalance).toBe('1');
    expect(snapshotsFromService[1].timestamp).toBe(thisMorning - 2 * oneDayInSeconds);

    expect(snapshotsFromService[2].walletBalance).toBe('0.5');
    expect(snapshotsFromService[2].farmBalance).toBe('1.0');
    expect(snapshotsFromService[2].totalBalance).toBe('1.5');
    expect(snapshotsFromService[2].timestamp).toBe(thisMorning - 1 * oneDayInSeconds);

    expect(snapshotsFromService[3].walletBalance).toBe('0');
    expect(snapshotsFromService[3].timestamp).toBe(thisMorning - 0 * oneDayInSeconds);

    const poolSnapshots = await prisma.prismaPoolSnapshot.findMany({
        where: { poolId: poolId1 },
    });

    // check if usd value, percent share of the pool and fees are correctly calculated based on poolsnapshots
    for (const userBalanceSnapshot of snapshotsFromService) {
        let foundPoolSnapshot = false;
        for (const poolSnapshot of poolSnapshots) {
            if (poolSnapshot.timestamp === userBalanceSnapshot.timestamp) {
                expect(userBalanceSnapshot.totalValueUSD).toBe(
                    `${poolSnapshot.sharePrice * parseFloat(userBalanceSnapshot.totalBalance)}`,
                );
                expect(userBalanceSnapshot.percentShare).toBe(
                    parseFloat(userBalanceSnapshot.totalBalance) / poolSnapshot.totalSharesNum,
                );
                expect(userBalanceSnapshot.fees24h).toBe(
                    `${
                        userBalanceSnapshot.percentShare *
                        poolSnapshot.fees24h *
                        (1 - networkConfig.balancer.protocolFeePercent)
                    }`,
                );
                foundPoolSnapshot = true;
            }
        }
        //make sure we have a pool snapshot for each user snapshot
        expect(foundPoolSnapshot).toBe(true);
    }
});

test('Persisted user snapshots are synced', async () => {
    /*
    Scenario: 
    - The user has once requested the user stats for pool1
    - Since one user snapshot is in the database, the userBalanceSync should query the subgraph and sync all missing snapshots until now 

    Mock data for user-balance-subgraph (important that timestamps are ASC, as this is requested like this form the function under test):
    - Create three snapshots for user
    - First snapshot from three days ago, where he only has 1 bpts from pool1 in his wallet
    - Seconds snapshot from one day ago, where he has 0.5 bpt from pool1 and 1 bpt from pool2 in his wallet and 1 bpt from pool1 in the farm
    - Third snapshot from today, where he has only 1 bpt from pool2 in his wallet 

    Mock data in data base:
    - Create one userbalance snapshot for three days ago for the user and pool1

    Behaviour under test:
    - Sync takes finds the last synced snapshot and sync all missing ones until today
    - Usually should only be one, since it is assumed that the job is run more than once a day (probably hourly)
    - Nevertheless, testing is done to sync more than one day to address any job failures
    */

    const thisMorning = moment().startOf('day').unix();
    const oneDayInSeconds = 86400;
    const newestSnapshotTimestamp = thisMorning;

    await createUserPoolBalanceSnapshot({
        id: `${poolId1}-${userAddress}-${thisMorning - 3 * oneDayInSeconds}`,
        timestamp: thisMorning - 3 * oneDayInSeconds,
        user: { connect: { address: userAddress } },
        pool: {
            connect: {
                id: poolId1,
            },
        },
        poolToken: poolAddress1,
        walletBalance: '1',
        farmBalance: '0',
        gaugeBalance: '0',
        totalBalance: '1',
    });

    server.use(
        ...[
            graphql.query('UserBalanceSnapshots', async (req, res, ctx) => {
                const requestJson = await req.json();
                if (requestJson.variables.where.timestamp_gte > newestSnapshotTimestamp) {
                    return res(
                        ctx.data({
                            snapshots: [],
                        }),
                    );
                }
                // important, sort snapshots ASC
                return res(
                    ctx.data({
                        snapshots: [
                            {
                                id: `${userAddress}-${thisMorning - 3 * oneDayInSeconds}`,
                                user: {
                                    id: userAddress,
                                },
                                timestamp: thisMorning - 3 * oneDayInSeconds,
                                walletTokens: [poolAddress1],
                                walletBalances: ['1'],
                                gauges: [],
                                gaugeBalances: [],
                                farms: [],
                                farmBalances: [],
                            },
                            {
                                id: `${userAddress}-${thisMorning - oneDayInSeconds}`,
                                user: {
                                    id: userAddress,
                                },
                                timestamp: thisMorning - oneDayInSeconds,
                                walletTokens: [poolAddress1, poolAddress2],
                                walletBalances: ['0.5', '1'],
                                gauges: [],
                                gaugeBalances: [],
                                farms: [farmId1],
                                farmBalances: ['1.0'],
                            },
                            {
                                id: `${userAddress}-${newestSnapshotTimestamp}`,
                                user: {
                                    id: userAddress,
                                },
                                timestamp: newestSnapshotTimestamp,
                                walletTokens: [poolAddress1, poolAddress2],
                                walletBalances: ['0', '1'],
                                gauges: [],
                                gaugeBalances: [],
                                farms: [],
                                farmBalances: [],
                            },
                        ],
                    }),
                );
            }),
        ],
    );

    // before the sync is called, this should only return one snapshot that was manually added to the DB in this test
    const snapshotsBeforeSync = await userService.getUserBalanceSnapshotsForPool(userAddress, poolId1, 'THIRTY_DAYS');
    expect(snapshotsBeforeSync.length).toBe(1);

    await userService.syncUserBalanceSnapshots();

    // after the sync, the all 4 snapshots should be present
    const snapshotsAfterSync = await userService.getUserBalanceSnapshotsForPool(userAddress, poolId1, 'THIRTY_DAYS');
    expect(snapshotsAfterSync.length).toBe(4);

    const snapshotsFromDb = await prisma.prismaUserPoolBalanceSnapshot.findMany({
        where: {
            userAddress: userAddress,
        },
    });

    // check if snapshots have been persisted
    expect(snapshotsFromDb.length).toBe(4);

    // check if balances are calculated correctly
    expect(snapshotsAfterSync[0].walletBalance).toBe('1');
    expect(snapshotsAfterSync[0].timestamp).toBe(thisMorning - 3 * oneDayInSeconds);
    expect(snapshotsAfterSync[1].walletBalance).toBe('1');
    expect(snapshotsAfterSync[1].timestamp).toBe(thisMorning - 2 * oneDayInSeconds);

    expect(snapshotsAfterSync[2].walletBalance).toBe('0.5');
    expect(snapshotsAfterSync[2].farmBalance).toBe('1.0');
    expect(snapshotsAfterSync[2].totalBalance).toBe('1.5');
    expect(snapshotsAfterSync[2].timestamp).toBe(thisMorning - 1 * oneDayInSeconds);

    expect(snapshotsAfterSync[3].walletBalance).toBe('0');
    expect(snapshotsAfterSync[3].timestamp).toBe(thisMorning - 0 * oneDayInSeconds);

    const poolSnapshots = await prisma.prismaPoolSnapshot.findMany({
        where: { poolId: poolId1 },
    });

    // check if usd value, percent share of the pool and fees are correctly calculated based on poolsnapshots
    for (const userBalanceSnapshot of snapshotsAfterSync) {
        let foundPoolSnapshot = false;
        for (const poolSnapshot of poolSnapshots) {
            if (poolSnapshot.timestamp === userBalanceSnapshot.timestamp) {
                expect(userBalanceSnapshot.totalValueUSD).toBe(
                    `${poolSnapshot.sharePrice * parseFloat(userBalanceSnapshot.totalBalance)}`,
                );
                expect(userBalanceSnapshot.percentShare).toBe(
                    parseFloat(userBalanceSnapshot.totalBalance) / poolSnapshot.totalSharesNum,
                );
                expect(userBalanceSnapshot.fees24h).toBe(
                    `${
                        userBalanceSnapshot.percentShare *
                        poolSnapshot.fees24h *
                        (1 - networkConfig.balancer.protocolFeePercent)
                    }`,
                );
                foundPoolSnapshot = true;
            }
        }
        //make sure we have a pool snapshot for each user snapshot
        expect(foundPoolSnapshot).toBe(true);
    }
});

test('user requests snapshots for 2nd time', async () => {});

// Clean up after the tests are finished.
afterAll(async () => {
    await prisma.$disconnect();
});
