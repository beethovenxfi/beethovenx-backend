import { PoolAprService } from '../pool-types';
import { PrismaPoolWithExpandedNesting } from '../../../prisma/prisma-types';

export class GaugeAprService implements PoolAprService {
    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {}
}
