import { PoolAprService } from '../pool-types';
import { PrismaPoolWithExpandedNesting } from '../../../prisma/prisma-types';
import { GaugeSerivce } from '../staking/gauge.serivce';
import { PrismaPoolAprItem } from '@prisma/client';
import { TokenService } from '../../token/token.service';
import { secondsPerYear } from '../../util/time';
import { prisma } from '../../util/prisma-client';
import { prismaBulkExecuteOperations } from '../../../prisma/prisma-util';

export class GaugeAprService implements PoolAprService {
    constructor(
        private readonly gaugeService: GaugeSerivce,
        private readonly tokenService: TokenService,
        private readonly primaryTokens: string[],
    ) {}
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const operations: any[] = [];
        const gaugeStreamers = await this.gaugeService.getStreamers();
        const tokenPrices = await this.tokenService.getTokenPrices();
        for (const pool of pools) {
            const streamer = gaugeStreamers.find(
                (streamer) => streamer.gaugeAddress === pool.staking?.gauge?.gaugeAddress,
            );
            if (!streamer || !pool.dynamicData) {
                continue;
            }
            const totalShares = parseFloat(pool.dynamicData.totalShares);
            const gaugeTvl =
                totalShares > 0
                    ? (parseFloat(streamer.totalSupply) / totalShares) * pool.dynamicData.totalLiquidity
                    : 0;

            let thirdPartyApr = 0;
            for (let rewardToken of streamer.rewardTokens) {
                if (rewardToken.rewardsPerSecond === 0) {
                    continue;
                }
                const tokenPrice = this.tokenService.getPriceForToken(tokenPrices, rewardToken.address) || 0.1;
                const rewardTokenPerYear = rewardToken.rewardsPerSecond * secondsPerYear;
                const rewardTokenValuePerYear = tokenPrice * rewardTokenPerYear;
                const rewardApr = gaugeTvl > 0 ? rewardTokenValuePerYear / gaugeTvl : 0;

                const isThirdPartyApr = !this.primaryTokens.includes(rewardToken.address);
                if (isThirdPartyApr) {
                    thirdPartyApr += rewardApr;
                }

                const item: PrismaPoolAprItem = {
                    id: `${pool.id}-${rewardToken.symbol}-apr`,
                    poolId: pool.id,
                    title: `${rewardToken.symbol} reward APR`,
                    apr: rewardApr,
                    type: isThirdPartyApr ? 'THIRD_PARTY_REWARD' : 'NATIVE_REWARD',
                    group: null,
                };

                operations.push(
                    prisma.prismaPoolAprItem.upsert({
                        where: { id: item.id },
                        update: item,
                        create: item,
                    }),
                );
            }
        }
        await prismaBulkExecuteOperations(operations);
    }
}
