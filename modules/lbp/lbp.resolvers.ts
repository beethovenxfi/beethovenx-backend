import { Resolvers } from '../../schema';
import { lbpService } from './lbp.service';

const lbpResolvers: Resolvers = {
    Query: {
        lbpGetLbp: async (parent, args) => {
            return lbpService.getLbp(args.id);
        },
        lbpGetLbps: () => {
            return lbpService.getLbps();
        },
        lbpGetChartData: async (parent, { id }) => {
            return lbpService.getLbpChartData(id);
        },
    },
    Mutation: {
        lbpCreate: async (parent, { lbp }) => {
            return lbpService.createLbp(lbp);
        },
    },
};

export default lbpResolvers;
