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
        getLgeChartTokenPriceData: async (parent, args) => {
            return liquidityGenerationEventService.getLgeChartTokenPriceData(args.id, args.steps);
        },
        getLgeChartPredictedPriceData: async (parent, args) => {
            return liquidityGenerationEventService.getLgeChartPredictedPriceData(args.id, args.steps);
        },
    },
    Mutation: {
        lgeCreate: async (parent, { lge }) => {
            return liquidityGenerationEventService.createLiquidityGenerationEvent(lge);
        },
    },
};

export default liquidityGenerationEventResolvers;
