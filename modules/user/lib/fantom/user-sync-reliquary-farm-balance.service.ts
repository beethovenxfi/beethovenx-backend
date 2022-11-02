import { isSameAddress } from '@balancer-labs/sdk';
import { formatFixed } from '@ethersproject/bignumber';
import { BigNumber, Event } from 'ethers';
import _ from 'lodash';
import { prisma } from '../../../../prisma/prisma-client';
import { prismaBulkExecuteOperations } from '../../../../prisma/prisma-util';
import { AmountHumanReadable } from '../../../common/global-types';
import { networkConfig } from '../../../config/network-config';
import { reliquaryService } from '../../../subgraphs/reliquary-subgraph/reliquary.service';
import ReliquaryAbi from '../../../web3/abi/Reliquary.json';
import { getContractAt, jsonRpcProvider } from '../../../web3/contract';
import { Multicaller } from '../../../web3/multicaller';
import { Reliquary } from '../../../web3/types/Reliquary';
import { UserStakedBalanceService, UserSyncUserBalanceInput } from '../../user-types';

type ReliquaryPosition = {
    amount: BigNumber;
    rewardDebt: BigNumber;
    rewardCredit: BigNumber;
    entry: BigNumber;
    poolId: BigNumber;
    level: BigNumber;
    genesis: BigNumber;
    lastMaturityBonus: BigNumber;
};

type BalanceChangedEvent = Event & {
    args: {
        pid: BigNumber;
        amount: BigNumber;
        to: string;
        relicId: BigNumber;
    };
};

type RelicManagementEvent = Event & {
    args: {
        fromId: BigNumber;
        toId: string;
        amount: BigNumber;
    };
};

type TransferEvent = Event & {
    args: {
        from: string;
        to: string;
        tokenId: BigNumber;
    };
};

export class UserSyncReliquaryFarmBalanceService implements UserStakedBalanceService {
    constructor() {}

    public async syncChangedStakedBalances(): Promise<void> {
        const status = await prisma.prismaUserBalanceSyncStatus.findUnique({ where: { type: 'RELIQUARY' } });

        if (!status) {
            throw new Error('UserReliquaryFarmBalanceService: syncStakedBalances called before initStakedBalances');
        }

        const pools = await prisma.prismaPool.findMany({ include: { staking: true } });
        const latestBlock = await jsonRpcProvider.getBlockNumber();
        const farms = await reliquaryService.getAllFarms({});

        const startBlock = status.blockNumber + 1;
        const endBlock = latestBlock - startBlock > 10_000 ? startBlock + 10_000 : latestBlock;
        const amountUpdates = await this.getAmountsForUsersWithBalanceChangesSinceStartBlock(
            networkConfig.masterchef.address,
            startBlock,
            endBlock,
        );
        const userAddresses = _.uniq(amountUpdates.map((update) => update.userAddress));

        if (amountUpdates.length === 0) {
            await prisma.prismaUserBalanceSyncStatus.update({
                where: { type: 'RELIQUARY' },
                data: { blockNumber: endBlock },
            });

            return;
        }

        await prismaBulkExecuteOperations(
            [
                prisma.prismaUser.createMany({
                    data: userAddresses.map((userAddress) => ({ address: userAddress })),
                    skipDuplicates: true,
                }),
                ...amountUpdates.map((update) => {
                    const pool = pools.find((pool) => pool.staking?.id === update.farmId);
                    const farm = farms.find((farm) => farm.id === update.farmId);

                    return prisma.prismaUserStakedBalance.upsert({
                        where: { id: `reliquary-${update.farmId}-${update.userAddress}` },
                        update: {
                            balance: update.amount,
                            balanceNum: parseFloat(update.amount),
                        },
                        create: {
                            id: `${update.farmId}-${update.userAddress}`,
                            balance: update.amount,
                            balanceNum: parseFloat(update.amount),
                            userAddress: update.userAddress,
                            poolId: pool!.id,
                            tokenAddress: farm!.poolTokenAddress,
                            stakingId: update.farmId,
                        },
                    });
                }),
                prisma.prismaUserBalanceSyncStatus.update({
                    where: { type: 'RELIQUARY' },
                    data: { blockNumber: endBlock },
                }),
            ],
            true,
        );
    }

    public async initStakedBalances(): Promise<void> {
        const { block } = await reliquaryService.getMetadata();
        console.log('initStakedReliquaryBalances: loading subgraph relics...');
        const relics = await reliquaryService.getAllRelics({});
        console.log('initStakedReliquaryBalances: finished loading subgraph relics...');
        console.log('initStakedReliquaryBalances: loading pools...');
        const pools = await prisma.prismaPool.findMany({ select: { id: true, address: true } });
        console.log('initStakedReliquaryBalances: finished loading pools...');
        const userAddresses = _.uniq(relics.map((relic) => relic.userAddress.toLowerCase()));

        console.log('initStakedReliquaryBalances: performing db operations...');

        await prismaBulkExecuteOperations(
            [
                prisma.prismaUser.createMany({
                    data: userAddresses.map((userAddress) => ({ address: userAddress })),
                    skipDuplicates: true,
                }),
                prisma.prismaUserStakedBalance.deleteMany({}),
                prisma.prismaUserStakedBalance.createMany({
                    data: relics.map((relic) => {
                        const pool = pools.find((pool) => isSameAddress(pool.address, relic.pool.poolTokenAddress));

                        return {
                            id: relic.id,
                            balance: formatFixed(relic.balance, 18),
                            balanceNum: parseFloat(formatFixed(relic.balance, 18)),
                            userAddress: relic.userAddress,
                            poolId: pool?.id,
                            tokenAddress: relic.pool.poolTokenAddress,
                            stakingId: `${relic.pid}`,
                        };
                    }),
                }),
                prisma.prismaUserBalanceSyncStatus.upsert({
                    where: { type: 'RELIQUARY' },
                    create: { type: 'RELIQUARY', blockNumber: block.number },
                    update: { blockNumber: block.number },
                }),
            ],
            true,
        );

        console.log('initStakedReliquaryBalances: finished...');
    }

    public async syncUserBalance({ userAddress, poolId, poolAddress, staking }: UserSyncUserBalanceInput) {
        if (staking.type !== 'RELIQUARY') {
            return;
        }
        const reliquary: Reliquary = getContractAt(networkConfig.reliquary.address, ReliquaryAbi);
        const relicPositions = await reliquary.relicPositionsOfOwner(userAddress);

        const relicIds = relicPositions[0];
        const positions = relicPositions[1];
        for (let i = 0; i < relicIds.length; i++) {
            if (positions[i].poolId.toString() !== poolId) {
                continue;
            }

            const amountStaked = formatFixed(positions[i].amount, 18);
            await prisma.prismaUserStakedBalance.upsert({
                where: { id: `reliquary-${staking.id}-${userAddress}` },
                update: {
                    balance: amountStaked,
                    balanceNum: parseFloat(amountStaked),
                },
                create: {
                    id: `reliquary-${staking.id}-${userAddress}`,
                    balance: amountStaked,
                    balanceNum: parseFloat(amountStaked),
                    userAddress,
                    poolId: poolId,
                    tokenAddress: poolAddress,
                    stakingId: staking.id,
                },
            });
        }
    }

    private async getAmountsForUsersWithBalanceChangesSinceStartBlock(
        reliquaryAddress: string,
        startBlock: number,
        endBlock: number,
    ): Promise<{ farmId: string; userAddress: string; amount: AmountHumanReadable }[]> {
        const contract: Reliquary = getContractAt(reliquaryAddress, ReliquaryAbi);

        const events = await contract.queryFilter({ address: reliquaryAddress }, startBlock, endBlock);
        const balanceChangedEvents = events.filter((event) =>
            ['Deposit', 'Withdraw', 'EmergencyWithdraw'].includes(event.event!),
        ) as BalanceChangedEvent[];
        const relicManagementEvents = events.filter((event) =>
            ['Split', 'Shift'].includes(event.event!),
        ) as RelicManagementEvent[];
        const transferEvents = events.filter((event) => event.event === 'Transfer') as TransferEvent[];

        const multicall = new Multicaller(networkConfig.multicall, jsonRpcProvider, ReliquaryAbi);

        // for the transfer events, we know which users are affected
        const affetedUsers = transferEvents.flatMap((event) => [event.args.from, event.args.to]);
        // for the other events, we need to find the owners of the affected relicIds
        const affectedRelicIds = [
            ...balanceChangedEvents.map((event) => event.args.relicId),
            relicManagementEvents.flatMap((event) => [event.args.fromId, event.args.toId]),
        ];

        affectedRelicIds.forEach((relicId, index) => {
            multicall.call(`users[${index}]`, reliquaryAddress, 'ownerOf', [relicId]);
        });
        let ownerResult: { users: string[] } = await multicall.execute();
        affetedUsers.push(...ownerResult.users);

        affetedUsers.forEach((userAddress) => {
            multicall.call(userAddress, reliquaryAddress, 'relicPositionsOfOwner', [userAddress]);
        });

        // we get a tuple with an array of relicIds and the corresponding positions array
        const updatedPositions: { [userAddress: string]: [BigNumber[], ReliquaryPosition[]] } =
            await multicall.execute();
        // for each user we have to sum up all balances of a specific farm, so we key on user + farmId
        const userFarmBalances: {
            [userFarm: string]: { userAddress: string; farmId: string; amount: BigNumber };
        } = {};

        // we only care for the user address and all positions, we can ignore the relicIds array
        Object.entries(updatedPositions).forEach(([userAddress, [relicIds, positions]]) => {
            positions.forEach((position) => {
                const key = `${userAddress}-${position.poolId}`;
                if (key in userFarmBalances) {
                    userFarmBalances[key].amount = userFarmBalances[key].amount.add(position.amount);
                } else {
                    userFarmBalances[key] = {
                        userAddress,
                        farmId: position.poolId.toString(),
                        amount: position.amount,
                    };
                }
            });
        });
        return Object.values(userFarmBalances).map((userFarmBalance) => ({
            ...userFarmBalance,
            amount: formatFixed(userFarmBalance.amount, 18),
        }));
    }
}
