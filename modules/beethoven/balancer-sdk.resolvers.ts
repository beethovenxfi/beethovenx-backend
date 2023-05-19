import { Resolvers } from '../../schema';
import { balancerSorService } from './balancer-sor.service';
import { tokenService } from '../token/token.service';

const balancerSdkResolvers: Resolvers = {
    Query: {
        sorGetBatchSwapForTokensIn: async (parent, args, context) => {
            const tokens = await tokenService.getTokens();

            return balancerSorService.getBatchSwapForTokensIn({ ...args, tokens });
        },
    },
};

export default balancerSdkResolvers;
