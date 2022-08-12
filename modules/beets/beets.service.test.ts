import { assert } from 'console';
import exp from 'constants';
import { random } from 'lodash';
import { prisma } from '../../prisma/prisma-client';
import { isFantomNetwork } from '../config/network-config';
import { createTestDb, TestDatabase } from '../tests-helper/jest-test-helpers';
import { beetsService } from './beets.service';

let db: TestDatabase;

beforeAll(async () => {
    db = await createTestDb();
    // createPool({
    //     linearDynamicData: {
    //         create: {
    //             blockNumber: 123,
    //         },
    //     },
    // });
}, 60000);

afterAll(async () => {
    await db.stop();
});

test('retrieve fBeets ratio before synced', async () => {
    let ratio;
    try {
        ratio = await beetsService.getFbeetsRatio();
    } catch (e: any) {
        expect(e.message).toBe('Fbeets data has not yet been synced');
    }
    if (!isFantomNetwork()) {
        expect(ratio).toBe('1.0');
    }

    expect.assertions(1);
});

test('sync fBeets ratio', async () => {
    if (isFantomNetwork()) {
        await beetsService.syncFbeetsRatio();
        const fbeets = await prisma.prismaFbeets.findFirst({});
        expect(fbeets).toBeDefined();
    }
});

test('retrieve updated fBeets ratio', async () => {
    const ratio = await beetsService.getFbeetsRatio();
    if (isFantomNetwork()) {
        expect(ratio).not.toBe('1.0');
    } else {
        expect(ratio).toBe('1.0');
    }
});
