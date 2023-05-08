import { Resolvers } from '../../schema';
import { sorService as sorService } from './sor.service';
import { getTrades, TradeResults } from './trade.service';
import { tokenService } from '../token/token.service';

const sorResolvers: Resolvers = {
    Query: {
        sorGetSwapsNew: async (parent, args, context) => {
            return sorService.getSwaps({ ...args });
        },
        tradeResults: async () => {
            return await getTrades();
        }
    },
};

export default sorResolvers;
