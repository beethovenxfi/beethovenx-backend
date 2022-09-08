import { startTestDb, TestDatabase } from './jest-test-helpers';
import { server } from './mocks/server';
let db: TestDatabase;

beforeAll(async () => {
    db = await startTestDb();
    server.listen();
}, 60000);
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(async () => {
    db.stop();
    server.close();
});
