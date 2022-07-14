import { balancerSubgraphService } from '../../subgraphs/balancer-subgraph/balancer-subgraph.service';
import { AddressZero, Zero } from '@ethersproject/constants';
import { getContractAt, jsonRpcProvider } from '../../util/ethers';
import ERC20Abi from '../../abi/ERC20.json';
import { prisma } from '../../util/prisma-client';
import _ from 'lodash';
import { Multicaller } from '../../util/multicaller';
import { networkConfig } from '../../config/network-config';
import { formatFixed } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { prismaBulkExecuteOperations } from '../../../prisma/prisma-util';
import { BalancerUserPoolShare } from '../../subgraphs/balancer-subgraph/balancer-subgraph-types';
import { beetsBarService } from '../../subgraphs/beets-bar-subgraph/beets-bar.service';
import { BeetsBarUserFragment } from '../../subgraphs/beets-bar-subgraph/generated/beets-bar-subgraph-types';
import { env } from '../../../app/env';

export class UserSyncWalletBalanceService {
    /***
     * Syncs user balances for pools with no existing user balances in the databases from the subgraph.
     */
    public async initBalancesForPools() {
        console.log('initBalancesForPools: loading balances, pools, block...');
        const { block } = await balancerSubgraphService.getMetadata();
        const { block: beetsBarBlock } = await beetsBarService.getMetadata();
        const balances = await prisma.prismaUserWalletBalance.findMany({});
        const pools = await prisma.prismaPool.findMany({
            select: { id: true, address: true },
            where: { dynamicData: { totalSharesNum: { gt: 0.000000000001 } } },
        });
        // we want to find all pool ids where no balances have been stored on any user
        const poolIdsToInit = pools
            .filter((pool) => balances.filter((balance) => balance.poolId === pool.id).length === 0)
            .map((pool) => pool.id);

        const chunks = _.chunk(poolIdsToInit, 100);

        // we get all shares owned by users & contracts which are not the vault or address zero
        let shares: BalancerUserPoolShare[] = [];
        console.log('initBalancesForPools: loading pool shares...');
        for (const chunk of chunks) {
            shares.push(
                ...(await balancerSubgraphService.getAllPoolShares({
                    where: {
                        poolId_in: chunk,
                        userAddress_not_in: [AddressZero, networkConfig.balancer.vault.toLowerCase()],
                        balance_not: '0',
                    },
                })),
            );
        }
        console.log('initBalancesForPools: finished loading pool shares...');

        // in case we are on opera, we also have the take fbeets holders into account which are not tracked by the balancer subgraph
        let fbeetsHolders: BeetsBarUserFragment[] = [];
        if (env.CHAIN_SLUG === 'opera') {
            fbeetsHolders = await beetsBarService.getAllUsers({ where: { fBeets_not: '0' } });
        }

        let operations: any[] = [];

        // for all found pools, we prepare the database operation to insert the user balance in a bulk in the next step
        const sharesByPoolAddress = _.groupBy(shares, (share) => share.poolAddress.toLowerCase());
        for (const pool of pools) {
            const poolShares = sharesByPoolAddress[pool.address];

            if (poolShares?.length > 0) {
                operations.push(...poolShares.map((share) => this.getPrismaUpsertForPoolShare(pool.id, share)));
            }
        }

        console.log('initBalancesForPools: performing db operations...');
        await prismaBulkExecuteOperations([
            // we create the base users if they don't exist
            prisma.prismaUser.createMany({
                data: _.uniq([
                    ...shares.map((share) => share.userAddress),
                    ...fbeetsHolders.map((user) => user.address),
                ]).map((address) => ({ address })),
                skipDuplicates: true,
            }),
            // add the balances to the users
            ...operations,
            ...fbeetsHolders.map((user) => this.getPrismaUpsertForFbeetsUser(user)),
            // and update the latest synced block
            prisma.prismaUserBalanceSyncStatus.upsert({
                where: { type: 'WALLET' },
                create: { type: 'WALLET', blockNumber: Math.min(block.number, beetsBarBlock.number) },
                update: { blockNumber: Math.min(block.number, beetsBarBlock.number) },
            }),
        ]);
        console.log('initBalancesForPools: finished performing db operations...');
    }

    public async syncBalancesForAllPools() {
        const erc20Interface = new ethers.utils.Interface(ERC20Abi);
        const latestBlock = await jsonRpcProvider.getBlockNumber();
        const syncStatus = await prisma.prismaUserBalanceSyncStatus.findUnique({ where: { type: 'WALLET' } });
        const pools = await prisma.prismaPool.findMany({ select: { id: true, address: true } });
        const poolAddresses = pools.map((item) => item.address);

        if (!syncStatus) {
            throw new Error('UserWalletBalanceService: syncBalances called before initBalances');
        }

        // we find the block range we need to sync. At most we sync 500 blocks from the last synced block
        const fromBlock = syncStatus.blockNumber + 1;
        const toBlock = latestBlock - fromBlock > 500 ? fromBlock + 500 : latestBlock;

        //fetch all erc20 transfer events for the block range
        const events = await jsonRpcProvider.getLogs({
            //ERC20 Transfer topic
            topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
            fromBlock,
            toBlock,
        });

        // we also need to track fbeets balance
        const bptAddresses = [...poolAddresses, networkConfig.fbeets.address];

        /*
            we need to update the sender and also the receiver of the bpt transfer, so we
            expand the event into 2 entries for each involved user address. We only need the
            user address once per pool
         */
        const balancesToFetch = _.uniqBy(
            events
                .filter((event) => bptAddresses.includes(event.address.toLowerCase()))
                .map((event) => {
                    const parsed = erc20Interface.parseLog(event);

                    return [
                        { erc20Address: event.address, userAddress: parsed.args?.from as string },
                        { erc20Address: event.address, userAddress: parsed.args?.to as string },
                    ];
                })
                .flat(),
            // we make it unique by user & pool
            (entry) => (entry.erc20Address + entry.userAddress).toLowerCase(),
        )
            // also we are not interested in the zero address
            .filter((entry) => entry.userAddress !== AddressZero);

        if (balancesToFetch.length === 0) {
            return;
        }

        const balances = await Multicaller.fetchBalances({
            multicallAddress: networkConfig.multicall,
            provider: jsonRpcProvider,
            balancesToFetch,
        });

        await prismaBulkExecuteOperations([
            //make sure all users exist
            prisma.prismaUser.createMany({
                data: balances.map((item) => ({ address: item.userAddress })),
                skipDuplicates: true,
            }),
            //update balances
            ...balances.map(({ userAddress, erc20Address, balance }) => {
                const poolId = pools.find((pool) => pool.address === erc20Address)?.id;
                return prisma.prismaUserWalletBalance.upsert({
                    // todo: why not combined primary key?
                    where: { id: `${poolId}-${userAddress}` },
                    create: {
                        id: `${poolId}-${userAddress}`,
                        userAddress,
                        poolId,
                        tokenAddress: erc20Address,
                        balance: formatFixed(balance, 18),
                        balanceNum: parseFloat(formatFixed(balance, 18)),
                    },
                    update: { balance: formatFixed(balance, 18), balanceNum: parseFloat(formatFixed(balance, 18)) },
                });
            }),
            prisma.prismaUserBalanceSyncStatus.upsert({
                where: { type: 'WALLET' },
                create: { type: 'WALLET', blockNumber: toBlock },
                update: { blockNumber: toBlock },
            }),
        ]);
    }

    public async initBalancesForPool(poolId: string) {
        const { block } = await balancerSubgraphService.getMetadata();
        const shares = await balancerSubgraphService.getAllPoolShares({
            where: { poolId, userAddress_not: AddressZero, balance_not: '0' },
        });

        await prismaBulkExecuteOperations([
            prisma.prismaUser.createMany({
                data: shares.map((share) => ({ address: share.userAddress })),
                skipDuplicates: true,
            }),
            ...shares.map((share) => this.getPrismaUpsertForPoolShare(poolId, share)),
            prisma.prismaUserBalanceSyncStatus.upsert({
                where: { type: 'WALLET' },
                create: { type: 'WALLET', blockNumber: block.number },
                update: { blockNumber: block.number },
            }),
        ]);
    }

    private getPrismaUpsertForPoolShare(poolId: string, share: BalancerUserPoolShare) {
        return prisma.prismaUserWalletBalance.upsert({
            where: { id: `${poolId}-${share.userAddress}` },
            create: {
                id: `${poolId}-${share.userAddress}`,
                userAddress: share.userAddress,
                poolId,
                tokenAddress: share.poolAddress.toLowerCase(),
                balance: share.balance,
                balanceNum: parseFloat(share.balance),
            },
            update: { balance: share.balance, balanceNum: parseFloat(share.balance) },
        });
    }

    private getPrismaUpsertForFbeetsUser(user: BeetsBarUserFragment) {
        return prisma.prismaUserWalletBalance.upsert({
            where: { id: `fbeets-${user.address}` },
            create: {
                id: `fbeets-${user.address}`,
                userAddress: user.address,
                tokenAddress: networkConfig.fbeets.address,
                balance: user.fBeets,
                balanceNum: parseFloat(user.fBeets),
            },
            update: { balance: user.fBeets, balanceNum: parseFloat(user.fBeets) },
        });
    }
}
