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
} from '../tests-helper/jest-test-helpers';
import { server } from '../tests-helper/mocks/server';
import { userService } from './user.service';

// need to intercept graphql requests to user-bpt-subgraph
// need to prepare DB (pool(s), snapshots)

/*
TEST SETUP:
- Two different weighted pools, both with random snapshots (complete, one spanshot per day)
- pool1 has also a farm
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

    // create 30 snapshotsfor pool 0x001a
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

    // add some snapshots for pool to db -> also pricing
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

    const snapshots = await userService.getUserBalanceSnapshotsForPool(userAddress, poolId1, 'THIRTY_DAYS');
    //check if 4th snapshot has been inferred from three present ones
    expect(snapshots.length).toBe(4);
    const snapshotsInDb = await prisma.prismaUserBalanceSnapshot.findMany({
        where: {
            userAddress: userAddress,
        },
        include: { userPoolBalanceSnapshots: true },
    });

    // check if snapshots have been persisted
    expect(snapshotsInDb.length).toBe(4);
    // make sure only for one pool is persisted
    expect(snapshotsInDb[0].userPoolBalanceSnapshots.length).toBe(1);
    expect(snapshotsInDb[1].userPoolBalanceSnapshots.length).toBe(1);
    expect(snapshotsInDb[2].userPoolBalanceSnapshots.length).toBe(1);
    expect(snapshotsInDb[3].userPoolBalanceSnapshots.length).toBe(1);

    // check if balances are calculated correctly
    expect(snapshots[0].walletBalance).toBe('1');
    expect(snapshots[0].timestamp).toBe(thisMorning - 3 * oneDayInSeconds);
    expect(snapshots[1].walletBalance).toBe('1');
    expect(snapshots[1].timestamp).toBe(thisMorning - 2 * oneDayInSeconds);

    expect(snapshots[2].walletBalance).toBe('0.5');
    expect(snapshots[2].farmBalance).toBe('1.0');
    expect(snapshots[2].totalBalance).toBe('1.5');
    expect(snapshots[2].timestamp).toBe(thisMorning - 1 * oneDayInSeconds);

    expect(snapshots[3].walletBalance).toBe('0');
    expect(snapshots[3].timestamp).toBe(thisMorning - 0 * oneDayInSeconds);

    const poolSnapshots = await prisma.prismaPoolSnapshot.findMany({
        where: { poolId: poolId1 },
    });

    // check if usd value, percent share of the pool and fees are correctly calculated based on poolsnapshots
    for (const userBalanceSnapshot of snapshots) {
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

test('user requests more snapshots than present', async () => {});

test('user requests snapshots for 2nd time', async () => {});

// Clean up after the tests are finished.
afterAll(async () => {
    await prisma.$disconnect();
});
