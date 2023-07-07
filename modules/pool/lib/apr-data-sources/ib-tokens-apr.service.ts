import { PoolAprService } from "../../pool-types";
import axios from "axios";
import { PrismaPoolWithExpandedNesting } from "../../../../prisma/prisma-types";
import { zipObject } from "lodash";
import { prisma } from "../../../../prisma/prisma-client";
import { networkContext } from "../../../network/network-context.service";
import { prismaBulkExecuteOperations } from "../../../../prisma/prisma-util";

export class IbTokensAprService implements PoolAprService {

  getAprServiceName(): string {
    return "IbTokensAprService";
  }

  public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
    const operations: any[] = [];
    const aprs = await this.fetchYieldTokensApr();
    const tokenYieldPools = pools.filter((pool) => pool.tokens.find((token) => {
      return Array.from(aprs.keys()).includes(token.address);
    }));

    for (const pool of tokenYieldPools) {
      for (const token of pool.tokens) {
        if (Array.from(aprs.keys()).includes(token.address)) {
          const itemId = `${ pool.id }-tokens-yield-apr`
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
    const res = await axios.get("https://yield-tokens.balancer.workers.dev/");
    const aprs = new Map<string, number>(Object.entries(res.data as {
      [key: string]: number
    }).map(([key, apr]) => [key, apr * 0.0001]));
    return aprs;
  }
  
}