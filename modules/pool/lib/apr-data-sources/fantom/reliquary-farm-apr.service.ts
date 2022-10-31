import { isSameAddress } from '@balancer-labs/sdk';
import {
    PrismaPoolAprItem,
    PrismaPoolStakingReliquaryFarm,
    PrismaPoolStakingReliquaryFarmRewarder,
    PrismaTokenCurrentPrice,
} from '@prisma/client';
import { prisma } from '../../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { prismaBulkExecuteOperations } from '../../../../../prisma/prisma-util';
import { secondsPerYear } from '../../../../common/time';
import { networkConfig } from '../../../../config/network-config';
import { ReliquaryFarmFragment } from '../../../../subgraphs/reliquary-subgraph/generated/reliquary-subgraph-types';
import { reliquaryService } from '../../../../subgraphs/reliquary-subgraph/reliquary.service';
import { tokenService } from '../../../../token/token.service';
import { PoolAprService } from '../../../pool-types';

type FarmWithRewarders = PrismaPoolStakingReliquaryFarm & {
    rewarders: PrismaPoolStakingReliquaryFarmRewarder[];
};

export class ReliquaryFarmAprService implements PoolAprService {
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const farms = await reliquaryService.getAllFarms({});

        const tokenPrices = await tokenService.getTokenPrices();
        const operations: any[] = [];

        for (const pool of pools) {
            const farm = farms.find((farm) => isSameAddress(pool.address, farm.poolTokenAddress));

            if (!farm || !pool.dynamicData) {
                continue;
            }

            const farmBptBalance = parseFloat(farm.totalBalance);
            const totalShares = parseFloat(pool.dynamicData.totalShares);
            const totalLiquidity = pool.dynamicData?.totalLiquidity || 0;
            const farmTvl = totalShares > 0 ? (farmBptBalance / totalShares) * totalLiquidity : 0;
            const pricePerShare = totalLiquidity / totalShares;

            const items = await this.calculateFarmApr(
                pool.id,
                pool.staking!.reliquary!,
                farm,
                farmTvl,
                pricePerShare,
                tokenPrices,
            );

            items.forEach((item) => {
                operations.push(
                    prisma.prismaPoolAprItem.upsert({
                        where: { id: item.id },
                        update: item,
                        create: item,
                    }),
                );
            });
        }

        const poolsWithNoAllocPoints = farms
            .filter((farm) => farm.allocPoint === 0)
            .map((farm) => farm.poolTokenAddress.toLowerCase());

        //TODO: this could be optimized, doesn't need to be run everytime
        await prisma.prismaPoolAprItem.deleteMany({
            where: {
                type: 'NATIVE_REWARD',
                pool: { address: { in: poolsWithNoAllocPoints } },
            },
        });

        await prismaBulkExecuteOperations(operations);
    }

    private async calculateFarmApr(
        poolId: string,
        farm: FarmWithRewarders,
        subgraphFarm: ReliquaryFarmFragment,
        farmTvl: number,
        pricePerShare: number,
        tokenPrices: PrismaTokenCurrentPrice[],
    ): Promise<PrismaPoolAprItem[]> {
        if (farmTvl <= 0) {
            return [];
        }
        const beetsPrice = tokenService.getPriceForToken(tokenPrices, networkConfig.beets.address);
        const farmBeetsPerYear = parseFloat(farm.beetsPerSecond) * secondsPerYear;
        const beetsValuePerYear = beetsPrice * farmBeetsPerYear;
        const items: PrismaPoolAprItem[] = [];
        const sortedLevelsWithBalance = subgraphFarm.levels
            .filter((level) => parseFloat(level.balance) > 0)
            .sort((a, b) => a.level - b.level);

        if (sortedLevelsWithBalance.length === 0) {
            return [];
        }

        const minPoolLevel = sortedLevelsWithBalance[0];
        const maxPoolLevel = sortedLevelsWithBalance[sortedLevelsWithBalance.length - 1];

        const totalWeightedSupply = subgraphFarm.levels.reduce(
            (total, level) => total + level.allocationPoints * parseFloat(level.balance),
            0,
        );
        const minLevelBalance = parseFloat(minPoolLevel.balance);
        const maxLevelBalance = parseFloat(maxPoolLevel.balance);

        const minAprShare = (minPoolLevel.allocationPoints * minLevelBalance) / totalWeightedSupply;
        const maxAprShare = (maxPoolLevel.allocationPoints * maxLevelBalance) / totalWeightedSupply;

        const minBeetsApr = (beetsValuePerYear * minAprShare) / (minLevelBalance * pricePerShare);
        const maxBeetsApr = (beetsValuePerYear * maxAprShare) / (maxLevelBalance * pricePerShare);

        if (minBeetsApr > 0 || maxBeetsApr > 0) {
            items.push({
                id: `${poolId}-min-beets-apr`,
                poolId,
                title: 'BEETS min reward APR',
                apr: minBeetsApr,
                type: 'NATIVE_REWARD',
                group: null,
            });
            items.push({
                id: `${poolId}-max-beets-apr`,
                poolId,
                title: 'BEETS max reward APR',
                apr: maxBeetsApr,
                type: 'NATIVE_REWARD',
                group: null,
            });
        }

        if (subgraphFarm.rewarder) {
            for (const rewarderEmission of subgraphFarm.rewarder.emissions) {
                const rewardTokenPrice = tokenService.getPriceForToken(
                    tokenPrices,
                    rewarderEmission.rewardToken.address,
                );
                const rewardTokenPerYear = parseFloat(rewarderEmission.rewardPerSecond) * secondsPerYear;
                const rewardTokenValuePerYear = rewardTokenPrice * rewardTokenPerYear;
                const rewardApr = rewardTokenValuePerYear / farmTvl > 0 ? rewardTokenValuePerYear / farmTvl : 0;

                items.push({
                    id: `${poolId}-${rewarderEmission.rewardToken.symbol}-apr`,
                    poolId,
                    title: `${rewarderEmission.rewardToken.symbol} reward APR`,
                    apr: rewardApr,
                    type: 'THIRD_PARTY_REWARD',
                    group: null,
                });
            }
        }
        return items;
    }
}
