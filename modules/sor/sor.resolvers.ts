import { Resolvers } from '../../schema';
import { sorService as sorService } from './sor.service';
import { tokenService } from '../token/token.service';

const sorResolvers: Resolvers = {
    Query: {
        sorGetSwapsNew: async (parent, args, context) => {
            return sorService.getSwaps({ ...args });
        },
    },
};

export default sorResolvers;
