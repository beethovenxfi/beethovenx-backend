import { Resolvers } from '../../schema';
import { sorService as sorService } from '../sor/sor.service';


const balancerResolvers: Resolvers = {
    Query: {
        balancerQueryTest: async (parent, {}, context) => {
            return 'test';
        },
        sorGetSwaps: async (parent, args, context) => {
            const swaps = await sorService.getCowSwaps({ ...args });
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
