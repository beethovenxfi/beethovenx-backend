import { assert } from 'console';
import { createTestDb, TestDatabase } from '../tests-helper/jest-test-helpers';
import { beetsService } from './beets.service';
import { setPrisma } from '../../prisma/prisma-client';

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

test('retrieve fBeets ratio - error not synced', async () => {
    expect(await beetsService.getFbeetsRatio()).toThrow('Fbeets data has not yet been synced');

    try {
        await beetsService.getFbeetsRatio();
    } catch (e: any) {
        expect(e.message).toBe('Fbeets data has not yet been synced');
    }

    expect.assertions(1);

    // await expect(beetsService.getFbeetsRatio()).rejects.toThrow('Fbees data has not yet been synced');
});
