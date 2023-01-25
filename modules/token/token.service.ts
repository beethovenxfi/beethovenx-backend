import { env } from '../../app/env';
import { TokenDefinition, TokenPriceItem } from './token-types';
import { prisma } from '../../prisma/prisma-client';
import { TokenDataLoaderService } from './lib/token-data-loader.service';
import { TokenPriceService } from './lib/token-price.service';
import { CoingeckoPriceHandlerService } from './lib/token-price-handlers/coingecko-price-handler.service';
import { isFantomNetwork, networkConfig } from '../config/network-config';
import { BptPriceHandlerService } from './lib/token-price-handlers/bpt-price-handler.service';
import { LinearWrappedTokenPriceHandlerService } from './lib/token-price-handlers/linear-wrapped-token-price-handler.service';
import { SwapsPriceHandlerService } from './lib/token-price-handlers/swaps-price-handler.service';
import { PrismaToken, PrismaTokenCurrentPrice, PrismaTokenDynamicData, PrismaTokenPrice } from '@prisma/client';
import { CoingeckoDataService } from './lib/coingecko-data.service';
import { Cache, CacheClass } from 'memory-cache';
import { GqlTokenChartDataRange, MutationTokenDeletePriceArgs, MutationTokenDeleteTokenTypeArgs } from '../../schema';
import { FbeetsPriceHandlerService } from './lib/token-price-handlers/fbeets-price-handler.service';
import { coingeckoService } from '../coingecko/coingecko.service';
import { BeetsPriceHandlerService } from './lib/token-price-handlers/beets-price-handler.service';
import { ClqdrPriceHandlerService } from './lib/token-price-handlers/clqdr-price-handler.service';
import moment from 'moment';
import { applyExtensions } from '@graphql-tools/merge';
import axios from 'axios';
import { time } from 'console';
import { sleep } from '../common/promise';
import { oneDayInSeconds, secondsPerDay } from '../common/time';
import { blocksSubgraphService } from '../subgraphs/blocks-subgraph/blocks-subgraph.service';
import { balancerSubgraphService } from '../subgraphs/balancer-subgraph/balancer-subgraph.service';

const TOKEN_PRICES_CACHE_KEY = 'token:prices:current';
const TOKEN_PRICES_24H_AGO_CACHE_KEY = 'token:prices:24h-ago';
const ALL_TOKENS_CACHE_KEY = 'tokens:all';

export class TokenService {
    cache: CacheClass<string, any>;
    constructor(
        private readonly tokenDataLoaderService: TokenDataLoaderService,
        private readonly tokenPriceService: TokenPriceService,
        private readonly coingeckoDataService: CoingeckoDataService,
    ) {
        this.cache = new Cache<string, any>();
    }

    public async syncSanityData() {
        await this.tokenDataLoaderService.syncSanityTokenData();
    }

    public async getToken(address: string): Promise<PrismaToken | null> {
        return prisma.prismaToken.findUnique({ where: { address: address.toLowerCase() } });
    }

    public async getTokens(addresses?: string[]): Promise<PrismaToken[]> {
        let tokens: PrismaToken[] | null = this.cache.get(ALL_TOKENS_CACHE_KEY);
        if (!tokens) {
            tokens = await prisma.prismaToken.findMany({});
            this.cache.put(ALL_TOKENS_CACHE_KEY, tokens, 5 * 60 * 1000);
        }
        if (addresses) {
            return tokens.filter((token) => addresses.includes(token.address));
        }
        return tokens;
    }

    public async getTokenDefinitions(): Promise<TokenDefinition[]> {
        const tokens = await prisma.prismaToken.findMany({
            where: { types: { some: { type: 'WHITE_LISTED' } } },
            include: { types: true },
            orderBy: { priority: 'desc' },
        });

        const weth = tokens.find((token) => token.address === networkConfig.weth.address);

        if (weth) {
            tokens.push({
                ...weth,
                name: networkConfig.eth.name,
                address: networkConfig.eth.address,
                symbol: networkConfig.eth.symbol,
            });
        }

        return tokens.map((token) => ({
            ...token,
            chainId: parseInt(env.CHAIN_ID),
            //TODO: some linear wrapped tokens are tradable. ie: xBOO
            tradable: !token.types.find(
                (type) => type.type === 'PHANTOM_BPT' || type.type === 'BPT' || type.type === 'LINEAR_WRAPPED_TOKEN',
            ),
        }));
    }

    public async loadTokenPrices(): Promise<void> {
        return this.tokenPriceService.updateTokenPrices();
    }

    public async getTokenPrices(): Promise<PrismaTokenCurrentPrice[]> {
        let tokenPrices = this.cache.get(TOKEN_PRICES_CACHE_KEY);
        if (!tokenPrices) {
            tokenPrices = await this.tokenPriceService.getCurrentTokenPrices();
            this.cache.put(TOKEN_PRICES_CACHE_KEY, tokenPrices, 30 * 1000);
        }
        return tokenPrices;
    }

    public async getWhiteListedTokenPrices(): Promise<PrismaTokenCurrentPrice[]> {
        /*const cached = this.cache.get(WHITE_LISTED_TOKEN_PRICES_CACHE_KEY) as PrismaTokenCurrentPrice[] | null;

        if (cached) {
            return cached;
        }

        const tokenPrices = await this.tokenPriceService.getWhiteListedCurrentTokenPrices();
        this.cache.put(WHITE_LISTED_TOKEN_PRICES_CACHE_KEY, tokenPrices, 10000);

        return tokenPrices;*/

        return this.tokenPriceService.getWhiteListedCurrentTokenPrices();
    }

    public getPriceForToken(tokenPrices: PrismaTokenCurrentPrice[], tokenAddress: string): number {
        return this.tokenPriceService.getPriceForToken(tokenPrices, tokenAddress);
    }

    public async syncTokenDynamicData(): Promise<void> {
        await this.coingeckoDataService.syncTokenDynamicDataFromCoingecko();
    }

    public async getTokenDynamicData(tokenAddress: string): Promise<PrismaTokenDynamicData | null> {
        return prisma.prismaTokenDynamicData.findUnique({ where: { tokenAddress: tokenAddress.toLowerCase() } });
    }

    public async getTokensDynamicData(tokenAddresses: string[]): Promise<PrismaTokenDynamicData[]> {
        return prisma.prismaTokenDynamicData.findMany({
            where: { tokenAddress: { in: tokenAddresses.map((address) => address.toLowerCase()) } },
        });
    }

    public async getDataForRange(tokenAddress: string, range: GqlTokenChartDataRange): Promise<PrismaTokenPrice[]> {
        return this.tokenPriceService.getDataForRange(tokenAddress, range);
    }

    public async getRelativeDataForRange(
        tokenIn: string,
        tokenOut: string,
        range: GqlTokenChartDataRange,
    ): Promise<TokenPriceItem[]> {
        return this.tokenPriceService.getRelativeDataForRange(tokenIn, tokenOut, range);
    }

    public async initChartData(tokenAddress: string) {
        await this.coingeckoDataService.initChartData(tokenAddress);
    }

    public async getTokenPriceFrom24hAgo(): Promise<PrismaTokenCurrentPrice[]> {
        let tokenPrices24hAgo = this.cache.get(TOKEN_PRICES_24H_AGO_CACHE_KEY);
        if (!tokenPrices24hAgo) {
            tokenPrices24hAgo = await this.tokenPriceService.getTokenPriceFrom24hAgo();
            this.cache.put(TOKEN_PRICES_24H_AGO_CACHE_KEY, tokenPrices24hAgo, 60 * 5 * 1000);
        }
        return tokenPrices24hAgo;
    }

    public async getHistoricalTokenPrices() {
        return this.tokenPriceService.getHistoricalTokenPrices();
    }

    public async deleteTokenPrice(args: MutationTokenDeletePriceArgs) {
        return this.tokenPriceService.deleteTokenPrice(args);
    }

    public async deleteTokenType({ tokenAddress, type }: MutationTokenDeleteTokenTypeArgs) {
        await prisma.prismaTokenType.delete({ where: { tokenAddress_type: { tokenAddress, type } } });
    }

    public async backfillHistoricalData() {
        // backfill daily data for all tokens (00:00 timestamp for previous day)
        const backfillFrom = moment('2021-07-02', 'YYYY-MM-DD').utc().startOf('day').unix();
        const allTokens = await prisma.prismaTokenPrice.findMany({
            distinct: ['tokenAddress'],
            orderBy: { timestamp: 'asc' },
        });
        const tokensToBackfill = allTokens.filter(
            (tokenPrice) =>
                tokenPrice.timestamp > backfillFrom ||
                tokenPrice.updatedAt.getTime() < moment().startOf('day').unix() * 1000,
        );

        console.log(tokensToBackfill.length);
        for (const token of tokensToBackfill) {
            if (token.timestamp > backfillFrom) {
                //https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1643033655&to=1645712055
                const tokenDefinition = await prisma.prismaToken.findUniqueOrThrow({
                    where: { address: token.tokenAddress },
                });

                const backFillTo = moment.unix(token.timestamp).startOf('day').unix();

                const normalizedTokenAddress = token.tokenAddress.toLowerCase();
                if (tokenDefinition.coingeckoTokenId) {
                    let response;
                    try {
                        response = await axios.get(
                            `https://api.coingecko.com/api/v3/coins/${tokenDefinition.coingeckoTokenId}/market_chart/range?vs_currency=usd&from=${backfillFrom}&to=${backFillTo}`,
                        );
                    } catch (e) {
                        console.log(`Got ratelimited, will sleep`);
                        await sleep(120000);
                        continue;
                    }

                    // const numberOfDaysToFill = (backFillTo - backfillFrom) / secondsPerDay;

                    // if (numberOfDaysToFill !== response.data.prices.length) {
                    //     console.log(
                    //         `Got ${numberOfDaysToFill} of days to fill but got ${response.data.prices.length} results.`,
                    //     );
                    // }

                    for (const priceData of response.data.prices) {
                        let timestamp = (priceData[0] - (priceData[0] % 1000)) / 1000;
                        const priceUsd = priceData[1];

                        const timestampDate = moment.unix(priceData[0]).utc();
                        if (
                            timestampDate.hour() !== 0 ||
                            timestampDate.minute() !== 0 ||
                            timestampDate.second() !== 0
                        ) {
                            timestamp = timestampDate.startOf('day').unix();
                            console.log(timestamp);
                        }

                        await prisma.prismaTokenPrice.upsert({
                            where: { tokenAddress_timestamp: { tokenAddress: normalizedTokenAddress, timestamp } },
                            update: { price: priceUsd, close: priceUsd },
                            create: {
                                tokenAddress: normalizedTokenAddress,
                                timestamp,
                                price: priceUsd,
                                high: priceUsd,
                                low: priceUsd,
                                open: priceUsd,
                                close: priceUsd,
                                coingecko: true,
                            },
                        });
                    }
                } else {
                    console.log(`No coingecko ID for ${token.tokenAddress}`);

                    // if it is a bpt, let's get price from subgraph
                    const pool = await prisma.prismaPool.findUnique({
                        where: { address: normalizedTokenAddress },
                    });
                    if (pool) {
                        // it's a bpt
                        for (
                            let timestamp = backfillFrom;
                            timestamp <= backFillTo;
                            timestamp = timestamp + secondsPerDay
                        ) {
                            const block = await blocksSubgraphService.getBlockForTimestamp(timestamp);

                            const { pool: poolAtBlock } = await balancerSubgraphService.getPool({
                                id: pool.id,
                                block: { number: parseInt(block.number) },
                            });

                            if (poolAtBlock) {
                                const priceUsd =
                                    parseFloat(poolAtBlock.totalLiquidity) / parseFloat(poolAtBlock.totalShares);
                                await prisma.prismaTokenPrice.upsert({
                                    where: {
                                        tokenAddress_timestamp: { tokenAddress: normalizedTokenAddress, timestamp },
                                    },
                                    update: { price: priceUsd, close: priceUsd },
                                    create: {
                                        tokenAddress: normalizedTokenAddress,
                                        timestamp,
                                        price: priceUsd,
                                        high: priceUsd,
                                        low: priceUsd,
                                        open: priceUsd,
                                        close: priceUsd,
                                        coingecko: false,
                                    },
                                });
                            }
                        }
                    } else {
                        console.log(`could not price ${token.tokenAddress}`);
                    }
                }
            } else {
                console.log(`dont backfill ${token.tokenAddress}`);
            }
        }
    }
}

export const tokenService = new TokenService(
    new TokenDataLoaderService(),
    new TokenPriceService([
        new BeetsPriceHandlerService(),
        ...(isFantomNetwork()
            ? [new FbeetsPriceHandlerService(networkConfig.fbeets!.address, networkConfig.fbeets!.poolId)]
            : []),
        ...(isFantomNetwork() ? [new ClqdrPriceHandlerService()] : []),
        new CoingeckoPriceHandlerService(networkConfig.weth.address, coingeckoService),
        new BptPriceHandlerService(),
        new LinearWrappedTokenPriceHandlerService(),
        new SwapsPriceHandlerService(),
    ]),
    new CoingeckoDataService(coingeckoService),
);
