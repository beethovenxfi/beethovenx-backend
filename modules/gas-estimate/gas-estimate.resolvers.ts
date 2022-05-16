import { Resolvers } from '../../schema';
import { gasEstimateService } from './gas-estimate.service';

const balancerResolvers: Resolvers = {
    Query: {
        gasEstimates: async (parent, {}, context) => {
            return gasEstimateService.getGasEstimateData();
        },
    },
};

export default balancerResolvers;
