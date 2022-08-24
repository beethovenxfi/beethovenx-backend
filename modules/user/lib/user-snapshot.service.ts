import { UserSnapshotSubgraphService } from '../../subgraphs/user-snapshot-subgraph/user-snapshot-subgraph.service';
import _ from 'lodash';
import { prisma } from '../../../prisma/prisma-client';
import { parseUnits } from 'ethers/lib/utils';
import { formatFixed } from '@ethersproject/bignumber';
import moment from 'moment-timezone';
import {
    OrderDirection,
    UserBalanceSnapshot_OrderBy,
} from '../../subgraphs/user-snapshot-subgraph/generated/user-snapshot-subgraph-types';
import { UserPortfolioSnapshot, UserPoolSnapshot } from '../user-types';

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

    public async getPoolSnapshots(accountAddress: string, poolId: string, days: number): Promise<UserPoolSnapshot[]> {
        const timestamp = moment().utc().startOf('day').subtract(days, 'days').unix();
        const pool = await prisma.prismaPool.findUniqueOrThrow({ where: { id: poolId }, include: { staking: true } });
        const { snapshots } = await this.userSnapshotSubgraphService.userBalanceSnapshots({
            where: { user: accountAddress },
            orderBy: UserBalanceSnapshot_OrderBy.Timestamp,
            orderDirection: OrderDirection.Asc,
        });

        const userSnapshots = snapshots.map((snapshot) => {
            const bptIdx = snapshot.walletTokens.indexOf(pool.address);
            const walletBalance = bptIdx !== -1 ? snapshot.walletBalances[bptIdx] : '0';
            const gaugeIdx = snapshot.gauges.indexOf(pool.staking?.id || '');
            const gaugeBalance = gaugeIdx !== -1 ? snapshot.gaugeBalances[gaugeIdx] : '0';
            const farmIdx = snapshot.gauges.indexOf(pool.staking?.id || '');
            const farmBalance = farmIdx !== -1 ? snapshot.farmBalances[farmIdx] : '0';
            const totalBalanceScaled = parseUnits(walletBalance, 18)
                .add(parseUnits(gaugeBalance, 18))
                .add(parseUnits(farmBalance, 18));

            return {
                id: snapshot.id,
                timestamp: snapshot.timestamp,
                walletBalance,
                gaugeBalance,
                farmBalance,
                totalBalance: formatFixed(totalBalanceScaled, 18),
            };
        });

        const hasNonZeroSnapshot = userSnapshots.filter((snapshot) => parseFloat(snapshot.totalBalance) > 0).length > 0;

        if (!hasNonZeroSnapshot) {
            return [];
        }

        const poolSnapshots = await prisma.prismaPoolSnapshot.findMany({
            where: { poolId, timestamp: { gte: timestamp } },
        });

        return _.times(days, (index) => {
            const currentTimestamp = timestamp + index * 86400;
            const userSnapshot = this.getUserPoolSnapshotForTimestamp(userSnapshots, currentTimestamp);
            const poolSnapshot = poolSnapshots.find((poolSnapshot) => poolSnapshot.timestamp === currentTimestamp);
            const userBalance = parseFloat(userSnapshot.totalBalance);
            const percentShare = poolSnapshot ? userBalance / poolSnapshot.totalSharesNum : 0;

            return {
                id: `${accountAddress}-${currentTimestamp}`,
                timestamp: currentTimestamp,
                percentShare,
                walletBalance: userSnapshot?.walletBalance,
                gaugeBalance: userSnapshot?.gaugeBalance,
                farmBalance: userSnapshot?.farmBalance,
                totalBalance: userSnapshot?.totalBalance,
                totalValueUSD: `${parseFloat(userSnapshot.totalBalance) * (poolSnapshot?.sharePrice || 0)}`,
                fees24h: `${percentShare * (poolSnapshot?.fees24h || 0)}`,
                volume24h: `${percentShare * (poolSnapshot?.volume24h || 0)}`,
            };
        });
    }

    //snapshots expected to be ordered ASC
    private getUserPoolSnapshotForTimestamp(
        snapshots: SubgraphUserSnapshot[],
        timestamp: number,
    ): {
        id: string;
        timestamp: number;
        walletBalance: string;
        farmBalance: string;
        gaugeBalance: string;
        totalBalance: string;
    } {
        for (let i = snapshots.length - 1; i >= 0; i--) {
            if (snapshots[i].timestamp <= timestamp) {
                return snapshots[i];
            }
        }

        return {
            id: 'empty',
            timestamp,
            walletBalance: '0',
            farmBalance: '0',
            gaugeBalance: '0',
            totalBalance: '0',
        };
    }
}
