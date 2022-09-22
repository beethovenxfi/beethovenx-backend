import axios from 'axios';
import { prisma } from '../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../prisma/prisma-types';
import { PoolAprService } from '../../pool-types';
import { ReaperCrypt } from './apr-types';

export class ReaperCryptAprService implements PoolAprService {
    constructor(private readonly reaperCryptsEndpoint: string) {}

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const { data } = await axios.get<{ data: ReaperCrypt[] }>(this.reaperCryptsEndpoint);

        const beethovenCrypts = data.data.filter((crypt) => crypt.cryptContent.exchange === 'beethoven');

        for (const pool of pools) {
            const itemId = `${pool.id}-reaper-crypt`;

            if (!pool.linearData || !pool.dynamicData) {
                continue;
            }

            const linearData = pool.linearData;
            const wrappedToken = pool.tokens[linearData.wrappedIndex];

            const crypt = beethovenCrypts.find(
                (crypt) => crypt.cryptContent.vault.address.toLowerCase() === wrappedToken.address.toLowerCase(),
            );

            if (!crypt) {
                continue;
            }

            const apr = crypt.analytics.yields.year;

            await prisma.prismaPoolAprItem.upsert({
                where: { id: itemId },
                create: {
                    id: itemId,
                    poolId: pool.id,
                    title: `${crypt.cryptContent.symbol} APR`,
                    apr,
                    group: 'REAPER',
                    type: 'LINEAR_BOOSTED',
                },
                update: { apr, type: 'LINEAR_BOOSTED' },
            });
        }
    }
}
