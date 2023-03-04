import { env } from '../../app/env';
import { sanityClient } from '../sanity/sanity';
import { copperProxyService, CopperProxyService } from '../copper/copper-proxy.service';
import { getAddress } from 'ethers/lib/utils';
import { gnosisSafeService, GnosisSafeService } from '../gnosis/gnosis-safe.service';
import moment from 'moment-timezone';
import { tokenService } from '../token/token.service';
import { prisma } from '../../prisma/prisma-client';
import { isSameAddress } from '@balancer-labs/sdk';

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

// predict 24 data points per default
const PREDICTION_TIME_STEP = 24;

export class LiquidityGenerationEventService {
    constructor(
        private readonly gnosisSafeService: GnosisSafeService,
        private readonly copperProxyService: CopperProxyService,
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
        const now = moment().unix();
        const startTimestamp = moment(lge.startDate).unix();
        const endTimestamp = moment(lge.endDate).unix();

        const hasEnded = now > endTimestamp;
        const hasStarted = now >= startTimestamp;

        let realPriceData: PriceData[] = [];
        let predictedPriceData: PriceData[] = [];

        if (hasStarted) {
            realPriceData = await this.getLgeRealPriceData(lge);
        }

        if (!hasEnded) {
            // always predict the price with a PREDICTION_TIME_STEP step
            predictedPriceData = await this.getLgeChartPredictedPriceData(lge);
        }

        return [...realPriceData, ...predictedPriceData];
    }

    /*
    Prediction of the price is fairly simple. We use the current collateral price, the current token balances and the changing token weights.
    The number of data points we predict is static set to PREDICTION_TIME_STEP but enforces a minimum of 1 data point per 12 hours and a maximum of
    1 datapoint per second.
    */
    private async getLgeChartPredictedPriceData(lge: LiquidityGenerationEvent): Promise<PriceData[]> {
        const now = moment().unix();
        const startTimestamp = moment(lge.startDate).unix();
        const endTimestamp = moment(lge.endDate).unix();
        const hasStarted = now > startTimestamp;
        const firstPredictionTimestamp = hasStarted ? now : startTimestamp;
        const secondsRemaining = endTimestamp - firstPredictionTimestamp;
        const TWELVE_HOURS_IN_SECONDS = 43200;

        let predictionInterval = Math.floor(secondsRemaining / PREDICTION_TIME_STEP);
        if (predictionInterval === 0) {
            predictionInterval = 1;
        }
        if (predictionInterval > TWELVE_HOURS_IN_SECONDS) {
            predictionInterval = TWELVE_HOURS_IN_SECONDS;
        }
        // for the prediction, we use the current token price of the collateral token as well as the current token balances
        const { collateralBalance, tokenBalance } = await this.getCurrentPoolTokenBalances(lge);
        const tokenPrices = await tokenService.getTokenPrices();
        const collateralTokenPrice = tokenService.getPriceForToken(tokenPrices, lge.collateralTokenAddress);

        let { tokenWeight, collateralWeight } = this.getWeightsAtTime(
            firstPredictionTimestamp,
            lge.tokenStartWeight,
            lge.tokenEndWeight,
            lge.collateralStartWeight,
            lge.collateralEndWeight,
            startTimestamp,
            endTimestamp,
        );

        const priceData: PriceData[] = [];

        priceData.push({
            price: this.calculateLbpTokenPrice(
                tokenWeight,
                collateralWeight,
                tokenBalance,
                collateralBalance,
                collateralTokenPrice,
            ),
            timestamp: firstPredictionTimestamp,
            type: 'PREDICTED',
        });

        let timestamp = firstPredictionTimestamp;

        while (timestamp + predictionInterval < endTimestamp) {
            timestamp = timestamp + predictionInterval;
            let { tokenWeight, collateralWeight } = this.getWeightsAtTime(
                timestamp,
                lge.tokenStartWeight,
                lge.tokenEndWeight,
                lge.collateralStartWeight,
                lge.collateralEndWeight,
                startTimestamp,
                endTimestamp,
            );

            const tokenPrice = this.calculateLbpTokenPrice(
                tokenWeight,
                collateralWeight,
                tokenBalance,
                collateralBalance,
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
                tokenBalance,
                collateralBalance,
                collateralTokenPrice,
            ),
            timestamp: endTimestamp,
            type: 'PREDICTED',
        });

        return priceData;
    }

    private async getCurrentPoolTokenBalances(lge: LiquidityGenerationEvent) {
        const poolTokens = await prisma.prismaPoolToken.findMany({
            where: { poolId: lge.id },
            include: { dynamicData: true },
        });

        let tokenBalance = parseFloat(lge.tokenAmount);
        let collateralBalance = parseFloat(lge.collateralAmount);
        for (const poolToken of poolTokens) {
            if (isSameAddress(poolToken.address, lge.tokenContractAddress)) {
                if (poolToken.dynamicData) {
                    tokenBalance = parseFloat(poolToken.dynamicData.balance);
                }
            }
            if (isSameAddress(poolToken.address, lge.collateralTokenAddress)) {
                if (poolToken.dynamicData) {
                    collateralBalance = parseFloat(poolToken.dynamicData.balance);
                }
            }
        }
        return { collateralBalance, tokenBalance };
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

    // TODO need to do this with BN
    private calculateLbpTokenPrice(
        tokenWeight: number,
        collateralWeight: number,
        tokenBalance: number,
        collateralBalance: number,
        collateralTokenPrice: number,
    ): number {
        return (((tokenWeight / collateralWeight) * collateralBalance) / tokenBalance) * collateralTokenPrice;
    }

    public async getLgeRealPriceData(lge: LiquidityGenerationEvent): Promise<PriceData[]> {
        const swaps = await prisma.prismaPoolSwap.findMany({ where: { poolId: lge.id } });

        return swaps.map((swap) => {
            const price =
                swap.valueUSD /
                (swap.tokenIn === lge.tokenContractAddress
                    ? parseFloat(swap.tokenAmountIn)
                    : parseFloat(swap.tokenAmountOut));

            return {
                price,
                timestamp: swap.timestamp,
                type: 'REAL',
            };
        });
    }
}

export const liquidityGenerationEventService = new LiquidityGenerationEventService(
    gnosisSafeService,
    copperProxyService,
);
