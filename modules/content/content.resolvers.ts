import { Resolvers } from '../../schema';
import { networkContext } from '../network/network-context.service';

const contentResolvers: Resolvers = {
    Query: {
        contentGetNewsItems: async () => {
            return await networkContext.services.contentService.getNewsItems();
        },
    },
};

export default contentResolvers;
