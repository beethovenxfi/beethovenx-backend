import { Resolvers } from '../../schema';
import { sorService as sorService } from './sor.service';
import { tokenService } from '../token/token.service';

const sorResolvers: Resolvers = {
    Query: {
        sorGetSwaps: async (parent, args, context) => {
            return sorService.getCowSwaps({ ...args });
        },
    },
};

export default sorResolvers;
