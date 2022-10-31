import { UserSnapshotSubgraphService } from '../../subgraphs/user-snapshot-subgraph/user-snapshot-subgraph.service';
import { prisma } from '../../../prisma/prisma-client';
import moment from 'moment-timezone';
import { UserPoolSnapshot } from '../user-types';
import { GqlUserSnapshotDataRange } from '../../../schema';
import { PoolSnapshotService } from '../../pool/lib/pool-snapshot.service';
import { networkConfig } from '../../config/network-config';
import { Prisma, PrismaPool, PrismaPoolSnapshot, PrismaPoolStaking } from '@prisma/client';
import { prismaBulkExecuteOperations } from '../../../prisma/prisma-util';
import { secondsPerDay } from '../../common/time';
import { UserBalanceSnapshotFragment } from '../../subgraphs/user-snapshot-subgraph/generated/user-snapshot-subgraph-types';

export class UserSnapshotService {
    private readonly FBEETS_BPT_RATIO: number = 1.0271;

    constructor(
        private readonly userSnapshotSubgraphService: UserSnapshotSubgraphService,
        private readonly poolSnapshotService: PoolSnapshotService,
        private readonly fbeetsAddress: string,
        private readonly fbeetsPoolId: string,
    ) {}

    public async syncUserSnapshots() {
        // sync all snapshots that we have stored

        let operations: any[] = [];

        // get all unique users which have a snapshot stored
        const users = await prisma.prismaUserPoolBalanceSnapshot.findMany({
            distinct: ['userAddress'],
            select: {
                userAddress: true,
            },
        });

        for (const user of users) {
            const userAddress = user.userAddress;
            const userSnapshotsFromSubgraph =
                await this.userSnapshotSubgraphService.getUserBalanceSnapshotsForUserAndRange(
                    0,
                    moment().unix(),
                    userAddress,
                );
            // no snapshots for the user in the requested timerange
            if (!userSnapshotsFromSubgraph) {
                continue;
            }

            // get the latest snapshot for each unique user/pool pair
            const latestStoredPoolSnapshotsOfUser = await prisma.prismaUserPoolBalanceSnapshot.findMany({
                where: { userAddress: userAddress },
                orderBy: { timestamp: 'desc' },
                distinct: ['userAddress', 'poolId'],
            });

            /*
            For each latest stored user pool snapshot, we need to sync from subgraph. We only store user snapshots for pools with an existing snapshot if they meet one of the following criteria:
            - total balance of subgraph snapshot is not 0
            - total balance of subgraph snapshot is 0, but the total balance of the previous stored user pool snapshot was > 0, meaning the user has left the pool. 
            
            A snapshot reflects always the state by the end of the day (UTC). Snapshots for the current day are gradually updated to reflect the current state. 
            Therefore we have to handle those snapshots different than the ones for already closed days. 

            */
            for (const latestStoredUserPoolSnapshot of latestStoredPoolSnapshotsOfUser) {
                let previousStoredUserPoolSnapshotHasBalance =
                    parseFloat(latestStoredUserPoolSnapshot.totalBalance) > 0;
                for (const userSubgraphSnapshot of userSnapshotsFromSubgraph.snapshots) {
                    if (!userSubgraphSnapshot || !latestStoredUserPoolSnapshot.poolId) {
                        continue;
                    }
                    if (userSubgraphSnapshot.timestamp >= latestStoredUserPoolSnapshot.timestamp) {
                        // subgraph snapshot is newer or from today. If it is > 0 balance, we need to enrich and persist.
                        const pool = await prisma.prismaPool.findUniqueOrThrow({
                            where: {
                                id: latestStoredUserPoolSnapshot.poolId,
                            },
                            include: {
                                staking: true,
                            },
                        });

                        // extract data from snapshot for the requested pool
                        const { totalBalance, walletBalance, gaugeBalance, farmBalance } =
                            this.extractBalancesFromSnapshot(userSubgraphSnapshot, pool);

                        if (totalBalance > 0) {
                            //enrich with poolsnapshot data and save
                            const poolSnapshot = await this.poolSnapshotService.getSnapshotForPool(
                                latestStoredUserPoolSnapshot.poolId,
                                userSubgraphSnapshot.timestamp,
                            );

                            /*
                            Could be that the poolsnapshot is delayed (beethoven subgraph is much slower than bpt subgraph),
                            so we will persist 0 $ value if there is a totalBalance > 0 and try to get the when we serve the data
                            */
                            const userPoolBalanceSnapshotData = this.createUserPoolSnapshotData(
                                poolSnapshot,
                                pool,
                                userSubgraphSnapshot,
                                totalBalance,
                                walletBalance,
                                gaugeBalance,
                                farmBalance,
                            );

                            operations.push(
                                prisma.prismaUserPoolBalanceSnapshot.upsert({
                                    where: { id: userPoolBalanceSnapshotData.id },
                                    create: userPoolBalanceSnapshotData,
                                    update: userPoolBalanceSnapshotData,
                                }),
                            );
                            previousStoredUserPoolSnapshotHasBalance = true;
                        } else if (previousStoredUserPoolSnapshotHasBalance) {
                            // if the snapshot has total balance of 0, we store it if the previously stored snapshot had a balance. This is to indicate that the user has left the pool.
                            const userPoolBalanceSnapshotData = {
                                id: `${pool.id}-${userSubgraphSnapshot.user.id.toLowerCase()}-${
                                    userSubgraphSnapshot.timestamp
                                }`,
                                timestamp: userSubgraphSnapshot.timestamp,
                                userAddress: userSubgraphSnapshot.user.id.toLowerCase(),
                                poolId: pool.id,
                                poolToken: pool.address,
                                walletBalance,
                                gaugeBalance,
                                farmBalance,
                                percentShare: `0`,
                                totalBalance: '0',
                                totalValueUSD: `0`,
                                fees24h: `0`,
                            };

                            operations.push(
                                prisma.prismaUserPoolBalanceSnapshot.upsert({
                                    where: { id: userPoolBalanceSnapshotData.id },
                                    create: userPoolBalanceSnapshotData,
                                    update: userPoolBalanceSnapshotData,
                                }),
                            );
                            previousStoredUserPoolSnapshotHasBalance = false;
                        }
                    }
                }
            }
        }

        await prismaBulkExecuteOperations(operations, false);
    }

    public async getUserSnapshotsForPool(
        userAddress: string,
        poolId: string,
        range: GqlUserSnapshotDataRange,
    ): Promise<UserPoolSnapshot[]> {
        const oldestRequestedSnapshotTimestamp = this.getTimestampForRange(range);

        userAddress = userAddress.toLowerCase();
        poolId = poolId.toLowerCase();

        const storedUserSnapshotsForPool = await this.getStoredSnapshotsForUserForPoolFromTimestamp(
            userAddress,
            0,
            poolId,
        );

        let storedUserSnapshotsInRangeForPool = storedUserSnapshotsForPool.filter(
            (snapshot) => snapshot.timestamp >= oldestRequestedSnapshotTimestamp,
        );

        let poolSnapshots: PrismaPoolSnapshot[] = [];

        // no stored snapshots, retrieve from subgraph and store all
        if (storedUserSnapshotsForPool.length === 0) {
            const userSnapshotsFromSubgraph =
                await this.userSnapshotSubgraphService.getUserBalanceSnapshotsForUserAndRange(
                    0,
                    moment().unix(),
                    userAddress,
                );

            const pool = await prisma.prismaPool.findUniqueOrThrow({
                where: {
                    id: poolId,
                },
                include: {
                    staking: true,
                },
            });

            // Check if any of the retrieved subgraph snapshots contain the requested pool, no need to go further if there are no snapshots
            if (
                !userSnapshotsFromSubgraph.snapshots.find((snapshot) => {
                    if (snapshot.walletTokens.includes(pool.address)) {
                        return snapshot;
                    }

                    if (pool.staking) {
                        if (snapshot.farms.includes(pool.staking.id) || snapshot.gauges.includes(pool.staking.id))
                            return snapshot;
                    }
                })
            ) {
                return [];
            }

            // make sure users exists
            await prisma.prismaUser.upsert({
                where: { address: userAddress },
                update: {},
                create: { address: userAddress },
            });

            const prismaInput: Prisma.PrismaUserPoolBalanceSnapshotCreateManyInput[] = [];

            poolSnapshots = await this.poolSnapshotService.getSnapshotsForPool(poolId, range);

            /*
            For each snapshot from the subgraph, this will get the poolSnapshot for the same timestamp and enrich with $ value data
            If there is no poolSnapshot for that timestamp, we persist a 0 $ totalUSD snapshot because it could become available at a later time
            If there are consecutive 0 total balance snapshots, only the first one is persisted. This is to avoid unnecessary 0 value 
            snapshots in the database. These 0 balance gaps must be filled when serving the request.
            */
            for (const userSubgraphSnapshot of userSnapshotsFromSubgraph.snapshots) {
                const poolSnapshotForTimestamp = poolSnapshots.find(
                    (poolSnapshot) => userSubgraphSnapshot.timestamp === poolSnapshot.timestamp,
                );

                // extract data from snapshot for the requested pool
                const { totalBalance, walletBalance, gaugeBalance, farmBalance } = this.extractBalancesFromSnapshot(
                    userSubgraphSnapshot,
                    pool,
                );

                /*
                We get ALL snapshots from the subgraph for the user. Total balance will be 0 until he joined the pool we need.
                Therefore we want to skip all 0 total balance snapshot at the beginning.
                */
                if (prismaInput.length === 0 && totalBalance === 0) {
                    continue;
                }

                /*
                If a user left a pool, the snapshot from the subgraph won't list the pool balance with '0'.
                In fact, the pool address (or farm or gage id) won't show up in the array. We therefore need to store the FIRST
                0 total balance snapshot to show that he left the pool, but want to skip any consecutive 0 total value
                snapshots to avoid unnecessary 0 total balance snapshots in the database.
                */
                if (totalBalance === 0 && prismaInput[prismaInput.length - 1].totalBalance === '0') {
                    continue;
                }

                const userPoolBalanceSnapshotData = this.createUserPoolSnapshotData(
                    poolSnapshotForTimestamp,
                    pool,
                    userSubgraphSnapshot,
                    totalBalance,
                    walletBalance,
                    gaugeBalance,
                    farmBalance,
                );

                prismaInput.push(userPoolBalanceSnapshotData);
            }
            await prisma.prismaUserPoolBalanceSnapshot.createMany({
                data: prismaInput,
            });

            storedUserSnapshotsInRangeForPool = await this.getStoredSnapshotsForUserForPoolFromTimestamp(
                userAddress,
                oldestRequestedSnapshotTimestamp,
                poolId,
            );
        }

        // Only get them if we didn't get them above
        if (poolSnapshots.length === 0) {
            poolSnapshots = await this.poolSnapshotService.getSnapshotsForPool(poolId, range);
        }

        /*
        

        If a user joined a pool and did not interact with the pool (or any other pool) for a few days, those snapshots 
        will be missing from the subgraph and also in the database. When the user requests his snapshots for a given pool
        we need to find and fill the gaps between the first and the last snapshot we have in the database.

        1st) If there is no snapshot for the oldestRequestedTimestamp but there is an older one, we need to infer from the older one to the oldestRequestedTimestamp
        2nd) We need to find and fill the gaps between the oldestRequestedTimestamp and the latest stored snapshot we have in the database.
        3rd) If the latest stored snapshot is not a 0 total balance snapshot (which would mean the user left the pool) we will also 
        need to fill the gaps from the latest stored snapshot until today.
        */

        // The first snapshot in the database must be >0 total value, push that
        const userPoolSnapshots: UserPoolSnapshot[] = [];

        // 1st) if we either have no stored snapshots for the range or only newer ones, we need to check if we have an older and infer
        if (
            storedUserSnapshotsInRangeForPool.length === 0 ||
            storedUserSnapshotsInRangeForPool[0].timestamp > oldestRequestedSnapshotTimestamp
        ) {
            const olderSnapshot = await prisma.prismaUserPoolBalanceSnapshot.findFirst({
                where: {
                    userAddress: userAddress,
                    timestamp: {
                        lt: oldestRequestedSnapshotTimestamp,
                    },
                    poolId: poolId,
                },
                orderBy: { timestamp: 'desc' },
            });
            if (olderSnapshot) {
                const poolSnapshot = poolSnapshots.find(
                    (snapshot) => snapshot.timestamp === oldestRequestedSnapshotTimestamp,
                );
                const percentShare = poolSnapshot
                    ? parseFloat(olderSnapshot.totalBalance) / poolSnapshot.totalSharesNum
                    : 0;
                userPoolSnapshots.push({
                    timestamp: oldestRequestedSnapshotTimestamp,
                    walletBalance: olderSnapshot.walletBalance,
                    farmBalance: olderSnapshot.farmBalance,
                    gaugeBalance: olderSnapshot.gaugeBalance,
                    totalBalance: olderSnapshot.totalBalance,
                    percentShare: percentShare,
                    totalValueUSD: `${parseFloat(olderSnapshot.totalBalance) * (poolSnapshot?.sharePrice || 0)}`,
                    fees24h: `${
                        percentShare *
                        (poolSnapshot?.fees24h || 0) *
                        (1 - networkConfig.balancer.swapProtocolFeePercentage)
                    }`,
                });
            }
        }

        // We need the fist snapshot already in the userPoolSnapshots array because we are accessing previous indexes below.
        // We only need to do this here if we didn't already push one snapshot above.
        if (userPoolSnapshots.length === 0) {
            const firstSnapshot = storedUserSnapshotsInRangeForPool.shift();
            if (firstSnapshot) {
                // check
                userPoolSnapshots.push({
                    timestamp: firstSnapshot.timestamp,
                    walletBalance: firstSnapshot.walletBalance,
                    farmBalance: firstSnapshot.farmBalance,
                    gaugeBalance: firstSnapshot.gaugeBalance,
                    totalBalance: firstSnapshot.totalBalance,
                    totalValueUSD: firstSnapshot.totalValueUSD,
                    fees24h: firstSnapshot.fees24h,
                    percentShare: parseFloat(firstSnapshot.percentShare),
                });
            }
        }
        for (const currentSnapshot of storedUserSnapshotsInRangeForPool) {
            /* 2nd)
            as long as the currentSnapshot is newer than (timestamp + 1 day) of the last snapshot in userPoolSnapshots, it means there is a gap that we need to fill. 
            E.g. we have snapshots for day 1 and 4 -> currentSnapshot.timestamp=4 (day 1 already stored above), which is newer than 1+1, so we fill the gap for day 2.
            currentSnapshot.timestamp=4 is newer than 2+1, need to fill gap for day 3.
            currentSnapshot.timestamp=4 is not newer than 3+1, no gap, persist currentSnapshot
            etc.
            */
            while (
                currentSnapshot.timestamp >
                userPoolSnapshots[userPoolSnapshots.length - 1].timestamp + secondsPerDay
            ) {
                //need to fill the gap from last snapshot
                const previousUserSnapshot = userPoolSnapshots[userPoolSnapshots.length - 1];
                const currentTimestamp = previousUserSnapshot.timestamp + secondsPerDay;
                const poolSnapshot = poolSnapshots.find((snapshot) => snapshot.timestamp === currentTimestamp);
                const percentShare = poolSnapshot
                    ? parseFloat(previousUserSnapshot.totalBalance) / poolSnapshot.totalSharesNum
                    : 0;
                userPoolSnapshots.push({
                    timestamp: currentTimestamp,
                    walletBalance: previousUserSnapshot.walletBalance,
                    farmBalance: previousUserSnapshot.farmBalance,
                    gaugeBalance: previousUserSnapshot.gaugeBalance,
                    totalBalance: previousUserSnapshot.totalBalance,
                    percentShare: percentShare,
                    totalValueUSD: `${parseFloat(previousUserSnapshot.totalBalance) * (poolSnapshot?.sharePrice || 0)}`,
                    fees24h: `${
                        percentShare *
                        (poolSnapshot?.fees24h || 0) *
                        (1 - networkConfig.balancer.swapProtocolFeePercentage)
                    }`,
                });
            }

            if (parseFloat(currentSnapshot.totalBalance) > 0 && parseFloat(currentSnapshot.totalValueUSD) === 0) {
                // We didn't have a poolsnapshot at the time of persistance, let's see if we have one now and persist
                const poolSnapshot = poolSnapshots.find(
                    (poolSnapshot) => poolSnapshot.timestamp === currentSnapshot.timestamp,
                );
                if (poolSnapshot) {
                    const percentShare = parseFloat(currentSnapshot.totalBalance) / poolSnapshot.totalSharesNum;
                    currentSnapshot.percentShare = percentShare.toString();
                    currentSnapshot.totalValueUSD = `${
                        parseFloat(currentSnapshot.totalBalance) * (poolSnapshot.sharePrice || 0)
                    }`;
                    currentSnapshot.fees24h = `${
                        percentShare *
                        (poolSnapshot.fees24h || 0) *
                        (1 - networkConfig.balancer.swapProtocolFeePercentage)
                    }`;
                    await prisma.prismaUserPoolBalanceSnapshot.update({
                        where: { id: currentSnapshot.id },
                        data: currentSnapshot,
                    });
                }
            }
            userPoolSnapshots.push({
                timestamp: currentSnapshot.timestamp,
                walletBalance: currentSnapshot.walletBalance,
                farmBalance: currentSnapshot.farmBalance,
                gaugeBalance: currentSnapshot.gaugeBalance,
                totalBalance: currentSnapshot.totalBalance,
                totalValueUSD: currentSnapshot.totalValueUSD,
                fees24h: currentSnapshot.fees24h,
                percentShare: parseFloat(currentSnapshot.percentShare),
            });
        }

        // 3rd) we have to check if there are missing snapshots from the last snapshot until today and fill in those gaps (if the latest balance is > 0)
        if (parseFloat(userPoolSnapshots[userPoolSnapshots.length - 1].totalBalance) > 0) {
            while (userPoolSnapshots[userPoolSnapshots.length - 1].timestamp < moment().startOf('day').unix()) {
                const previousUserSnapshot = userPoolSnapshots[userPoolSnapshots.length - 1];
                const currentTimestamp = previousUserSnapshot.timestamp + secondsPerDay;
                const poolSnapshot = poolSnapshots.find((snapshot) => snapshot.timestamp === currentTimestamp);
                const percentShare = poolSnapshot
                    ? parseFloat(previousUserSnapshot.totalBalance) / poolSnapshot.totalSharesNum
                    : 0;
                userPoolSnapshots.push({
                    timestamp: currentTimestamp,
                    walletBalance: previousUserSnapshot.walletBalance,
                    farmBalance: previousUserSnapshot.farmBalance,
                    gaugeBalance: previousUserSnapshot.gaugeBalance,
                    totalBalance: previousUserSnapshot.totalBalance,
                    percentShare: percentShare,
                    totalValueUSD: `${parseFloat(previousUserSnapshot.totalBalance) * (poolSnapshot?.sharePrice || 0)}`,
                    fees24h: `${
                        percentShare *
                        (poolSnapshot?.fees24h || 0) *
                        (1 - networkConfig.balancer.swapProtocolFeePercentage)
                    }`,
                });
            }
        }
        return userPoolSnapshots;
    }

    private createUserPoolSnapshotData(
        poolSnapshot: PrismaPoolSnapshot | undefined | null,
        pool: PrismaPool & { staking: PrismaPoolStaking | null },
        subgraphSnapshot: UserBalanceSnapshotFragment,
        totalBalance: number,
        walletBalance: string,
        gaugeBalance: string,
        farmBalance: string,
    ) {
        const percentShare = poolSnapshot ? totalBalance / poolSnapshot?.totalSharesNum : 0;

        const userPoolBalanceSnapshotData = {
            id: `${pool.id}-${subgraphSnapshot.user.id.toLowerCase()}-${subgraphSnapshot.timestamp}`,
            timestamp: subgraphSnapshot.timestamp,
            userAddress: subgraphSnapshot.user.id.toLowerCase(),
            poolId: pool.id,
            poolToken: pool.address,
            walletBalance,
            gaugeBalance,
            farmBalance,
            percentShare: `${percentShare}`,
            totalBalance: `${totalBalance}`,
            totalValueUSD: `${totalBalance * (poolSnapshot?.sharePrice || 0)}`,
            fees24h: `${
                percentShare * (poolSnapshot?.fees24h || 0) * (1 - networkConfig.balancer.swapProtocolFeePercentage)
            }`,
        };
        return userPoolBalanceSnapshotData;
    }

    /*
    The snapshot consists of 6 arrays which follow the same structure. For each type (wallet, farm, gauge) it has a "index" array and a "balance" array:
    - walletTokens -> walletBalances
    - Gauges -> GaugeBalances
    - Farms -> FarmBalances

    The index array indicates the position of the walletToken, gauge or farm in the balance array. e.g.:
    - walletTokens: ["token1", "token2"]
    - walletBalances: ["200", "100"]
    This means the user has 200 of token1 and 100 of token2 in his wallet. 
    */
    private extractBalancesFromSnapshot(
        userSnapshot: UserBalanceSnapshotFragment,
        pool: PrismaPool & { staking: PrismaPoolStaking | null },
    ) {
        const walletIdx = userSnapshot.walletTokens.indexOf(pool.address);
        let walletBalance = walletIdx !== -1 ? userSnapshot.walletBalances[walletIdx] : '0';
        const gaugeIdx = userSnapshot.gauges.indexOf(pool.staking?.id || '');
        const gaugeBalance = gaugeIdx !== -1 ? userSnapshot.gaugeBalances[gaugeIdx] : '0';
        const farmIdx = userSnapshot.farms.indexOf(pool.staking?.id || '');
        let farmBalance = farmIdx !== -1 ? userSnapshot.farmBalances[farmIdx] : '0';

        // if the pool is fbeets (fidelio duetto), we need to also add fbeets wallet balance (multiplied by bpt ratio) to the bpt wallet balance
        // we also need to multiply the staked amount by the fbeets->bpt ratio
        if (pool.id === this.fbeetsPoolId) {
            const fBeetsWalletIdx = userSnapshot.walletTokens.indexOf(this.fbeetsAddress);
            const fBeetsWalletBalance = fBeetsWalletIdx !== -1 ? userSnapshot.walletBalances[fBeetsWalletIdx] : '0';
            walletBalance = (
                parseFloat(walletBalance) +
                parseFloat(fBeetsWalletBalance) * this.FBEETS_BPT_RATIO
            ).toString();

            farmBalance = (parseFloat(farmBalance) * this.FBEETS_BPT_RATIO).toString();
        }

        const totalBalance = parseFloat(walletBalance) + parseFloat(gaugeBalance) + parseFloat(farmBalance);
        return { totalBalance, walletBalance, gaugeBalance, farmBalance };
    }

    private async getStoredSnapshotsForUserForPoolFromTimestamp(
        userAddress: string,
        oldestRequestedSnapshotTimestamp: number,
        poolId: string,
    ) {
        return await prisma.prismaUserPoolBalanceSnapshot.findMany({
            where: {
                userAddress: userAddress,
                timestamp: {
                    gte: oldestRequestedSnapshotTimestamp,
                },
                poolId: poolId,
            },
            orderBy: { timestamp: 'asc' },
        });
    }

    private getTimestampForRange(range: GqlUserSnapshotDataRange): number {
        switch (range) {
            case 'THIRTY_DAYS':
                return moment().startOf('day').subtract(30, 'days').unix();
            case 'NINETY_DAYS':
                return moment().startOf('day').subtract(90, 'days').unix();
            case 'ONE_HUNDRED_EIGHTY_DAYS':
                return moment().startOf('day').subtract(180, 'days').unix();
            case 'ONE_YEAR':
                return moment().startOf('day').subtract(365, 'days').unix();
            case 'ALL_TIME':
                return 0;
        }
    }
}
