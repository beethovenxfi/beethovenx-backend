import axios from 'axios';
import { prisma } from '../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../prisma/prisma-types';
import { PoolAprService } from '../../pool-types';
import { ReaperVault } from './apr-types';

export class ReaperVaultAprService implements PoolAprService {
    constructor(private readonly reaperVaultEndpoint: string) {}

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const { data } = await axios.get<ReaperVault[]>(this.reaperVaultEndpoint);
        const beethovenVaults = data.filter((vault) => vault.cryptContent.exchange === 'beethoven');

        for (const pool of pools) {
            const itemId = `${pool.id}-yearn-vault`;

            if (!pool.linearData || !pool.dynamicData) {
                continue;
            }

            const linearData = pool.linearData;
            const wrappedToken = pool.tokens[linearData.wrappedIndex];

            const vault = beethovenVaults.find(
                (vault) => vault.cryptContent.vault.address.toLowerCase() === wrappedToken.address.toLowerCase(),
            );

            if (!vault) {
                continue;
            }

            const apr = vault.analytics.yields.year;

            await prisma.prismaPoolAprItem.upsert({
                where: { id: itemId },
                create: {
                    id: itemId,
                    poolId: pool.id,
                    title: `${vault.cryptContent.symbol} APR`,
                    apr,
                    group: 'REAPER',
                    type: 'LINEAR_BOOSTED',
                },
                update: { apr, type: 'LINEAR_BOOSTED' },
            });
        }
    }
}
