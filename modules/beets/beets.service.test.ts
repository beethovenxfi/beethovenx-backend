import { assert } from 'console';
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

test('retrieve fBeets ratio - error not synced', async () => {
    expect(async () => await beetsService.getFbeetsRatio()).toThrow('Fbeets data has not yet been synced');
});
