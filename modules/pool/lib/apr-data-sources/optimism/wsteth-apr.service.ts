import axios from 'axios';
import { prisma } from '../../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { PoolAprService } from '../../../pool-types';

export class WstethAprService implements PoolAprService {
    constructor(private readonly wstethAprEndpoint: string, private readonly wstethContractAddress: string) {}
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        let apr: number | undefined;
        for (const pool of pools) {
            const itemId = `${pool.id}-lido-wsteth`;

            if (pool.tokens.map((token) => token.address).includes(this.wstethContractAddress)) {
                if (!apr) {
                    const { data } = await axios.get<string>(this.wstethAprEndpoint);
                    apr = parseFloat(data);
                }
                await prisma.prismaPoolAprItem.upsert({
                    where: { id: itemId },
                    create: {
                        id: itemId,
                        poolId: pool.id,
                        title: `LIDO APR`,
                        apr,
                        type: 'IB_YIELD',
                    },
                    update: { apr, type: 'IB_YIELD' },
                });
            }
        }
    }
}
