import axios from 'axios';
import { prisma } from '../../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { TokenService } from '../../../../token/token.service';
import { PoolAprService } from '../../../pool-types';

export class StaderStakedFtmAprService implements PoolAprService {
    private readonly ankrFTM_ADDRESS = '0xcfc785741dc0e98ad4c9f6394bb9d43cd1ef5179';

    constructor(private readonly tokenService: TokenService) {}

    public getAprServiceName(): string {
        return 'AnkrStakedFtmAprService';
    }

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const tokenPrices = await this.tokenService.getTokenPrices();
        const ankrFtmPrice = this.tokenService.getPriceForToken(tokenPrices, this.ankrFTM_ADDRESS);

        //{"serviceName":"ftm","totalStaked":"278077.20562913176","stakers":"423","apy":"2.987985146","totalStakedUsd":"136146.5999","apyBasis":"DAY"},
        const { data } = await axios.get<{ serviceName: string; apy: string }[]>(
            'https://api.staking.ankr.com/v1alpha/metrics',
            {},
        );

        const ankrFtmApy = data.find((service) => {
            service.serviceName === 'ftm';
        });

        const totalAnkrFTMApr = parseFloat(ankrFtmApy?.apy || '0') / 100;

        let operations: any[] = [];
        for (const pool of pools) {
            const ankrFtmToken = pool.tokens.find((token) => token.address === this.ankrFTM_ADDRESS);
            const ankrFtmTokenBalance = ankrFtmToken?.dynamicData?.balance;
            if (ankrFtmTokenBalance && pool.dynamicData) {
                const ankrFtmPercentage =
                    (parseFloat(ankrFtmTokenBalance) * ankrFtmPrice) / pool.dynamicData.totalLiquidity;
                const poolAnkrFtmApr = pool.dynamicData.totalLiquidity > 0 ? totalAnkrFTMApr * ankrFtmPercentage : 0;
                operations.push(
                    prisma.prismaPoolAprItem.upsert({
                        where: { id: `${pool.id}-ankrftm-apr` },
                        update: { apr: poolAnkrFtmApr },
                        create: {
                            id: `${pool.id}-ankrftm-apr`,
                            poolId: pool.id,
                            apr: poolAnkrFtmApr,
                            title: 'ankrFTM APR',
                            type: 'IB_YIELD',
                        },
                    }),
                );
            }
        }
        await Promise.all(operations);
    }
}
