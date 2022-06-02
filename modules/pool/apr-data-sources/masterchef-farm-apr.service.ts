import { PoolAprService } from '../pool-types';
import { PrismaPoolWithExpandedNesting } from '../../../prisma/prisma-types';
import { prisma } from '../../util/prisma-client';
import { prismaBulkExecuteOperations } from '../../../prisma/prisma-util';
import { blocksSubgraphService } from '../../subgraphs/blocks-subgraph/blocks-subgraph.service';
import { secondsPerYear } from '../../util/time';
import { PrismaPoolAprItem, PrismaTokenCurrentPrice } from '@prisma/client';
import { networkConfig } from '../../config/network-config';
import { tokenService } from '../../token/token.service';
import { masterchefService } from '../../subgraphs/masterchef-subgraph/masterchef.service';
import { FarmFragment } from '../../subgraphs/masterchef-subgraph/generated/masterchef-subgraph-types';

const FARM_EMISSIONS_PERCENT = 0.872;

export class MasterchefFarmAprService implements PoolAprService {
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const farms = await masterchefService.getAllFarms({});

        const blocksPerDay = await blocksSubgraphService.getBlocksPerDay();
        const blocksPerYear = blocksPerDay * 365;
        const tokenPrices = await tokenService.getTokenPrices();
        const operations: any[] = [];

        for (const pool of pools) {
            const farm = farms.find((farm) => {
                if (pool.id === networkConfig.fbeets.poolId) {
                    return farm.id === networkConfig.fbeets.farmId;
                }

                return farm.pair.toLowerCase() === pool.address.toLowerCase();
            });

            if (!farm || !pool.dynamicData) {
                continue;
            }

            const farmBptBalance = Number(parseInt(farm.slpBalance) / 1e18);
            const totalShares = parseFloat(pool.dynamicData.totalShares);
            const totalLiquidity = pool.dynamicData?.totalLiquidity || 0;
            const farmTvl = totalShares > 0 ? (farmBptBalance / totalShares) * totalLiquidity : 0;

            const items = this.calculateFarmApr(pool.id, farm, farmTvl, blocksPerYear, tokenPrices);

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

        await prismaBulkExecuteOperations(operations);
    }

    private calculateFarmApr(
        poolId: string,
        farm: FarmFragment,
        farmTvl: number,
        blocksPerYear: number,
        tokenPrices: PrismaTokenCurrentPrice[],
    ): PrismaPoolAprItem[] {
        if (farmTvl <= 0) {
            return [];
        }

        const beetsPrice = tokenService.getPriceForToken(tokenPrices, networkConfig.beets.address);
        const beetsPerBlock = Number(parseInt(farm.masterChef.beetsPerBlock) / 1e18) * FARM_EMISSIONS_PERCENT;
        const beetsPerYear = beetsPerBlock * blocksPerYear;
        const farmBeetsPerYear = (parseInt(farm.allocPoint) / parseInt(farm.masterChef.totalAllocPoint)) * beetsPerYear;
        const beetsValuePerYear = beetsPrice * farmBeetsPerYear;
        const items: PrismaPoolAprItem[] = [];
        const beetsApr = beetsValuePerYear / farmTvl;
        let thirdPartyApr = 0;

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

        (farm.rewarder?.rewardTokens || [])
            .filter(
                (rewardToken) =>
                    rewardToken.token !== networkConfig.beets.address && parseFloat(rewardToken.rewardPerSecond) > 0,
            )
            .forEach((rewardToken) => {
                const rewardTokenPrice = tokenService.getPriceForToken(tokenPrices, rewardToken.token);
                const rewardTokenPerYear = parseFloat(rewardToken.rewardPerSecond) * secondsPerYear;
                const rewardTokenValuePerYear = rewardTokenPrice * rewardTokenPerYear;
                const rewardApr = rewardTokenValuePerYear / farmTvl > 0 ? rewardTokenValuePerYear / farmTvl : 0;

                thirdPartyApr += rewardApr;

                items.push({
                    id: `${poolId}-${rewardToken.symbol}-apr`,
                    poolId,
                    title: `${rewardToken.symbol} reward APR`,
                    apr: rewardApr,
                    type: 'THIRD_PARTY_REWARD',
                    group: null,
                });
            });

        return items;
    }
}
