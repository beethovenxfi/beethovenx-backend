import { PoolAprService } from "../../pool-types";
import { PrismaPoolWithExpandedNesting } from "../../../../prisma/prisma-types";
import { prisma } from "../../../../prisma/prisma-client";
import { networkContext } from "../../../network/network-context.service";
import { prismaBulkExecuteOperations } from "../../../../prisma/prisma-util";
import { fetchAllAprs } from "../../../token/lib/token-apr-handler/fetch-all";

export class IbTokensAprService implements PoolAprService {

  getAprServiceName(): string {
    return "IbTokensAprService";
  }

  public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
    const operations: any[] = [];
    const aprs = await this.fetchYieldTokensApr();
    const tokenYieldPools = pools.filter((pool) => {
        return pool.tokens.find((token) => {
          return Array.from(aprs.keys()).map((key) => key.toLowerCase()).includes(token.address.toLowerCase());
        })
      }
    );
    for (const pool of tokenYieldPools) {
      for (const token of pool.tokens) {
        if (Array.from(aprs.keys()).includes(token.address)) {
          const itemId = `${ pool.id }-token-${token.token.symbol || token.address}-yield-apr`
          operations.push(prisma.prismaPoolAprItem.upsert({
            where: { id_chain: { id: itemId, chain: networkContext.chain } }, create: {
              id: itemId,
              chain: networkContext.chain,
              poolId: pool.id,
              title: `${ token.token.symbol || token.address } APR`,
              apr: aprs.get(token.address) ?? 0,
              group: null,
              type: 'IB_YIELD',
            }, update: { title: `${ token.token.symbol || token.address } APR`, apr: aprs.get(token.address) },
          }));
        }
      }
    }

    await prismaBulkExecuteOperations(operations);
  }

  private async fetchYieldTokensApr(): Promise<Map<string, number>> {
    const data = await fetchAllAprs()
    const aprs = new Map<string, number>(Object.entries(data as {
      [key: string]: number
    }).map(([key, apr]) => [key, apr * 0.0001]));
    return aprs;
  }
  
}