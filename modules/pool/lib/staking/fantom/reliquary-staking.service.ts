import { PoolStakingService } from '../../../pool-types';
import { ReliquarySubgraphService } from '../../../../subgraphs/reliquary-subgraph/reliquary.service';
import { prisma } from '../../../../../prisma/prisma-client';
import { prismaBulkExecuteOperations } from '../../../../../prisma/prisma-util';
import { networkConfig } from '../../../../config/network-config';
import { oldBnum } from '../../../../big-number/old-big-number';
import { formatFixed } from '@ethersproject/bignumber';
import { getContractAt } from '../../../../web3/contract';
import ERC20Abi from '../../../../web3//abi/ERC20.json';
import { BigNumber } from 'ethers';
import EmissionCurveAbi from './abi/EmissionCurve.json';
import { isSameAddress } from '@balancer-labs/sdk';
import { Rewarder_OrderBy } from '../../../../subgraphs/masterchef-subgraph/generated/masterchef-subgraph-types';

export class ReliquaryStakingService implements PoolStakingService {
    constructor(private readonly reliquarySubgraphService: ReliquarySubgraphService) {}

    public async syncStakingForPools(): Promise<void> {
        const { reliquary } = await this.reliquarySubgraphService.getReliquary({ id: networkConfig.reliquary.address });
        if (!reliquary) {
            throw new Error(`Reliquary with id ${networkConfig.reliquary.address} not found in subgraph`);
        }
        const farms = await this.reliquarySubgraphService.getAllFarms({});
        const pools = await prisma.prismaPool.findMany({
            include: { staking: { include: { farm: { include: { rewarders: true } } } } },
        });
        const operations: any[] = [];

        for (const farm of farms) {
            const pool = pools.find((pool) => isSameAddress(pool.address, farm.poolTokenAddress));

            if (!pool) {
                console.warn(
                    `Missing pool for farm with id ${farm.pid} with pool token ${farm.poolTokenAddress}. Skipping...`,
                );
                continue;
            }

            const farmId = `${farm.pid}`;
            const beetsPerSecond = reliquary.emissionCurve.rewardPerSecond;

            if (!pool.staking) {
                operations.push(
                    prisma.prismaPoolStaking.create({
                        data: {
                            id: `${reliquary.id}-${farm.id}`,
                            poolId: pool.id,
                            type: 'RELIQUARY',
                            address: networkConfig.reliquary.address,
                        },
                    }),
                );
            }

            operations.push(
                prisma.prismaPoolStakingReliquaryFarm.upsert({
                    where: { id: farmId },
                    create: { id: farmId, stakingId: farmId, beetsPerSecond: beetsPerSecond },
                    update: { beetsPerSecond: beetsPerSecond },
                }),
            );

            // TODO: multiple reward tokens
            if (farm.rewarder) {
                // for (const rewardToken of farm.rewarder.rewardToken || []) {
                const id = `${farmId}-${farm.rewarder.id}-${farm.rewarder.rewardToken.address}`;
                const erc20Token = await getContractAt(farm.rewarder.rewardToken.address, ERC20Abi);
                const rewardBalance: BigNumber = await erc20Token.balanceOf(farm.rewarder.id);
                const rewardPerSecond = rewardBalance.gt(0) ? farm.rewarder.rewardPerSecond : '0.0';

                operations.push(
                    prisma.prismaPoolStakingReliquaryFarmRewarder.upsert({
                        where: { id },
                        create: {
                            id,
                            farmId,
                            tokenAddress: farm.rewarder.rewardToken.address,
                            address: farm.rewarder.id,
                            rewardPerSecond,
                        },
                        update: { rewardPerSecond },
                    }),
                );
            }
        }

        await prismaBulkExecuteOperations(operations, true);
    }

    public async reloadStakingForAllPools() {
        await prisma.prismaPoolStakingReliquaryFarmRewarder.deleteMany({});
        await prisma.prismaPoolStakingReliquaryFarm.deleteMany({});
        await prisma.prismaPoolStaking.deleteMany({ where: { type: 'RELIQUARY' } });
        await this.syncStakingForPools();
    }
}
