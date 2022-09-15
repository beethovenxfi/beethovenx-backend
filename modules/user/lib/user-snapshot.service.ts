import { UserSnapshotSubgraphService } from '../../subgraphs/user-snapshot-subgraph/user-snapshot-subgraph.service';
import { prisma } from '../../../prisma/prisma-client';
import { parseUnits } from 'ethers/lib/utils';
import moment from 'moment-timezone';
import { UserPortfolioSnapshot, UserPoolSnapshot } from '../user-types';
import { GqlUserSnapshotDataRange } from '../../../schema';
import { PoolSnapshotService } from '../../pool/lib/pool-snapshot.service';
import { formatFixed } from '@ethersproject/bignumber';
import { UserBalanceSnapshotsQuery } from '../../subgraphs/user-snapshot-subgraph/generated/user-snapshot-subgraph-types';
import { networkConfig } from '../../config/network-config';

export class UserSnapshotService {
    private readonly SECONDS_IN_DAY: number = 86400;

    constructor(
        private readonly userSnapshotSubgraphService: UserSnapshotSubgraphService,
        private readonly poolSnapshotService: PoolSnapshotService,
    ) {}

    public async getPortfolioSnapshots(accountAddress: string, numDays: number): Promise<UserPortfolioSnapshot[]> {
        throw new Error('Method not implemented.');
    }

    public async syncUserSnapshots() {
        // sync all snapshots that we have stored
    }

    public async getUserSnapshotsForPool(
        userAddress: string,
        poolId: string,
        range: GqlUserSnapshotDataRange,
    ): Promise<UserPoolSnapshot[]> {
        const oldestRequestedSnapshotTimestamp = this.getTimestampForRange(range);

        // TODO this now has a snapshot for every day since pool launch and lots of 0 snapshots at the front.
        // need to only get snapshots after user has entered pool
        let storedUserSnapshotsFromRange = await this.getStoredSnapshotsForUserForPoolFromTimestamp(
            userAddress,
            oldestRequestedSnapshotTimestamp,
            poolId,
        );

        if (storedUserSnapshotsFromRange.length === 0) {
            // probably not good to get ALL and persist ALL, lots of data
            const userSnapshotsFromSubgraphForAllPools =
                await this.userSnapshotSubgraphService.getUserBalanceSnapshotsWithPaging(
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
            const userSnapshotsForPools = userSnapshotsFromSubgraphForAllPools.snapshots.filter((snapshot) => {
                if (pool.staking) {
                    return (
                        snapshot.walletTokens.includes(pool.address) ||
                        snapshot.farms.includes(pool.staking?.id) ||
                        snapshot.gauges.includes(pool.staking?.id)
                    );
                }
                return snapshot.walletTokens.includes(pool.address);
            });
            userSnapshotsFromSubgraphForAllPools.snapshots = userSnapshotsForPools;

            if (userSnapshotsFromSubgraphForAllPools.snapshots.length === 0) {
                return [];
            }

            // need to fill in missing snapshots (doesn't work to infer up to NOW)
            const userSnapshotsToPersist: UserBalanceSnapshotsQuery = {
                snapshots: [],
            };

            /*
                option to skip first! 
                const prevTotalSwapVolume = index === 0 ? startTotalSwapVolume : snapshots[index - 1].totalSwapVolume;
                const prevTotalSwapFee = index === 0 ? startTotalSwapFee : snapshots[index - 1].totalSwapFee;
            */
            userSnapshotsToPersist.snapshots.push(userSnapshotsFromSubgraphForAllPools.snapshots[0]);
            let firstIteration = true;
            for (const snapshot of userSnapshotsFromSubgraphForAllPools.snapshots) {
                if (firstIteration) {
                    firstIteration = false;
                    continue;
                }
                while (
                    userSnapshotsToPersist.snapshots[userSnapshotsToPersist.snapshots.length - 1].timestamp +
                        this.SECONDS_IN_DAY <
                    snapshot.timestamp
                ) {
                    //need to infer from last snapshot
                    const lastSnapshot = userSnapshotsToPersist.snapshots[userSnapshotsToPersist.snapshots.length - 1];
                    userSnapshotsToPersist.snapshots.push({
                        id: `${userAddress}-${lastSnapshot.timestamp + this.SECONDS_IN_DAY}`,
                        timestamp: lastSnapshot.timestamp + this.SECONDS_IN_DAY,
                        user: {
                            id: userAddress,
                        },
                        walletTokens: lastSnapshot.walletTokens,
                        walletBalances: lastSnapshot.walletBalances,
                        farms: lastSnapshot.farms,
                        farmBalances: lastSnapshot.farmBalances,
                        gauges: lastSnapshot.gauges,
                        gaugeBalances: lastSnapshot.gaugeBalances,
                    });
                }
                userSnapshotsToPersist.snapshots.push(snapshot);
            }
            // TODO or up to the day before??
            // check if we need to infer up to today (or up to yesterday??)
            while (
                userSnapshotsToPersist.snapshots[userSnapshotsToPersist.snapshots.length - 1].timestamp <
                moment().startOf('day').unix()
            ) {
                const lastSnapshot = userSnapshotsToPersist.snapshots[userSnapshotsToPersist.snapshots.length - 1];
                userSnapshotsToPersist.snapshots.push({
                    id: `${userAddress}-${lastSnapshot.timestamp + this.SECONDS_IN_DAY}`,
                    timestamp: lastSnapshot.timestamp + this.SECONDS_IN_DAY,
                    user: {
                        id: userAddress,
                    },
                    walletTokens: lastSnapshot.walletTokens,
                    walletBalances: lastSnapshot.walletBalances,
                    farms: lastSnapshot.farms,
                    farmBalances: lastSnapshot.farmBalances,
                    gauges: lastSnapshot.gauges,
                    gaugeBalances: lastSnapshot.gaugeBalances,
                });
            }
            await this.enrichAndPersistSnapshotsForPool(userSnapshotsToPersist, poolId);
        }

        storedUserSnapshotsFromRange = await this.getStoredSnapshotsForUserForPoolFromTimestamp(
            userAddress,
            oldestRequestedSnapshotTimestamp,
            poolId,
        );

        return storedUserSnapshotsFromRange.map((snapshot) => ({
            id: snapshot.id,
            timestamp: snapshot.timestamp,
            walletBalance: snapshot.userPoolBalanceSnapshots[0].walletBalance,
            farmBalance: snapshot.userPoolBalanceSnapshots[0].farmBalance,
            fees24h: snapshot.userPoolBalanceSnapshots[0].fees24h,
            gaugeBalance: snapshot.userPoolBalanceSnapshots[0].gaugeBalance,
            percentShare: parseFloat(snapshot.userPoolBalanceSnapshots[0].percentShare),
            totalBalance: snapshot.userPoolBalanceSnapshots[0].totalBalance,
            totalValueUSD: snapshot.userPoolBalanceSnapshots[0].totalValueUSD,
        }));
    }

    private async enrichAndPersistSnapshotsForPool(
        userBalanceSnapshotsQuery: UserBalanceSnapshotsQuery,
        poolId: string,
    ) {
        const { snapshots: userBalanceSnapshots } = userBalanceSnapshotsQuery;

        // make sure users exists
        await prisma.prismaUser.upsert({
            where: { address: userBalanceSnapshots[0].user.id },
            update: {},
            create: { address: userBalanceSnapshots[0].user.id },
        });

        await prisma.prismaUserBalanceSnapshot.createMany({
            data: userBalanceSnapshots.map((snapshot) => {
                return {
                    id: snapshot.id,
                    userAddress: snapshot.user.id.toLowerCase(),
                    timestamp: snapshot.timestamp,
                };
            }),
            skipDuplicates: true,
        });

        const poolInSnapshots = await prisma.prismaPool.findUniqueOrThrow({
            where: {
                id: poolId,
            },
            include: {
                staking: true,
            },
        });

        const prismaInput = [];
        for (const snapshot of userBalanceSnapshots) {
            const poolSnapshotForTimestamp = await this.poolSnapshotService.getOrInferSnapshotForPool(
                poolId,
                snapshot.timestamp,
            );

            const walletIdx = snapshot.walletTokens.indexOf(poolInSnapshots.address);
            const walletBalance = walletIdx !== -1 ? snapshot.walletBalances[walletIdx] : '0';
            const gaugeIdx = snapshot.gauges.indexOf(poolInSnapshots.staking?.id || '');
            const gaugeBalance = gaugeIdx !== -1 ? snapshot.gaugeBalances[gaugeIdx] : '0';
            const farmIdx = snapshot.farms.indexOf(poolInSnapshots.staking?.id || '');
            const farmBalance = farmIdx !== -1 ? snapshot.farmBalances[farmIdx] : '0';
            const totalBalanceScaled = parseUnits(walletBalance, 18)
                .add(parseUnits(gaugeBalance, 18))
                .add(parseUnits(farmBalance, 18));

            const percentShare =
                parseFloat(formatFixed(totalBalanceScaled, 18)) / poolSnapshotForTimestamp.totalSharesNum;

            prismaInput.push({
                id: `${poolInSnapshots.address}-${snapshot.id}`,
                userBalanceSnapshotId: snapshot.id,
                poolId: poolInSnapshots.id,
                poolToken: poolInSnapshots.address,
                walletBalance,
                gaugeBalance,
                farmBalance,
                percentShare: `${percentShare}`,
                totalBalance: formatFixed(totalBalanceScaled, 18),
                totalValueUSD: `${
                    parseFloat(formatFixed(totalBalanceScaled, 18)) * (poolSnapshotForTimestamp?.sharePrice || 0)
                }`,
                fees24h: `${
                    percentShare *
                    (poolSnapshotForTimestamp?.fees24h || 0) *
                    (1 - networkConfig.balancer.protocolFeePercent)
                }`,
            });
        }
        await prisma.prismaUserPoolBalanceSnapshot.createMany({
            data: prismaInput,
        });
    }

    private async getStoredSnapshotsForUserForPoolFromTimestamp(
        userAddress: string,
        oldestRequestedSnapshotTimestamp: number,
        poolId: string,
    ) {
        return await prisma.prismaUserBalanceSnapshot.findMany({
            where: {
                userAddress: userAddress,
                timestamp: {
                    gte: oldestRequestedSnapshotTimestamp,
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
