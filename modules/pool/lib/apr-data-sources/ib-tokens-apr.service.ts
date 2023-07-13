import { PoolAprService } from "../../pool-types";
import { PrismaPoolWithExpandedNesting } from "../../../../prisma/prisma-types";
import { prisma } from "../../../../prisma/prisma-client";
import { networkContext } from "../../../network/network-context.service";
import { prismaBulkExecuteOperations } from "../../../../prisma/prisma-util";
import { fetchAllAprs } from "../../../token/lib/token-apr-handler/fetch-all";
import { TokenApr } from "../../../token/lib/token-apr-handler/types";
import { PrismaPoolAprItemGroup } from "@prisma/client";

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
        if ((aprs.get(token.address) !== undefined)) {
          const tokenSymbol = token.token.symbol ?? (<TokenApr>aprs.get(token.address)).name
          const itemId = `${ pool.id }-${ tokenSymbol }-yield-apr`
          
          operations.push(prisma.prismaPoolAprItem.upsert({
            where: { id_chain: { id: itemId, chain: networkContext.chain } },
            create: {
              id: itemId,
              chain: networkContext.chain,
              poolId: pool.id,
              title: `${ tokenSymbol} APR`,
              apr: aprs.get(token.address)?.val ?? 0,
              group: (aprs.get(token.address)?.group as PrismaPoolAprItemGroup) ?? null,
              type: pool.type === 'LINEAR' ? 'LINEAR_BOOSTED' : 'IB_YIELD',
            },
            update: {
              title: `${ tokenSymbol } APR`,
              apr: aprs.get(token.address)?.val
            },
          }));
        }
      }
    }

    await prismaBulkExecuteOperations(operations);
  }

  private async fetchYieldTokensApr(): Promise<Map<string, TokenApr>> {
    const data = await fetchAllAprs()
    return new Map<string, TokenApr>(data.filter((apr)=>!isNaN(apr.val)).map((apr) => [apr.address, apr]));
  }

}