import axios from 'axios';
import { prisma } from '../../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { PoolAprService } from '../../../pool-types';

export class WstethAprService implements PoolAprService {
    constructor(
        private readonly wstethAprEndpoint: string,
        private readonly wstethContractAddress: string,
        private readonly yieldFeePercentage: number,
    ) {}
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        let growthApr: number | undefined;
        for (const pool of pools) {
            const itemId = `${pool.id}-lido-wsteth`;

            if (pool.tokens.map((token) => token.address).includes(this.wstethContractAddress)) {
                if (!growthApr) {
                    const { data } = await axios.get<string>(this.wstethAprEndpoint);
                    growthApr = (parseFloat(data) / 100) * this.yieldFeePercentage;
                }
                await prisma.prismaPoolAprItem.upsert({
                    where: { id: itemId },
                    create: {
                        id: itemId,
                        poolId: pool.id,
                        title: `LIDO APR`,
                        apr: growthApr,
                        type: 'IB_YIELD',
                    },
                    update: { apr: growthApr },
                });
            }
        }
    }
}
