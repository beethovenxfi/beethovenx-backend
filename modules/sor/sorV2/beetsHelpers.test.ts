import { SingleSwap, SwapKind } from '@balancer/sdk';
import { GqlPoolMinimal, GqlSorSwapRoute } from '../../../schema';
import { mapRoutes } from './beetsHelpers';
import { poolService } from '../../pool/pool.service';

// npx jest --testPathPattern=modules/sor/sorV2/beetsHelpers.test.ts
describe('sorV2 Service - Routes', () => {
    describe('SingleSwap', () => {
        let singleSwap: SingleSwap;
        let pools: GqlPoolMinimal[];
        let expectedRoute: GqlSorSwapRoute[];

        beforeAll(async () => {
            pools = await poolService.getGqlPools({
                where: { idIn: ['0x216690738aac4aa0c4770253ca26a28f0115c595000000000000000000000b2c'] },
            });
            singleSwap = {
                poolId: '0x216690738aac4aa0c4770253ca26a28f0115c595000000000000000000000b2c',
                kind: SwapKind.GivenIn,
                assetIn: '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4',
                assetOut: '0xE4885Ed2818Cc9E840A25f94F9b2A28169D1AEA7',
                amount: BigInt(0),
                userData: '0x',
            };
            expectedRoute = [
                {
                    hops: [
                        {
                            pool: pools[0],
                            poolId: '0x216690738aac4aa0c4770253ca26a28f0115c595000000000000000000000b2c',
                            tokenIn: '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4',
                            tokenInAmount: '',
                            tokenOut: '0xE4885Ed2818Cc9E840A25f94F9b2A28169D1AEA7',
                            tokenOutAmount: '',
                        },
                    ],
                    share: 1,
                    tokenIn: '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4',
                    tokenInAmount: '',
                    tokenOut: '0xE4885Ed2818Cc9E840A25f94F9b2A28169D1AEA7',
                    tokenOutAmount: '',
                },
            ];
        });
        test('GivenIn', () => {
            const amountIn = '123456789112345678';
            const amountOut = '876543210987654321';
            singleSwap.kind = SwapKind.GivenIn;
            singleSwap.amount = BigInt(amountIn);
            expectedRoute[0].tokenInAmount = amountIn;
            expectedRoute[0].tokenOutAmount = amountOut;
            expectedRoute[0].hops[0].tokenInAmount = amountIn;
            expectedRoute[0].hops[0].tokenOutAmount = amountOut;
            const mappedRoute = mapRoutes(singleSwap, amountIn, amountOut, pools);
            expect(mappedRoute).toEqual(expectedRoute);
        });
        test('GivenOut', () => {
            const amountIn = '876543210987654321';
            const amountOut = '123456789112345678';
            singleSwap.kind = SwapKind.GivenOut;
            singleSwap.amount = BigInt(amountOut);
            expectedRoute[0].tokenInAmount = amountIn;
            expectedRoute[0].tokenOutAmount = amountOut;
            expectedRoute[0].hops[0].tokenInAmount = amountIn;
            expectedRoute[0].hops[0].tokenOutAmount = amountOut;
            const mappedRoute = mapRoutes(singleSwap, amountIn, amountOut, pools);
            expect(mappedRoute).toEqual(expectedRoute);
        });
    });
});
