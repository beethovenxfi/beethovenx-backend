import { Resolvers } from '../../schema';
import { userService } from './user.service';
import { getRequiredAccountAddress, isAdminRoute } from '../auth/auth-context';
import { tokenService } from '../token/token.service';

const resolvers: Resolvers = {
    Query: {
        userGetPoolBalances: async (parent, {}, context) => {
            const accountAddress = getRequiredAccountAddress(context);
            const tokenPrices = await tokenService.getTokenPrices();
            const balances = await userService.getUserPoolBalances(accountAddress);

            return balances.map((balance) => ({
                ...balance,
                tokenPrice: tokenService.getPriceForToken(tokenPrices, balance.tokenAddress),
            }));
        },
        userGetPoolJoinExits: async (parent, { first, skip, poolId }, context) => {
            const accountAddress = getRequiredAccountAddress(context);

            return userService.getUserPoolInvestments(accountAddress, poolId, first, skip);
        },
        userGetSwaps: async (parent, { first, skip, poolId }, context) => {
            const accountAddress = getRequiredAccountAddress(context);
            return userService.getUserSwaps(accountAddress, poolId, first, skip);
        },
        userGetFbeetsBalance: async (parent, {}, context) => {
            const accountAddress = getRequiredAccountAddress(context);

            const balance = await userService.getUserFbeetsBalance(accountAddress);

            return {
                id: balance.tokenAddress,
                ...balance,
            };
        },
        userGetStaking: async (parent, {}, context) => {
            const accountAddress = getRequiredAccountAddress(context);

            return userService.getUserStaking(accountAddress);
        },
        userGetPoolSnapshots: async (parent, { poolId, range }, context) => {
            const accountAddress = getRequiredAccountAddress(context);

            return userService.getUserBalanceSnapshotsForPool(accountAddress, poolId, range);
        },
        userGetPortfolioSnapshots: async (parent, { days }, context) => {
            const accountAddress = getRequiredAccountAddress(context);

            return userService.getPortfolioSnapshotsForUser(accountAddress, days);
        },
    },
    Mutation: {
        userSyncWalletBalancesForAllPools: async (parent, {}, context) => {
            isAdminRoute(context);

            await userService.initWalletBalancesForAllPools();

            return 'success';
        },
        userInitWalletBalancesForAllPools: async (parent, {}, context) => {
            isAdminRoute(context);

            await userService.initWalletBalancesForAllPools();

            return 'success';
        },
        userInitWalletBalancesForPool: async (parent, { poolId }, context) => {
            isAdminRoute(context);

            await userService.initWalletBalancesForPool(poolId);

            return 'success';
        },
        userInitStakedBalances: async (parent, {}, context) => {
            isAdminRoute(context);

            await userService.initStakedBalances();

            return 'success';
        },
        userSyncStakedBalances: async (parent, {}, context) => {
            isAdminRoute(context);

            await userService.syncStakedBalances();

            return 'success';
        },
        userSyncBalance: async (parent, { poolId }, context) => {
            const accountAddress = getRequiredAccountAddress(context);

            await userService.syncUserBalance(accountAddress, poolId);

            return 'success';
        },
        userSyncBalanceAllPools: async (parent, {}, context) => {
            isAdminRoute(context);

            const accountAddress = getRequiredAccountAddress(context);

            await userService.syncUserBalanceAllPools(accountAddress);

            return 'success';
        },
        userLoadAllUserSnapshots: async (parent, {}, context) => {
            isAdminRoute(context);

            await userService.loadUserBalanceSnapshotsForAllUsers();

            return 'success';
        },
        userSyncLatestSnapshotsForAllUsers: async (parent, { daysToSync }, context) => {
            isAdminRoute(context);

            await userService.syncLatestSnapshotsForAllUsers(daysToSync || undefined);

            return 'success';
        },
    },
};

export default resolvers;
