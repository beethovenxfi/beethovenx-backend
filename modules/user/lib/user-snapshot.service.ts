import { UserSnapshotSubgraphService } from '../../subgraphs/user-snapshot-subgraph/user-snapshot-subgraph.service';
import { prisma } from '../../../prisma/prisma-client';
import { parseUnits } from 'ethers/lib/utils';
import moment from 'moment-timezone';
import { UserPortfolioSnapshot, UserPoolSnapshot } from '../user-types';
import { GqlUserSnapshotDataRange } from '../../../schema';
import { PoolSnapshotService } from '../../pool/lib/pool-snapshot.service';
import { formatFixed } from '@ethersproject/bignumber';

export class UserSnapshotService {
    constructor(
        private readonly userSnapshotSubgraphService: UserSnapshotSubgraphService,
        private readonly poolSnapshotService: PoolSnapshotService,
    ) {}

    public async getPortfolioSnapshots(accountAddress: string, numDays: number): Promise<UserPortfolioSnapshot[]> {
        throw new Error('Method not implemented.');
    }

    public async syncLatestSnapshotsForUsers(daysToSync: number = 1, userAddresses?: string[]) {
        if (!userAddresses) {
            //TODO is this correct?
            const usersWithBalances = await prisma.prismaUser.findMany({
                include: {
                    walletBalances: { where: { poolId: { not: null }, balanceNum: { gt: 0 } } },
                    stakedBalances: {
                        where: { poolId: { not: null }, balanceNum: { gt: 0 } },
                    },
                },
            });

            userAddresses = usersWithBalances
                .filter(
                    (user) =>
                        (user.stakedBalances.length > 0 || user.walletBalances.length > 0) &&
                        user.address !== '0x000000000000000000000000000000000000dead' &&
                        user.address !== '0x0000000000000000000000000000000000000000',
                )
                .map((user) => user.address);
        }

        let syncFromTimestamp = 0;
        if (daysToSync > 0) {
            syncFromTimestamp = moment().utc().startOf('day').subtract(daysToSync, 'days').unix();
        }

        let count = 0;

        for (const userId of userAddresses) {
            console.log(`Loading user ${count} of ${userAddresses.length}`);
            count += 1;
            const { snapshots: subgraphUserBalanceSnapshots } =
                await this.userSnapshotSubgraphService.userBalanceSnapshots({
                    where: {
                        user: userId,
                        timestamp_gte: syncFromTimestamp,
                    },
                });

            await prisma.prismaUserBalanceSnapshot.createMany({
                data: subgraphUserBalanceSnapshots.map((snapshot) => {
                    return {
                        id: snapshot.id,
                        userAddress: snapshot.user.id.toLowerCase(),
                        timestamp: snapshot.timestamp,
                    };
                }),
            });

            const allPoolsFromSnapshot = await prisma.prismaPool.findMany({
                where: {
                    OR: [
                        {
                            address: {
                                in: subgraphUserBalanceSnapshots.map((snapshot) => snapshot.walletTokens).flat(),
                            },
                        },
                        {
                            staking: {
                                id: {
                                    in: subgraphUserBalanceSnapshots
                                        .map((snapshot) => [...snapshot.farms, ...snapshot.gauges])
                                        .flat(),
                                },
                            },
                        },
                    ],
                },
                include: { staking: true },
            });
            for (const snapshot of subgraphUserBalanceSnapshots) {
                const prismaInput = [];
                for (const pool of allPoolsFromSnapshot) {
                    const walletIdx = snapshot.walletTokens.indexOf(pool.address);
                    const walletBalance = walletIdx !== -1 ? snapshot.walletBalances[walletIdx] : '0';
                    const gaugeIdx = snapshot.gauges.indexOf(pool.staking?.id || '');
                    const gaugeBalance = gaugeIdx !== -1 ? snapshot.gaugeBalances[gaugeIdx] : '0';
                    const farmIdx = snapshot.gauges.indexOf(pool.staking?.id || '');
                    const farmBalance = farmIdx !== -1 ? snapshot.farmBalances[farmIdx] : '0';
                    const totalBalanceScaled = parseUnits(walletBalance, 18)
                        .add(parseUnits(gaugeBalance, 18))
                        .add(parseUnits(farmBalance, 18));

                    if (parseFloat(formatFixed(totalBalanceScaled)) > 0) {
                        prismaInput.push({
                            id: `${pool.address}-${snapshot.id}`,
                            userBalanceSnapshotId: snapshot.id,
                            poolId: pool.id,
                            poolToken: pool.address,
                            walletBalance,
                            gaugeBalance,
                            farmBalance,
                            totalBalance: formatFixed(totalBalanceScaled),
                        });
                    }
                }

                await prisma.prismaUserPoolBalanceSnapshot.createMany({
                    data: prismaInput,
                });
            }
        }
    }

    public async loadAllUserSnapshotsForUsers(userIds?: string[]) {
        await this.syncLatestSnapshotsForUsers(-1, userIds);
    }

    public async getUserSnapshotsForPool(
        accountAddress: string,
        poolId: string,
        range: GqlUserSnapshotDataRange,
    ): Promise<UserPoolSnapshot[]> {
        const oldestRequestedSnapshotTimestamp = this.getTimestampForRange(range);

        const userBalanceSnapshotsForPoolInRange = await prisma.prismaUserBalanceSnapshot.findMany({
            where: {
                userAddress: accountAddress,
                timestamp: {
                    gte: oldestRequestedSnapshotTimestamp,
                },
                userPoolBalanceSnapshots: {
                    some: {
                        poolId: poolId,
                    },
                },
            },
            // select: {
            //     id: true,
            //     userAddress: true,
            //     timestamp: true,
            //     userPoolBalanceSnapshots: {
            //         select: {
            //             farmBalance: true,
            //             gaugeBalance: true,
            //             walletBalance: true,
            //             poolId: true,
            //             totalBalance: true,
            //             pool: {
            //                 select: {
            //                     snapshots: {
            //                         where: {
            //                             timestamp: {
            //                                 gte: oldestRequestedSnapshotTimestamp,
            //                             },
            //                         },
            //                     },
            //                 },
            //             },
            //         },
            //     },
            // },
            include: { userPoolBalanceSnapshots: true },
            // include: { userPoolBalanceSnapshots: {include: { pool: {include: {snapshots: true}}}} },
            orderBy: { timestamp: 'asc' },
        });

        if (userBalanceSnapshotsForPoolInRange.length === 0) {
            return [];
        }

        //oldest snapshot is not old enough, let's see if we find an older one
        if (userBalanceSnapshotsForPoolInRange[0].timestamp !== oldestRequestedSnapshotTimestamp) {
            const olderUserBalanceSnapshotsForPool = await prisma.prismaUserBalanceSnapshot.findFirst({
                where: {
                    userAddress: accountAddress,
                    timestamp: {
                        lt: oldestRequestedSnapshotTimestamp,
                    },
                    userPoolBalanceSnapshots: {
                        some: {
                            poolId: poolId,
                        },
                    },
                },
                include: { userPoolBalanceSnapshots: true },
                orderBy: { timestamp: 'desc' },
            });

            // found one, adjust timestamp and pool snapshots, else, we just don't have em
            if (olderUserBalanceSnapshotsForPool) {
                olderUserBalanceSnapshotsForPool.timestamp = oldestRequestedSnapshotTimestamp;
                olderUserBalanceSnapshotsForPool.id = `poolId-${olderUserBalanceSnapshotsForPool.userAddress}-${oldestRequestedSnapshotTimestamp}`;
                // put at the front of the array
                userBalanceSnapshotsForPoolInRange.unshift(olderUserBalanceSnapshotsForPool);
            }
        }

        const userPoolSnapshots = [];
        let userPoolSnapshotsCounter = 0;
        const secondsInADay = 86400;

        for (const snapshot of userBalanceSnapshotsForPoolInRange) {
            console.log(`Getting snapshot ${userPoolSnapshotsCounter} of ${userBalanceSnapshotsForPoolInRange.length}`);
            let snapshotToUse = snapshot;
            // use previous snapshot
            const currentProcessedTimestamp =
                oldestRequestedSnapshotTimestamp + userPoolSnapshotsCounter * secondsInADay;
            if (snapshot.timestamp !== currentProcessedTimestamp) {
                snapshotToUse = userBalanceSnapshotsForPoolInRange[userPoolSnapshotsCounter];
                snapshotToUse.timestamp = currentProcessedTimestamp;
                snapshotToUse.id = `poolId-${snapshotToUse.userAddress}-${currentProcessedTimestamp}`;
            }

            const poolSnapshotForTimestamp = await this.poolSnapshotService.getOrInferSnapshotForPool(
                poolId,
                currentProcessedTimestamp,
            );

            const percentShare = poolSnapshotForTimestamp
                ? parseFloat(snapshot.userPoolBalanceSnapshots[0].totalBalance) /
                  poolSnapshotForTimestamp.totalSharesNum
                : 0;

            userPoolSnapshots.push({
                id: snapshot.id,
                timestamp: snapshot.timestamp,
                walletBalance: snapshot.userPoolBalanceSnapshots[0].walletBalance,
                gaugeBalance: snapshot.userPoolBalanceSnapshots[0].gaugeBalance,
                farmBalance: snapshot.userPoolBalanceSnapshots[0].farmBalance,
                totalBalance: snapshot.userPoolBalanceSnapshots[0].totalBalance,
                percentShare: percentShare,
                totalValueUSD: `${
                    parseFloat(snapshot.userPoolBalanceSnapshots[0].totalBalance) *
                    (poolSnapshotForTimestamp?.sharePrice || 0)
                }`,
                fees24h: `${percentShare * (poolSnapshotForTimestamp?.fees24h || 0)}`,
            });
            userPoolSnapshotsCounter++;
        }

        return userPoolSnapshots;
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

    private getDaysForRange(range: GqlUserSnapshotDataRange): number {
        switch (range) {
            case 'THIRTY_DAYS':
                return 30;
            case 'NINETY_DAYS':
                return 90;
            case 'ONE_HUNDRED_EIGHTY_DAYS':
                return 180;
            case 'ONE_YEAR':
                return 365;
            case 'ALL_TIME':
                return -1;
        }
    }
}
