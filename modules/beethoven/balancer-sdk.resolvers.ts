import { Resolvers } from '../../schema';
import { balancerSorService } from './balancer-sor.service';
import { tokenService } from '../token/token.service';
import { sorService } from '../sor/sor.service';
import { getTokenAmountHuman } from '../sor/utils';

const balancerSdkResolvers: Resolvers = {
    Query: {
        sorGetSwaps: async (parent, args, context) => {
            const amountToken = args.swapType === 'EXACT_IN' ? args.tokenIn : args.tokenOut;
            // Use TokenAmount to help follow scaling requirements in later logic
            // args.swapAmount is HumanScale
            const amount = await getTokenAmountHuman(amountToken, args.swapAmount);
            const swaps = await sorService.getBeetsSwaps({ ...args, swapAmount: amount });
            return { ...swaps, __typename: 'GqlSorGetSwapsResponse' };
        },
        sorGetBatchSwapForTokensIn: async (parent, args, context) => {
            const tokens = await tokenService.getTokens();

            return balancerSorService.getBatchSwapForTokensIn({ ...args, tokens });
        },
    },
};

export default balancerSdkResolvers;
