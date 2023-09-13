import { PoolStakingService } from '../../pool-types';
import { prisma } from '../../../../prisma/prisma-client';
import { prismaBulkExecuteOperations } from '../../../../prisma/prisma-util';
import { Chain, PrismaPoolStakingType } from '@prisma/client';
import { networkContext } from '../../../network/network-context.service';
import { GaugeSubgraphService, LiquidityGaugeStatus } from '../../../subgraphs/gauge-subgraph/gauge-subgraph.service';
import { formatUnits } from 'ethers/lib/utils';
import { getContractAt } from '../../../web3/contract';
import childChainGaugeV2Abi from './abi/ChildChainGaugeV2.json';
import childChainGaugeV1Abi from './abi/ChildChainGaugeV1.json';
import moment from 'moment';
import { BigNumber, formatFixed } from '@ethersproject/bignumber';
import { Multicaller3 } from '../../../web3/multicaller3';
import * as emissions from './bal-emissions';
import _ from 'lodash';

interface GaugeRate {
    /** 1 for old gauges, 2 for gauges receiving cross chain BAL rewards */
    version: number;
    /** BAL per second received by the gauge */
    rate: string;
    // Amount of tokens staked in the gauge
    workingSupply: string;
}

export class GaugeStakingService implements PoolStakingService {
    private balAddress: string;

    constructor(private readonly gaugeSubgraphService: GaugeSubgraphService, balAddress: string) {
        this.balAddress = balAddress.toLowerCase();
    }

    async syncStakingForPools(): Promise<void> {
        const pools = await prisma.prismaPool.findMany({
            where: { chain: networkContext.chain },
        });
        const poolIds = pools.map((pool) => pool.id);

        const { pools: subgraphPoolsWithGauges } = await this.gaugeSubgraphService.getPoolsWithGauges(poolIds);

        const operations: any[] = [];

        const allGaugeAddresses = subgraphPoolsWithGauges.map((pool) => pool.gaugesList).flat();

        const childChainGaugeInfo = await (
            networkContext.chain === Chain.MAINNET
                ? this.getMainnetGaugeRates(allGaugeAddresses)
                : this.getChildChainGaugeInfo(allGaugeAddresses)
        );

        for (const gaugePool of subgraphPoolsWithGauges) {
            const pool = pools.find((pool) => pool.id === gaugePool.poolId);
            if (!pool) {
                continue;
            }
            if (gaugePool.gauges) {
                for (const gauge of gaugePool.gauges) {
                    // we need to set the status based on the preferentialGauge entity on the gaugePool. If it's set there, it's preferential, otherwise it's active (or killed)
                    let gaugeStatus: LiquidityGaugeStatus = 'PREFERRED';
                    if (gauge.isKilled) {
                        gaugeStatus = 'KILLED';
                    } else if (gaugePool.preferentialGauge?.id !== gauge.id) {
                        gaugeStatus = 'ACTIVE';
                    }

                    operations.push(
                        prisma.prismaPoolStaking.upsert({
                            where: { id_chain: { id: gauge.id, chain: networkContext.chain } },
                            create: {
                                id: gauge.id,
                                chain: networkContext.chain,
                                poolId: pool.id,
                                type: 'GAUGE',
                                address: gauge.id,
                            },
                            update: {},
                        }),
                    );

                    const gaugeVersion = childChainGaugeInfo[gauge.id] ? childChainGaugeInfo[gauge.id].version : 1;

                    operations.push(
                        prisma.prismaPoolStakingGauge.upsert({
                            where: { id_chain: { id: gauge.id, chain: networkContext.chain } },
                            create: {
                                id: gauge.id,
                                stakingId: gauge.id,
                                gaugeAddress: gauge.id,
                                chain: networkContext.chain,
                                status: gaugeStatus,
                                version: gaugeVersion,
                            },
                            update: {
                                status: gaugeStatus,
                                version: gaugeVersion,
                                workingSupply: childChainGaugeInfo[gauge.id].workingSupply,
                            },
                        }),
                    );

                    // Add BAL as a reward token for the v2 gauge
                    // need to add '-0' to the ID because it get's split by that further down.
                    if (gaugeVersion === 2) {
                        if (gauge.tokens) {
                            gauge.tokens.push({
                                id: `${this.balAddress}-0`,
                                decimals: 18,
                                symbol: 'BAL',
                                rate: childChainGaugeInfo[gauge.id].rate,
                            });
                        } else {
                            gauge.tokens = [
                                {
                                    id: `${this.balAddress}-0`,
                                    decimals: 18,
                                    symbol: 'BAL',
                                    rate: childChainGaugeInfo[gauge.id].rate,
                                },
                            ];
                        }
                    }
                    if (gauge.tokens) {
                        const rewardTokens = await prisma.prismaToken.findMany({
                            where: {
                                address: { in: gauge.tokens.map((token) => token.id.split('-')[0].toLowerCase()) },
                                chain: networkContext.chain,
                            },
                        });
                        for (let rewardToken of gauge.tokens) {
                            const tokenAddress = rewardToken.id.split('-')[0].toLowerCase();
                            const token = rewardTokens.find((token) => token.address === tokenAddress);
                            if (!token) {
                                console.error(
                                    `Could not find reward token (${tokenAddress}) in DB for gauge ${gauge.id} of pool ${pool.id}`,
                                );
                                continue;
                            }

                            const id = `${gauge.id}-${tokenAddress}`;

                            let rewardRate = '0.0';
                            let periodFinish: number;

                            if (gaugeVersion === 1) {
                                const gaugeV1 = getContractAt(gauge.id, childChainGaugeV1Abi);
                                const rewardData = await gaugeV1.reward_data(tokenAddress);

                                periodFinish = rewardData[2];
                                if (periodFinish > moment().unix()) {
                                    // period still running
                                    rewardRate = formatFixed(rewardData[3], token.decimals);
                                }
                            } else {
                                // we can't get BAL rate from the reward data but got it from the inflation_rate call which set the rewardToken.rate
                                if (tokenAddress === this.balAddress) {
                                    rewardRate = rewardToken.rate ? rewardToken.rate : '0.0';
                                } else {
                                    const gaugeV2 = getContractAt(gauge.id, childChainGaugeV2Abi);
                                    const rewardData = await gaugeV2.reward_data(tokenAddress);

                                    periodFinish = parseFloat(formatUnits(rewardData[1], 0));
                                    if (periodFinish > moment().unix()) {
                                        // period still running
                                        rewardRate = formatFixed(rewardData[2], token.decimals);
                                    }
                                }
                            }

                            operations.push(
                                prisma.prismaPoolStakingGaugeReward.upsert({
                                    create: {
                                        id,
                                        chain: networkContext.chain,
                                        gaugeId: gauge.id,
                                        tokenAddress: tokenAddress,
                                        rewardPerSecond: rewardRate,
                                    },
                                    update: {
                                        rewardPerSecond: rewardRate,
                                    },
                                    where: { id_chain: { id, chain: networkContext.chain } },
                                }),
                            );
                        }
                    }
                }
            }
        }

        await prismaBulkExecuteOperations(operations, true, undefined);
    }

    /**
     * Get the inflation rate for all the gauges on child chains.
     * 
     * @param gaugeAddresses
     * @returns
     */
    private async getChildChainGaugeInfo(gaugeAddresses: string[]): Promise<{ [gaugeAddress: string]: GaugeRate }> {
        const currentWeek = Math.floor(Date.now() / 1000 / 604800);
        const childChainAbi = [
            'function inflation_rate(uint256 week) view returns (uint256)',
            'function working_supply() view returns (uint256)'
        ];
        const multicall = new Multicaller3(childChainAbi);

        gaugeAddresses.forEach((address) => {
            multicall.call(`${address}.inflationRate`, address, 'inflation_rate', [currentWeek], true);
            multicall.call(`${address}.workingSupply`, address, 'working_supply', [], true);
        });

        const results = (await multicall.execute()) as {
            [address: string]: {
                inflationRate: BigNumber | undefined,
                workingSupply: BigNumber
            }
        };

        const response = Object.keys(results).reduce((acc, address) => {
            const rate = results[address].inflationRate ? formatUnits(results[address].inflationRate!) : '0.0';
            const workingSupply = formatUnits(results[address].workingSupply);
            const version = results[address].inflationRate ? 2 : 1;
            acc[address] = { version, rate, workingSupply };
            return acc;
        }, {} as { [gaugeAddress: string]: GaugeRate });

        return response;
    }

    /**
     * Get the inflation rate for all the gauges on mainnet.
     * Gauges on mainnet use the inflation rate from token admin contract
     * and relative weight from the gauge contract.
     *
     * @param gaugeAddresses 
     * @returns 
     */
    private async getMainnetGaugeRates(gaugeAddresses: string[]): Promise<{ [gaugeAddress: string]: GaugeRate }> {
        const now = Math.round(new Date().getTime() / 1000);
        const version = 2; // On Mainnet BAL is always distributed directly to gauges
        const { gaugeControllerAddress } = networkContext.data;
        const abi = [
            'function working_supply() view returns (uint256)',
            'function gauge_relative_weight(address) view returns (uint256)'
        ];
        const multicall = new Multicaller3(abi);

        gaugeAddresses.forEach((address) => {
            multicall.call(`${address}.weight`, gaugeControllerAddress!, 'gauge_relative_weight', [address], true);
            multicall.call(`${address}.workingSupply`, address, 'working_supply', [], true);
        });
        
        const gaugeData = await multicall.execute() as { [address: string]: { weight: BigNumber, workingSupply: BigNumber } };
        const inflationRate = emissions.weekly(now) / 604800; // BAL inflation rate per second

        const weightedRates = _.mapValues(gaugeData, ({ weight }) => {
            if (weight.eq(0)) return 0;
            return inflationRate * Number(formatUnits(weight));
        });

        const response = Object.keys(gaugeData).reduce((acc, address) => {
            acc[address] = {
                version,
                rate: weightedRates[address] > 0
                    ? weightedRates[address].toFixed(18)
                    : '0.0',
                workingSupply: formatUnits(gaugeData[address].workingSupply)
            };
            return acc;
        }, {} as { [gaugeAddress: string]: GaugeRate });

        return response;
    }

    public async reloadStakingForAllPools(stakingTypes: PrismaPoolStakingType[]): Promise<void> {
        if (stakingTypes.includes('GAUGE')) {
            await prisma.prismaUserStakedBalance.deleteMany({
                where: { staking: { type: 'GAUGE', chain: networkContext.chain } },
            });
            await prisma.prismaVotingGauge.deleteMany({
                where: { chain: networkContext.chain },
            });
            await prisma.prismaPoolStakingGaugeReward.deleteMany({ where: { chain: networkContext.chain } });
            await prisma.prismaPoolStakingGauge.deleteMany({ where: { chain: networkContext.chain } });
            await prisma.prismaPoolStaking.deleteMany({ where: { chain: networkContext.chain } });
            await this.syncStakingForPools();
        }
    }
}
