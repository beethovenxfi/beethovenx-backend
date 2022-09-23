import axios from 'axios';
import { prisma } from '../../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { PoolAprService } from '../../../pool-types';

export class WstethAprService implements PoolAprService {
    constructor(
        private readonly wstethAprEndpoint: string,
        private readonly wstethContractAddress: string,
        private readonly yieldProtocolFeePercentage: number,
    ) {}
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        let grossApr: number | undefined;
        for (const pool of pools) {
            const itemId = `${pool.id}-lido-wsteth`;

            if (pool.tokens.map((token) => token.address).includes(this.wstethContractAddress)) {
                if (!grossApr) {
                    const { data } = await axios.get<string>(this.wstethAprEndpoint);
                    grossApr = (parseFloat(data) / 100) * this.yieldProtocolFeePercentage;
                }
                await prisma.prismaPoolAprItem.upsert({
                    where: { id: itemId },
                    create: {
                        id: itemId,
                        poolId: pool.id,
                        title: `LIDO APR`,
                        apr: grossApr,
                        type: 'IB_YIELD',
                    },
                    update: { apr: grossApr },
                });
            }
        }
    }
}
