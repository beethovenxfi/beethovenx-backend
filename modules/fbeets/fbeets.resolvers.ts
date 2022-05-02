import { Resolvers } from '../../schema';
import { beetsBarService } from '../subgraph/beets-bar/beets-bar.service';

const resolvers: Resolvers = {
    Query: {
        fbeetsGetApr: async (parent, {}, context) => {
            const apr = await beetsBarService.getFbeetsApr();

            return { apr };
        },
    },
};

export default resolvers;
