import { Resolvers } from '../../schema';
import { liquidityGenerationEventService } from './liquidity-generation-event.service';

const liquidityGenerationEventResolvers: Resolvers = {
    Query: {
        lge: async (parent, args) => {
            return liquidityGenerationEventService.getLiquidityGenerationEvent(args.id);
        },
        lges: () => {
            return liquidityGenerationEventService.getLges();
        },
        lgeGetChartData: async (parent, { id, steps }) => {
            return liquidityGenerationEventService.getLgeChartData(id, steps);
        },
    },
    Mutation: {
        lgeCreate: async (parent, { lge }) => {
            return liquidityGenerationEventService.createLiquidityGenerationEvent(lge);
        },
    },
};

export default liquidityGenerationEventResolvers;
