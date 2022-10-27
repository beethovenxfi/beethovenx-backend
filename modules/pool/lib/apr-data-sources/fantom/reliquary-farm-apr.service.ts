import { PoolAprService } from '../../../pool-types';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { prisma } from '../../../../../prisma/prisma-client';
import { prismaBulkExecuteOperations } from '../../../../../prisma/prisma-util';
import { blocksSubgraphService } from '../../../../subgraphs/blocks-subgraph/blocks-subgraph.service';
import { secondsPerYear } from '../../../../common/time';
import {
    PrismaPoolAprItem,
    PrismaPoolStakingReliquaryFarm,
    PrismaPoolStakingReliquaryFarmRewarder,
    PrismaTokenCurrentPrice,
} from '@prisma/client';
import { networkConfig } from '../../../../config/network-config';
import { tokenService } from '../../../../token/token.service';
import { masterchefService } from '../../../../subgraphs/masterchef-subgraph/masterchef.service';
import { FarmFragment } from '../../../../subgraphs/masterchef-subgraph/generated/masterchef-subgraph-types';
import { formatFixed } from '@ethersproject/bignumber';
import { reliquaryService } from '../../../../subgraphs/reliquary-subgraph/reliquary.service';
import { isSameAddress } from '@balancer-labs/sdk';
import { ReliquaryFarmFragment } from '../../../../subgraphs/reliquary-subgraph/generated/reliquary-subgraph-types';

const FARM_EMISSIONS_PERCENT = 0.872;

type FarmWithRewarders = PrismaPoolStakingReliquaryFarm & {
    rewarders: PrismaPoolStakingReliquaryFarmRewarder[];
};

export class ReliquaryFarmAprService implements PoolAprService {
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const farms = await reliquaryService.getAllFarms({});

        // const blocksPerDay = await blocksSubgraphService.getBlocksPerDay();
        // const blocksPerYear = blocksPerDay * 365;
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

            const items = await this.calculateFarmApr(pool.id, pool.staking!.reliquary!, farm, farmTvl, tokenPrices);

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
            .filter((farm) => parseFloat(farm.allocPoint) === 0)
            .map((farm) => farm.pair);

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
        tokenPrices: PrismaTokenCurrentPrice[],
    ): Promise<PrismaPoolAprItem[]> {
        if (farmTvl <= 0) {
            return [];
        }
        const beetsPrice = tokenService.getPriceForToken(tokenPrices, networkConfig.beets.address);
        const farmBeetsPerYear = parseFloat(farm.beetsPerSecond) * secondsPerYear;
        const beetsValuePerYear = beetsPrice * farmBeetsPerYear;
        const items: PrismaPoolAprItem[] = [];
        const beetsApr = beetsValuePerYear / farmTvl;

        if (beetsApr > 0) {
            items.push({
                id: `${poolId}-beets-apr`,
                poolId,
                title: 'BEETS reward APR',
                apr: beetsApr,
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
