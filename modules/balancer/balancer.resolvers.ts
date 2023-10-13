import { Resolvers } from '../../schema';
import { sorService } from '../sor/sor.service';
import { getTokenAmount } from '../sor/utils';

const balancerResolvers: Resolvers = {
    Query: {
        sorGetCowSwaps: async (parent, args, context) => {
            const amountToken = args.swapType === "EXACT_IN" ? args.tokenIn : args.tokenOut;
            // Use TokenAmount to help follow scaling requirements in later logic
            // args.swapAmount is HumanScale
            const amount = await getTokenAmount(amountToken, args.swapAmount);
            const swaps = await sorService.getCowSwaps({ ...args, swapAmount: amount });
            return { ...swaps, __typename: 'GqlCowSwapApiResponse' };
        },
    },
    Mutation: {
        balancerMutationTest: async (parent, {}, context) => {
            return 'test';
        },
    },
};

export default balancerResolvers;
