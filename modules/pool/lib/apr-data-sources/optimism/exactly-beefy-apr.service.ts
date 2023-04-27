import axios from 'axios';
import { prisma } from '../../../../../prisma/prisma-client';
import { PrismaPoolWithExpandedNesting } from '../../../../../prisma/prisma-types';
import { TokenService } from '../../../../token/token.service';
import { PoolAprService } from '../../../pool-types';
import { protocolTakesFeeOnYield } from '../../pool-utils';
import { networkConfig } from '../../../../config/network-config';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { secondsPerYear } from '../../../../common/time';
import { Zero } from '@ethersproject/constants';

export class ExactlyBeefyAprService implements PoolAprService {
    EXACTLY_SUBGRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/exactly/exactly-optimism';
    REWARDS_CONTROLLER = '0xBd1ba78A3976cAB420A9203E6ef14D18C2B2E031';
    REWARD_TOKEN = '0x4200000000000000000000000000000000000042';

    EXACTLYBEEFY_LINEAR_POOLS = [
        {
            poolId: '0x5bdd8c19b44c3e4a15305601a2c9841bde9366f00000000000000000000000ca',
            exactlyMarketAddress: '0x81C9A7B55A4df39A9B7B5F781ec0e53539694873',
        },
        {
            poolId: '0x72d6df381cac8c2283c0b13fe5262a1f5e8e8d1b0000000000000000000000cb',
            exactlyMarketAddress: '0xc4d4500326981eacD020e20A81b1c479c161c7EF',
        },
    ];

    constructor(private readonly tokenService: TokenService) {}

    public getAprServiceName(): string {
        return 'ExactlyBeefyAprService';
    }

    public async updateAprForPools(pools: PrismaPoolWithExpandedNesting[]): Promise<void> {
        const tokenPrices = await this.tokenService.getTokenPrices();

        for (const pool of pools) {
            const linearPoolEntry = this.EXACTLYBEEFY_LINEAR_POOLS.find((entry) => entry.poolId === pool.id);
            if (!linearPoolEntry || !pool.linearData || !pool.dynamicData) {
                continue;
            }

            const itemId = `${pool.id}-beefy-vault`;

            const linearData = pool.linearData;
            const wrappedToken = pool.tokens[linearData.wrappedIndex];
            const mainToken = pool.tokens[linearData.mainIndex];

            const baseSupplyOnlyApr = await this.getSupplyBaseApr(linearPoolEntry.exactlyMarketAddress);

            const tokenPrice = this.tokenService.getPriceForToken(tokenPrices, mainToken.address);
            const wrappedTokens = parseFloat(wrappedToken.dynamicData?.balance || '0');
            const priceRate = parseFloat(wrappedToken.dynamicData?.priceRate || '1.0');
            const poolWrappedLiquidity = wrappedTokens * priceRate * tokenPrice;
            const totalLiquidity = pool.dynamicData.totalLiquidity;
            let apr =
                totalLiquidity > 0
                    ? parseFloat(baseSupplyOnlyApr.toString()) * (poolWrappedLiquidity / totalLiquidity)
                    : 0;

            await prisma.prismaPoolAprItem.upsert({
                where: { id: itemId },
                create: {
                    id: itemId,
                    poolId: pool.id,
                    title: `${wrappedToken.token.symbol} APR`,
                    apr: apr,
                    group: 'BEEFY',
                    type: 'LINEAR_BOOSTED',
                },
                update: { title: `${wrappedToken.token.symbol} APR`, apr: apr },
            });
        }
    }

    private async getSupplyBaseApr(market: string): Promise<BigNumber> {
        const now = moment().unix();
        const oneDayAgo = moment().subtract(1, 'days').unix();

        const queryResponseNow = await axios.post(this.EXACTLY_SUBGRAPH_ENDPOINT, {
            query: this.getMarketUpdateQuery(market.toLowerCase(), now),
        });

        const queryResponseOneDayAgo = await axios.post(this.EXACTLY_SUBGRAPH_ENDPOINT, {
            query: this.getMarketUpdateQuery(market.toLowerCase(), oneDayAgo),
        });

        const marketUpdatesNow: {
            timestamp: number;
            floatingDepositShares: string;
            floatingAssets: string;
        }[] = queryResponseNow.data.data.marketUpdates;

        const marketUpdatesOneDayAgo: {
            timestamp: number;
            floatingDepositShares: string;
            floatingAssets: string;
        }[] = queryResponseOneDayAgo.data.data.marketUpdates;

        const shareValueNow = new BigNumber(marketUpdatesNow[0].floatingAssets).dividedBy(
            marketUpdatesNow[0].floatingDepositShares,
        );

        const shareValueOneDayAgo = new BigNumber(marketUpdatesOneDayAgo[0].floatingAssets).dividedBy(
            marketUpdatesOneDayAgo[0].floatingDepositShares,
        );
        const timestampDifference = new BigNumber(marketUpdatesNow[0].timestamp).minus(
            marketUpdatesOneDayAgo[0].timestamp,
        );

        const supplyBase = shareValueNow
            .minus(shareValueOneDayAgo)
            .dividedBy(timestampDifference)
            .times(secondsPerYear);

        return supplyBase;
    }

    private getMarketUpdateQuery(market: string, timestamp: number): string {
        return `
        query exactly {
          marketUpdates(first: 1, orderBy: timestamp, orderDirection: desc, where: { market: "${market}", timestamp_lte: ${timestamp}}) {
              timestamp
              floatingDepositShares
              floatingAssets
          }
        }
      `;
    }
}
