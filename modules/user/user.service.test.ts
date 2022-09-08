import { prisma } from '../../prisma/prisma-client';
import { isFantomNetwork } from '../config/network-config';
import { createSchemaForTest, startTestDb, TestDatabase } from '../tests-helper/jest-test-helpers';
import { server } from '../tests-helper/mocks/server';

// need to intercept graphql requests to user-bpt-subgraph
// need to prepare DB (pool(s), snapshots)

beforeAll(async () => {
    await createSchemaForTest();
    // add pool(s) to DB -> including pricing
    // add some snapshots for pool to db -> also pricing
}, 60000);

beforeEach(async () => {});

test('user request snapshots that are present', async () => {});

test('user requests more snapshots than present', async () => {});

test('user requests snapshots for 2nd time', async () => {});

// Clean up after the tests are finished.
afterAll(async () => {
    await prisma.$disconnect();
});
