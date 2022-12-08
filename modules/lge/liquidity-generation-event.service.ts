import { env } from '../../app/env';
import { sanityClient } from '../sanity/sanity';
import { copperProxyService, CopperProxyService } from '../copper/copper-proxy.service';
import { getAddress } from 'ethers/lib/utils';
import { gnosisSafeService, GnosisSafeService } from '../gnosis/gnosis-safe.service';
import moment from 'moment';
import { prisma } from '../../prisma/prisma-client';
import { TokenService, tokenService } from '../token/token.service';

export type LiquidityGenerationCreateInput = {
    id: string;
    address: string;
    bannerImageUrl: string;
    collateralAmount: string;
    collateralEndWeight: number;
    collateralStartWeight: number;
    collateralTokenAddress: string;
    description: string;
    discordUrl: string;
    endDate: string;
    mediumUrl: string;
    name: string;
    startDate: string;
    swapFeePercentage: string;
    telegramUrl: string;
    tokenAmount: string;
    tokenContractAddress: string;
    tokenEndWeight: number;
    tokenIconUrl: string;
    tokenStartWeight: number;
    twitterUrl: string;
    websiteUrl: string;
};

export type LiquidityGenerationEvent = {
    id: string;
    address: string;
    name: string;
    description: string;
    tokenContractAddress: string;
    collateralTokenAddress: string;
    tokenAmount: string;
    collateralAmount: string;
    tokenStartWeight: number;
    collateralStartWeight: number;
    tokenEndWeight: number;
    collateralEndWeight: number;
    swapFeePercentage: string;
    websiteUrl: string;
    tokenIconUrl: string;
    twitterUrl: string;
    mediumUrl: string;
    discordUrl: string;
    telegramUrl: string;
    startDate: string;
    endDate: string;
    bannerImageUrl: string;
    adminAddress: string;
    adminIsMultisig: boolean;
};

export type PriceData = {
    price: number;
    timestamp: number;
    type: 'REAL' | 'PREDICTED';
};

export class LiquidityGenerationEventService {
    constructor(
        private readonly gnosisSafeService: GnosisSafeService,
        private readonly copperProxyService: CopperProxyService,
        private readonly tokenService: TokenService,
    ) {}
    public async createLiquidityGenerationEvent(
        input: LiquidityGenerationCreateInput,
    ): Promise<LiquidityGenerationEvent> {
        const poolOwner = await this.copperProxyService.getLbpPoolOwner(getAddress(input.address));
        const adminIsMultisig = await this.gnosisSafeService.isAddressGnosisSafe(getAddress(poolOwner));

        return sanityClient.create({
            _type: 'lbp',
            _id: input.id,
            id: input.id,
            address: input.address,
            name: input.name,
            websiteUrl: input.websiteUrl,
            tokenIconUrl: input.tokenIconUrl,
            bannerImageUrl: input.bannerImageUrl,
            twitterUrl: input.twitterUrl,
            mediumUrl: input.mediumUrl,
            discordUrl: input.discordUrl,
            telegramUrl: input.telegramUrl,
            description: input.description,
            startDate: input.startDate,
            endDate: input.endDate,
            tokenContractAddress: input.tokenContractAddress,
            collateralTokenAddress: input.collateralTokenAddress,
            tokenAmount: input.tokenAmount,
            collateralAmount: input.collateralAmount,
            tokenStartWeight: input.tokenStartWeight,
            collateralStartWeight: input.collateralStartWeight,
            tokenEndWeight: input.tokenEndWeight,
            collateralEndWeight: input.collateralEndWeight,
            swapFeePercentage: input.swapFeePercentage,
            adminAddress: poolOwner,
            adminIsMultisig,
            chainId: env.CHAIN_ID,
        });
    }

    public async getLges(): Promise<LiquidityGenerationEvent[]> {
        return sanityClient.fetch(`*[_type == "lbp" && chainId == "${env.CHAIN_ID}"]`);
    }

    public async getLiquidityGenerationEvent(id: string): Promise<LiquidityGenerationEvent> {
        const result = await sanityClient.fetch(
            `*[_type == "lbp" && chainId == "${env.CHAIN_ID}" && id == "${id}"][0]`,
        );
        if (!result) {
            throw new Error(`Liquidity generation event with id ${id} not found`);
        }
        return result;
    }

    public async getLgeChartData(id: string, steps: number): Promise<PriceData[]> {
        const lge = await this.getLiquidityGenerationEvent(id);
        const startTimestamp = moment(lge.startDate).unix();
        const lgeEndTimestamp = moment(lge.endDate).unix();
        const now = moment().unix();
        const hasEnded = now > lgeEndTimestamp;
        const hasStarted = now > startTimestamp;

        let realPriceData: PriceData[] = [];
        let predictedPriceData: PriceData[] = [];
        if (hasStarted) {
            realPriceData = await this.getLgeChartRealPriceData(lge, steps);
        }
        if (!hasEnded) {
            // always predict the price with a one-minute step
            predictedPriceData = await this.getLgeChartPredictedPriceData(lge, steps);
        }
        return [...realPriceData, ...predictedPriceData];
    }

    private async getLgeChartRealPriceData(lge: LiquidityGenerationEvent, steps: number): Promise<PriceData[]> {
        const launchToken = lge.tokenContractAddress.toLowerCase();
        const collateralToken = lge.collateralTokenAddress.toLowerCase();
        const lgeEndTimestamp = moment(lge.endDate).unix();
        const now = moment().unix();
        const hasEnded = now > lgeEndTimestamp;
        const endTime = hasEnded ? lgeEndTimestamp : now;
        const startTimestamp = moment(lge.startDate).unix();

        const endTimestamp = hasEnded ? lgeEndTimestamp : now;
        let tokenBalance = parseFloat(lge.tokenAmount);
        let collateralBalance = parseFloat(lge.collateralAmount);
        const timeStep = Math.floor((endTime - startTimestamp) / steps);

        // TODO would need historical data for this to be accurate
        const tokenPrices = await tokenService.getTokenPrices();
        let collateralTokenPrice = tokenService.getPriceForToken(tokenPrices, collateralToken);
        // let collateralTokenPrice = 1.7;

        const priceData: PriceData[] = [];
        let timestamp = startTimestamp;

        while (timestamp <= endTimestamp) {
            const { tokenWeight, collateralWeight } = this.getWeightsAtTime(
                timestamp,
                lge.tokenStartWeight,
                lge.tokenEndWeight,
                lge.collateralStartWeight,
                lge.collateralEndWeight,
                startTimestamp,
                lgeEndTimestamp,
            );

            priceData.push({
                price: this.calculateLbpTokenPrice(
                    tokenWeight,
                    collateralWeight,
                    collateralBalance,
                    tokenBalance,
                    collateralTokenPrice,
                ),
                timestamp: timestamp,
                type: 'REAL',
            });

            const filtered = await this.getSwapsInTimeRange(lge.id, timestamp, timestamp + timeStep);

            for (const swap of filtered) {
                const amountIn = parseFloat(swap.tokenAmountIn);
                const amountOut = parseFloat(swap.tokenAmountOut);

                tokenBalance += swap.tokenIn === launchToken ? amountIn : -amountOut;
                collateralBalance += swap.tokenIn === collateralToken ? amountIn : -amountOut;
                collateralTokenPrice =
                    swap.tokenIn === collateralToken
                        ? swap.valueUSD / parseFloat(swap.tokenAmountIn)
                        : swap.valueUSD / parseFloat(swap.tokenAmountOut);

                const { tokenWeight, collateralWeight } = this.getWeightsAtTime(
                    swap.timestamp,
                    lge.tokenStartWeight,
                    lge.tokenEndWeight,
                    lge.collateralStartWeight,
                    lge.collateralEndWeight,
                    startTimestamp,
                    lgeEndTimestamp,
                );

                priceData.push({
                    price: this.calculateLbpTokenPrice(
                        tokenWeight,
                        collateralWeight,
                        collateralBalance,
                        tokenBalance,
                        collateralTokenPrice,
                    ),
                    timestamp: swap.timestamp,
                    type: 'REAL',
                });
            }

            timestamp += timeStep;
        }

        return priceData;
    }

    private async getLgeChartPredictedPriceData(lge: LiquidityGenerationEvent, steps: number): Promise<PriceData[]> {
        // use a defined step of one minute for prediction?

        const collateralToken = lge.collateralTokenAddress.toLowerCase();
        const lgeEndTimestamp = moment(lge.endDate).unix();
        const now = moment().unix();
        const startTimestamp = moment(lge.startDate).unix();
        const hasStarted = now > startTimestamp;

        // get starting balance directly from DB if event has started? will be initial balance if event is not started, so ok
        const tokenBalance = parseFloat(lge.tokenAmount);
        const collateralBalance = parseFloat(lge.collateralAmount);
        const timeStep = Math.floor((lgeEndTimestamp - startTimestamp) / steps);

        // also use the current price of the collateral token, that is fine.
        const tokenPrices = await tokenService.getTokenPrices();
        const collateralTokenPrice = tokenService.getPriceForToken(tokenPrices, collateralToken);

        const firstPredictionTimestamp = hasStarted ? moment().unix() : startTimestamp;

        let { tokenWeight, collateralWeight } = this.getWeightsAtTime(
            firstPredictionTimestamp,
            lge.tokenStartWeight,
            lge.tokenEndWeight,
            lge.collateralStartWeight,
            lge.collateralEndWeight,
            startTimestamp,
            lgeEndTimestamp,
        );

        const tokenWeightStep = (tokenWeight - lge.tokenEndWeight) / steps;
        const collateralWeightStep = (lge.collateralEndWeight - collateralWeight) / steps;

        const priceData: PriceData[] = [];
        priceData.push({
            price: this.calculateLbpTokenPrice(
                tokenWeight,
                collateralWeight,
                collateralBalance,
                tokenBalance,
                collateralTokenPrice,
            ),
            timestamp: firstPredictionTimestamp,
            type: 'PREDICTED',
        });
        let timestamp = firstPredictionTimestamp;

        while (timestamp + timeStep < lgeEndTimestamp) {
            timestamp = timestamp + timeStep;
            tokenWeight -= tokenWeightStep;
            collateralWeight += collateralWeightStep;

            const tokenPrice = this.calculateLbpTokenPrice(
                tokenWeight,
                collateralWeight,
                collateralBalance,
                tokenBalance,
                collateralTokenPrice,
            );

            priceData.push({
                price: tokenPrice,
                timestamp: timestamp,
                type: 'PREDICTED',
            });
        }

        priceData.push({
            price: this.calculateLbpTokenPrice(
                lge.tokenEndWeight,
                lge.collateralEndWeight,
                collateralBalance,
                tokenBalance,
                collateralTokenPrice,
            ),
            timestamp: lgeEndTimestamp,
            type: 'PREDICTED',
        });

        return priceData;
    }

    private getWeightsAtTime(
        timestamp: number,
        tokenStartWeight: number,
        tokenEndWeight: number,
        collateralStartWeight: number,
        collateralEndWeight: number,
        startTimestamp: number,
        endTimestamp: number,
    ): { tokenWeight: number; collateralWeight: number } {
        const percentComplete = (timestamp - startTimestamp) / (endTimestamp - startTimestamp);

        const tokenWeight = tokenStartWeight - (tokenStartWeight - tokenEndWeight) * percentComplete;
        const collateralWeight =
            collateralStartWeight - (collateralStartWeight - collateralEndWeight) * percentComplete;

        return { tokenWeight, collateralWeight };
    }

    private calculateLbpTokenPrice(
        tokenWeight: number,
        collateralWeight: number,
        tokenBalance: number,
        collateralBalance: number,
        collateralTokenPrice: number,
    ): number {
        return (((tokenWeight / collateralWeight) * collateralBalance) / tokenBalance) * collateralTokenPrice;
    }

    private getSwapsInTimeRange(poolId: string, startTimestamp: number, endTimestamp: number) {
        return prisma.prismaPoolSwap.findMany({
            where: {
                poolId: poolId,
                timestamp: {
                    gt: startTimestamp,
                    lte: endTimestamp,
                },
            },
        });
    }
}

export const liquidityGenerationEventService = new LiquidityGenerationEventService(
    gnosisSafeService,
    copperProxyService,
    tokenService,
);
