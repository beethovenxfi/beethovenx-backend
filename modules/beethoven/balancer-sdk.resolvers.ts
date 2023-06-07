import { Resolvers, GqlSorGetSwapsResponse } from '../../schema';
import { balancerSorService } from './balancer-sor.service';
import { tokenService } from '../token/token.service';

const balancerSdkResolvers: Resolvers = {
    Query: {
        sorGetSwaps: async (parent, args, context) => {
            const tokens = await tokenService.getTokens();

            const swaps = await balancerSorService.getSwaps({ ...args, tokens });
            return { ...swaps, __typename: 'GqlSorGetSwapsResponse' };
        },
        sorGetBatchSwapForTokensIn: async (parent, args, context) => {
            const tokens = await tokenService.getTokens();

            return balancerSorService.getBatchSwapForTokensIn({ ...args, tokens });
        },
    },
};

export default balancerSdkResolvers;
