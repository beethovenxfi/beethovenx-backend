import { TokenPriceHandler } from '../../token-types';
import { PrismaTokenWithTypes } from '../../../../prisma/prisma-types';
import { prisma } from '../../../../prisma/prisma-client';
import { timestampRoundedUpToNearestHour } from '../../../common/time';
import { CoingeckoService } from '../../../coingecko/coingecko.service';

export class CoingeckoPriceHandlerService implements TokenPriceHandler {
    public readonly exitIfFails = true;
    public readonly id = 'CoingeckoPriceHandlerService';

    constructor(
        private readonly nativeAssetId: string,
        private readonly platformId: string,
        private readonly weth: string,
        private readonly coingeckoService: CoingeckoService,
    ) {}

    public async getAcceptedTokens(tokens: PrismaTokenWithTypes[]): Promise<string[]> {
        return tokens
            .filter(
                (token) =>
                    !token.types.includes('BPT') &&
                    !token.types.includes('PHANTOM_BPT') &&
                    !token.types.includes('LINEAR_WRAPPED_TOKEN'),
            )
            .map((token) => token.address);
    }

    public async updatePricesForTokens(tokens: PrismaTokenWithTypes[]): Promise<string[]> {
        const timestamp = timestampRoundedUpToNearestHour();
        const nativeAsset = tokens.find((token) => token.address === this.weth);
        const tokensUpdated: string[] = [];

        if (nativeAsset) {
            const price = await this.coingeckoService.getNativeAssetPrice();
            const usdPrice = price.usd;

            if (typeof usdPrice === 'undefined') {
                throw new Error('failed to load native asset price');
            }

            await prisma.prismaTokenPrice.upsert({
                where: { tokenAddress_timestamp: { tokenAddress: this.weth, timestamp } },
                update: { price: usdPrice, close: usdPrice },
                create: {
                    tokenAddress: this.weth,
                    timestamp,
                    price: usdPrice,
                    high: usdPrice,
                    low: usdPrice,
                    open: usdPrice,
                    close: usdPrice,
                },
            });

            tokensUpdated.push(this.weth);
        }

        const tokenPricesByAddress = await this.coingeckoService.getTokenPrices(tokens.map((item) => item.address));

        let operations: any[] = [];
        for (let tokenAddress of Object.keys(tokenPricesByAddress)) {
            const priceUsd = tokenPricesByAddress[tokenAddress].usd;
            operations.push(
                prisma.prismaTokenPrice.upsert({
                    where: { tokenAddress_timestamp: { tokenAddress: tokenAddress, timestamp } },
                    update: { price: priceUsd, close: priceUsd },
                    create: {
                        tokenAddress: tokenAddress,
                        timestamp,
                        price: priceUsd,
                        high: priceUsd,
                        low: priceUsd,
                        open: priceUsd,
                        close: priceUsd,
                        coingecko: true,
                    },
                }),
            );

            operations.push(
                prisma.prismaTokenCurrentPrice.upsert({
                    where: { tokenAddress: tokenAddress },
                    update: { price: priceUsd },
                    create: {
                        tokenAddress: tokenAddress,
                        timestamp,
                        price: priceUsd,
                        coingecko: true,
                    },
                }),
            );

            tokensUpdated.push(tokenAddress);
        }

        await Promise.all(operations);

        return tokensUpdated;
    }

    // private async getNativeAssetPrice(): Promise<number | undefined> {
    //     const response = await this.get<CoingeckoPriceResponse>(
    //         `/simple/price?ids=${this.nativeAssetId}&vs_currencies=${FIAT_PARAM}`,
    //     );
    //
    //     return response[this.nativeAssetId].usd;
    // }
    //
    // private async getPricesForTokenAddresses(addresses: string[], platformId: string): Promise<CoingeckoPriceResponse> {
    //     const endpoint = `/simple/token_price/${platformId}?contract_addresses=${addresses}&vs_currencies=${FIAT_PARAM}`;
    //
    //     return this.get<CoingeckoPriceResponse>(endpoint);
    // }
    //
    // private async get<T>(endpoint: string): Promise<T> {
    //     const { data } = await axios.get(BASE_URL + endpoint);
    //     return data;
    // }
}
