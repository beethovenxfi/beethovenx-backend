import { prisma } from '../../prisma/prisma-client';
import {
    createDefaultTokens,
    createSchemaForTest,
    createWeightedPoolFromDefault,
    createWeightedPoolSnapshotFromDefault,
} from '../tests-helper/jest-test-helpers';
import { server } from '../tests-helper/mocks/server';
import { subgraphHandlers } from './mock-handlers/subgraph';
import { userService } from './user.service';

// need to intercept graphql requests to user-bpt-subgraph
// need to prepare DB (pool(s), snapshots)

beforeAll(async () => {
    await createSchemaForTest();
    // add pool(s) to DB -> including pricing
    // await createDefaultTokens([]);
    await createWeightedPoolFromDefault(
        {
            name: 'Test pool 1',
        },
        [],
    );

    await createWeightedPoolSnapshotFromDefault({});
    server.use(...subgraphHandlers);
    // add some snapshots for pool to db -> also pricing
}, 60000);

beforeEach(async () => {});

test('user request snapshots that are present', async () => {
    const pools = await prisma.prismaPool.findMany({});
    for (const pool of pools) {
        console.log(pool.name);
    }
    const poolSnapshots = await prisma.prismaPoolSnapshot.findMany({
        include: {
            pool: true,
        },
    });
    for (const snapshot of poolSnapshots) {
        console.log(snapshot.id);
        console.log(snapshot.pool.name);
    }
    const snapshots = await userService.getUserBalanceSnapshotsForPool(
        '0x0000000000000000000000000000000000000001',
        '0xf3a602d30dcb723a74a0198313a7551feaca7dac00010000000000000000005f',
        'THIRTY_DAYS',
    );
    expect(snapshots.length).toBeGreaterThan(0);
});

test('user requests more snapshots than present', async () => {});

test('user requests snapshots for 2nd time', async () => {});

// Clean up after the tests are finished.
afterAll(async () => {
    await prisma.$disconnect();
});
