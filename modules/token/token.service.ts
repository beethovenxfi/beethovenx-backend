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
import axios from 'axios';
import { sleep } from '../common/promise';
import { secondsPerDay } from '../common/time';
import { blocksSubgraphService } from '../subgraphs/blocks-subgraph/blocks-subgraph.service';
import { balancerSubgraphService } from '../subgraphs/balancer-subgraph/balancer-subgraph.service';
import { prismaBulkExecuteOperations } from '../../prisma/prisma-util';

const TOKEN_PRICES_CACHE_KEY = 'token:prices:current';
const TOKEN_PRICES_24H_AGO_CACHE_KEY = 'token:prices:24h-ago';
const ALL_TOKENS_CACHE_KEY = 'tokens:all';

interface PriceData {
    timestamp: number;
    price: number;
}

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

    public async updateAllHistoricalPrices() {
        // backfill daily data for all tokens (00:00 timestamp for previous day) since Oct 1st 2021
        const updateFromTimestamp = moment.unix(networkConfig.tokenPrices.maxDailyPriceHistoryTimestamp).unix();
        // only get tokens that don't have an oldest price yet and get the oldest historical price
        const tokensWithoutOldestPrice = await prisma.prismaToken.findMany({
            where: {
                historicalPrices: {
                    none: {
                        oldestPrice: true,
                    },
                },
            },
            select: {
                address: true,
                historicalPrices: {
                    orderBy: {
                        timestamp: 'asc',
                    },
                    take: 1,
                },
            },
        });

        // only update tokens which don't have historical prices or which are younger than what we request
        const tokensToUpdate = tokensWithoutOldestPrice.filter(
            (token) => token.historicalPrices.length === 0 || token.historicalPrices[0].timestamp > updateFromTimestamp,
        );

        console.log(`Updating ${tokensToUpdate.length} tokens`);
        let i = 0;
        for (const token of tokensToUpdate) {
            const tokenDefinition = await prisma.prismaToken.findUniqueOrThrow({
                where: { address: token.address },
            });

            // either update until to day or until the oldest price we have stored
            let updateToTimestamp = moment().utc().unix();
            if (token.historicalPrices.length > 0) {
                updateToTimestamp = token.historicalPrices[0].timestamp;
            }

            const normalizedTokenAddress = token.address.toLowerCase();
            if (tokenDefinition.coingeckoTokenId) {
                let retries = 1;
                let response;
                while (!response) {
                    try {
                        response = await axios.get(
                            // `https://api.coingecko.com/api/v3/coins/${tokenDefinition.coingeckoTokenId}/market_chart/range?vs_currency=usd&from=${backfillFrom}&to=${backFillTo}`,
                            `https://api.coingecko.com/api/v3/coins/${tokenDefinition.coingeckoTokenId}/market_chart?vs_currency=usd&days=max&interval=daily`,
                        );
                    } catch (e) {
                        console.log(`Got ratelimited, will sleep for ${2 * retries} minutes`);
                        await sleep(120000 * retries);
                        retries++;
                    }
                }

                const prices: PriceData[] = response.data.prices;

                let operations: any[] = [];
                for (const priceData of prices) {
                    // parse to second timestamp from milisecond timestamp
                    priceData.timestamp = priceData.timestamp / 1000;

                    // only update the needed timestamps
                    if (priceData.timestamp > updateToTimestamp || priceData.timestamp < updateFromTimestamp) {
                        continue;
                    }

                    //make sure the timestamp is midnight
                    const timestampDate = moment.unix(priceData.timestamp).utc();
                    if (timestampDate.hour() !== 0 || timestampDate.minute() !== 0 || timestampDate.second() !== 0) {
                        priceData.timestamp = timestampDate.startOf('day').unix();
                    }

                    operations.push(
                        prisma.prismaTokenHistoricalPrice.upsert({
                            where: {
                                tokenAddress_timestamp: {
                                    tokenAddress: normalizedTokenAddress,
                                    timestamp: priceData.timestamp,
                                },
                            },
                            update: { price: priceData.price },
                            create: {
                                tokenAddress: normalizedTokenAddress,
                                timestamp: priceData.timestamp,
                                price: priceData.price,
                                coingecko: true,
                                // we get the max number of days from coingecko, it is the oldest price if there is no older on coingecko
                                oldestPrice: priceData.timestamp === prices[0].timestamp,
                            },
                        }),
                    );
                }
                await prismaBulkExecuteOperations(operations);
            } else {
                const pool = await prisma.prismaPool.findUnique({
                    where: { address: normalizedTokenAddress },
                });
                // if it is a bpt, get the prices from subgraph for each day
                if (pool) {
                    const operations: any[] = [];
                    let oldestPrice = true;
                    for (
                        let timestamp = updateFromTimestamp;
                        timestamp <= updateToTimestamp;
                        timestamp = timestamp + secondsPerDay
                    ) {
                        let block;
                        try {
                            block = await blocksSubgraphService.getBlockForTimestamp(timestamp);
                        } catch (e) {
                            oldestPrice = false;
                            continue;
                        }

                        const { pool: poolAtBlock } = await balancerSubgraphService.getPool({
                            id: pool.id,
                            block: { number: parseInt(block.number) },
                        });

                        if (poolAtBlock) {
                            const priceUsd =
                                parseFloat(poolAtBlock.totalLiquidity) / parseFloat(poolAtBlock.totalShares);
                            operations.push(
                                prisma.prismaTokenHistoricalPrice.upsert({
                                    where: {
                                        tokenAddress_timestamp: { tokenAddress: normalizedTokenAddress, timestamp },
                                    },
                                    update: { price: priceUsd },
                                    create: {
                                        tokenAddress: normalizedTokenAddress,
                                        timestamp,
                                        price: priceUsd,
                                        coingecko: false,
                                        oldestPrice: oldestPrice,
                                    },
                                }),
                            );
                            oldestPrice = false;
                        }
                    }
                    await prismaBulkExecuteOperations(operations);
                }
            }
            i++;
            if (i % 100 === 0) {
                console.log(`Updated ${i} tokens`);
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
