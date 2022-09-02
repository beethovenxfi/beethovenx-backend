import { UserSnapshotSubgraphService } from '../../subgraphs/user-snapshot-subgraph/user-snapshot-subgraph.service';
import _, { gte } from 'lodash';
import { prisma } from '../../../prisma/prisma-client';
import { parseUnits } from 'ethers/lib/utils';
import { formatFixed } from '@ethersproject/bignumber';
import moment from 'moment-timezone';
import {
    OrderDirection,
    UserBalanceSnapshot_OrderBy,
} from '../../subgraphs/user-snapshot-subgraph/generated/user-snapshot-subgraph-types';
import { UserPortfolioSnapshot, UserPoolSnapshot } from '../user-types';
import { GqlUserSnapshotDataRange } from '../../../schema';
import { PrismaUserBalanceSnapshot, PrismaUserPoolBalanceSnapshots } from '@prisma/client';

interface SubgraphUserSnapshot {
    id: string;
    timestamp: number;
    walletBalance: string;
    gaugeBalance: string;
    farmBalance: string;
    totalBalance: string;
}

export class UserSnapshotService {
    constructor(private readonly userSnapshotSubgraphService: UserSnapshotSubgraphService) {}

    public async getPortfolioSnapshots(accountAddress: string, numDays: number): Promise<UserPortfolioSnapshot[]> {
        throw new Error('Method not implemented.');
    }

    public async syncLatestSnapshotsForUsers(daysToSync: number = 1, userAddresses: string[] = []) {
        let userAddressesToSync = userAddresses;
        if (userAddressesToSync.length === 0) {
            const usersWithBalances = await prisma.prismaUser.findMany({
                include: {
                    walletBalances: { where: { poolId: { not: null }, balanceNum: { gt: 0 } } },
                    stakedBalances: {
                        where: { poolId: { not: null }, balanceNum: { gt: 0 } },
                    },
                },
            });

            userAddressesToSync = usersWithBalances
                .filter((user) => user.stakedBalances.length > 0 || user.walletBalances.length > 0)
                .map((user) => user.address);
        }

        let syncFromTimestamp = 0;
        if (daysToSync > 0) {
            syncFromTimestamp = moment().utc().startOf('day').subtract(daysToSync, 'days').unix();
        }

        for (const userId of userAddressesToSync) {
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

            for (const snapshot of subgraphUserBalanceSnapshots) {
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

                const prismaInput = [];
                for (const pool of allPoolsFromSnapshot) {
                    const bptIdx = snapshot.walletTokens.indexOf(pool.address);
                    const walletBalance = bptIdx !== -1 ? snapshot.walletBalances[bptIdx] : '0';
                    const gaugeIdx = snapshot.gauges.indexOf(pool.staking?.id || '');
                    const gaugeBalance = gaugeIdx !== -1 ? snapshot.gaugeBalances[gaugeIdx] : '0';
                    const farmIdx = snapshot.gauges.indexOf(pool.staking?.id || '');
                    const farmBalance = farmIdx !== -1 ? snapshot.farmBalances[farmIdx] : '0';
                    const totalBalanceScaled = parseUnits(walletBalance, 18)
                        .add(parseUnits(gaugeBalance, 18))
                        .add(parseUnits(farmBalance, 18));

                    if (totalBalanceScaled.toNumber() > 0) {
                        prismaInput.push({
                            id: `${pool.address}-${snapshot.id}`,
                            userBalanceSnapshotId: snapshot.id,
                            poolId: pool.id,
                            walletBalance,
                            gaugeBalance,
                            farmBalance,
                            totalBalance: totalBalanceScaled.toString(),
                        });
                    }
                }

                await prisma.prismaUserPoolBalanceSnapshots.createMany({
                    data: prismaInput,
                });
            }

            await prisma.prismaUserBalanceSnapshot.createMany({
                data: subgraphUserBalanceSnapshots.map((snapshot) => {
                    return {
                        id: snapshot.id,
                        userAddress: snapshot.user.id.toLowerCase(),
                        timestamp: snapshot.timestamp,
                        walletTokens: snapshot.walletTokens.map((token) => token.toLowerCase()),
                        walletBalances: snapshot.walletBalances,
                        gauges: snapshot.gauges,
                        gaugeBalances: snapshot.gaugeBalances,
                        farms: snapshot.farms,
                        farmBalances: snapshot.farmBalances,
                    };
                }),
                skipDuplicates: true,
            });
        }
    }

    public async loadAllUserSnapshotsForUsers(userIds: string[]) {
        this.syncLatestSnapshotsForUsers(-1, userIds);
    }

    public async getUserSnapshotsForPool(
        accountAddress: string,
        poolId: string,
        range: GqlUserSnapshotDataRange,
    ): Promise<UserPoolSnapshot[]> {
        const firstRequestedSnapshotTimestamp = this.getTimestampForRange(range);
        const numberOfDays = this.getDaysForRange(range);

        const allUserBalanceSnapshotsForPool = await prisma.prismaUserBalanceSnapshot.findMany({
            where: {
                userAddress: accountAddress,
                timestamp: {
                    gte: firstRequestedSnapshotTimestamp,
                },
                userPoolBalanceSnapshots: {
                    some: {
                        poolId: poolId,
                    },
                },
            },
            include: { userPoolBalanceSnapshots: true },
            orderBy: { timestamp: 'asc' },
        });

        if (allUserBalanceSnapshotsForPool.length === 0) {
            return [];
        }

        const userPoolSnapshots = [];

        for (const snapshot of allUserBalanceSnapshotsForPool) {
            const poolSnapshotForTimestamp = await prisma.prismaPoolSnapshot.findFirst({
                where: { poolId, timestamp: snapshot.timestamp },
            });

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
        }

        return userPoolSnapshots;

        // const poolSnapshotsForTimeRange = await prisma.prismaPoolSnapshot.findMany({
        //     where: { poolId, timestamp: { gte: firstRequestedSnapshotTimestamp } },
        // });

        // //gotta make sure we have snapshots for the past x days, probably need to infer from the latest we have
        // // could be that there is only one snapshot if the user didn't do anything for a while
        // // probably unusual that a user has a snapshot every day
        // return _.times(numberOfDays, (index) => {
        //     const currentTimestamp = firstRequestedSnapshotTimestamp + index * 86400;
        //     const userSnapshot = this.getUserPoolSnapshotForTimestamp(allUserBalanceSnapshotsForPool, currentTimestamp);
        //     const poolSnapshot = poolSnapshotsForTimeRange.find(
        //         (poolSnapshot) => poolSnapshot.timestamp === currentTimestamp,
        //     );
        //     const userBalance = parseFloat(userSnapshot.totalBalance);
        //     const percentShare = poolSnapshot ? userBalance / poolSnapshot.totalSharesNum : 0;

        //     return {
        //         id: `${accountAddress}-${currentTimestamp}`,
        //         timestamp: currentTimestamp,
        //         percentShare,
        //         walletBalance: userSnapshot?.walletBalance,
        //         gaugeBalance: userSnapshot?.gaugeBalance,
        //         farmBalance: userSnapshot?.farmBalance,
        //         totalBalance: userSnapshot?.totalBalance,
        //         totalValueUSD: `${parseFloat(userSnapshot.totalBalance) * (poolSnapshot?.sharePrice || 0)}`,
        //         fees24h: `${percentShare * (poolSnapshot?.fees24h || 0)}`,
        //         volume24h: `${percentShare * (poolSnapshot?.volume24h || 0)}`,
        //     };
        // });
    }

    // //snapshots expected to be ordered ASC
    // private getUserPoolSnapshotForTimestamp(
    //     snapshot: PrismaUserBalanceSnapshot,
    //     timestamp: number,
    // ): {
    //     id: string;
    //     timestamp: number;
    //     walletBalance: string;
    //     farmBalance: string;
    //     gaugeBalance: string;
    //     totalBalance: string;
    // } {
    //     for (let i = snapshot..length - 1; i >= 0; i--) {
    //         if (snapshots[i].timestamp <= timestamp) {
    //             return snapshots[i];
    //         }
    //     }

    //     return {
    //         id: 'empty',
    //         timestamp,
    //         walletBalance: '0',
    //         farmBalance: '0',
    //         gaugeBalance: '0',
    //         totalBalance: '0',
    //     };
    // }

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
