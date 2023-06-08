import { Resolvers } from '../../schema';
import { balancerSorService } from './balancer-sor.service';
import { tokenService } from '../token/token.service';
import { sorService } from '../sor/sor.service';

const balancerSdkResolvers: Resolvers = {
    Query: {
        sorGetSwaps: async (parent, args, context) => {
            const swaps = await sorService.getBeetsSwaps({ ...args });
            return { ...swaps, __typename: 'GqlSorGetSwapsResponse' };
        },
        sorGetBatchSwapForTokensIn: async (parent, args, context) => {
            const tokens = await tokenService.getTokens();

            return balancerSorService.getBatchSwapForTokensIn({ ...args, tokens });
        },
    },
};

export default balancerSdkResolvers;
