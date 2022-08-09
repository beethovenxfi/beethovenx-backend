import { beetsService } from './beets.service';

test('retrieve fBeets ratio - error not synced', async () => {
    try {
        const ratio = await beetsService.getFbeetsRatio();
        console.log(ratio);
    } catch (e) {
        console.log('hello');
        console.log(e);
        expect(e).toMatch('Fbeets data has not yet been synced');
    }
});
