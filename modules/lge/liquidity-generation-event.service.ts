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
        const realPriceData = await this.getLgeChartTokenPriceData(id, steps);
        const predictedPriceData = await this.getLgeChartPredictedPriceData(id, steps);
        return [...realPriceData, ...predictedPriceData];
    }

    public async getLgeChartPredictedPriceData(id: string, steps: number): Promise<PriceData[]> {
        const lge = await this.getLiquidityGenerationEvent(id);

        const collateralToken = lge.collateralTokenAddress.toLowerCase();
        const lgeEndTimestamp = moment(lge.endDate).unix();
        const now = moment().unix();
        const hasEnded = now > lgeEndTimestamp;

        if (hasEnded) {
            return [];
        }

        const endTime = hasEnded ? lgeEndTimestamp : now;
        const startTimestamp = moment(lge.startDate).unix();
        const hasStarted = now > startTimestamp;
        const endTimestamp = hasEnded ? lgeEndTimestamp : now;
        let tokenBalance = parseFloat(lge.tokenAmount);
        let collateralBalance = parseFloat(lge.collateralAmount);
        const timeStep = Math.floor((endTime - startTimestamp) / steps);

        const tokenPrices = await tokenService.getTokenPrices();
        const collateralTokenPrice = tokenService.getPriceForToken(tokenPrices, collateralToken);
        let { tokenWeight, collateralWeight } = getWeightsAtTime(
            now,
            lge.tokenStartWeight,
            lge.tokenEndWeight,
            lge.collateralStartWeight,
            lge.collateralEndWeight,
            startTimestamp,
            endTimestamp,
        );

        const tokenWeightStep = (tokenWeight - lge.tokenEndWeight) / steps;
        const collateralWeightStep = (lge.collateralEndWeight - collateralWeight) / steps;

        const firstTime = hasStarted ? startTimestamp : moment().unix();

        const priceData: PriceData[] = [];
        priceData.push({
            price: calculateLbpTokenPrice(
                tokenWeight,
                collateralWeight,
                collateralBalance,
                tokenBalance,
                collateralTokenPrice,
            ),
            timestamp: firstTime,
            type: 'PREDICTED',
        });
        let timestamp = firstTime;

        while (timestamp + timeStep < endTime) {
            timestamp = timestamp + timeStep;
            tokenWeight -= tokenWeightStep;
            collateralWeight += collateralWeightStep;

            const tokenPrice = calculateLbpTokenPrice(
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
            price: calculateLbpTokenPrice(
                lge.tokenEndWeight,
                lge.collateralEndWeight,
                collateralBalance,
                tokenBalance,
                collateralTokenPrice,
            ),
            timestamp: endTime,
            type: 'PREDICTED',
        });

        return priceData;
    }

    public async getLgeChartTokenPriceData(id: string, steps: number): Promise<PriceData[]> {
        const lge = await this.getLiquidityGenerationEvent(id);

        const launchToken = lge.tokenContractAddress.toLowerCase();
        const collateralToken = lge.collateralTokenAddress.toLowerCase();
        const lgeEndTimestamp = moment(lge.endDate).unix();
        const now = moment().unix();
        const hasEnded = now > lgeEndTimestamp;
        const endTime = hasEnded ? lgeEndTimestamp : now;
        const startTimestamp = moment(lge.startDate).unix();
        const hasStarted = now > startTimestamp;

        if (!hasStarted) {
            return [];
        }

        const endTimestamp = hasEnded ? lgeEndTimestamp : now;
        let tokenBalance = parseFloat(lge.tokenAmount);
        let collateralBalance = parseFloat(lge.collateralAmount);
        const timeStep = Math.floor((endTime - startTimestamp) / steps);

        // TODO would need historical data for this to be accurate
        const tokenPrices = await tokenService.getTokenPrices();
        let collateralTokenPrice = tokenService.getPriceForToken(tokenPrices, collateralToken);

        const priceData: PriceData[] = [];
        let timestamp = startTimestamp;

        while (timestamp <= endTimestamp) {
            const { tokenWeight, collateralWeight } = getWeightsAtTime(
                timestamp,
                lge.tokenStartWeight,
                lge.tokenEndWeight,
                lge.collateralStartWeight,
                lge.collateralEndWeight,
                startTimestamp,
                lgeEndTimestamp,
            );

            priceData.push({
                price: calculateLbpTokenPrice(
                    tokenWeight,
                    collateralWeight,
                    collateralBalance,
                    tokenBalance,
                    collateralTokenPrice,
                ),
                timestamp: timestamp,
                type: 'REAL',
            });

            const filtered = await getSwapsInTimeRange(lge.id, timestamp, timestamp + timeStep);

            for (const swap of filtered) {
                const amountIn = parseFloat(swap.tokenAmountIn);
                const amountOut = parseFloat(swap.tokenAmountOut);

                tokenBalance += swap.tokenIn === launchToken ? amountIn : -amountOut;
                collateralBalance += swap.tokenIn === collateralToken ? amountIn : -amountOut;
                collateralTokenPrice =
                    swap.tokenIn === collateralToken
                        ? swap.valueUSD / parseFloat(swap.tokenAmountIn)
                        : swap.valueUSD / parseFloat(swap.tokenAmountOut);

                const { tokenWeight, collateralWeight } = getWeightsAtTime(
                    swap.timestamp,
                    lge.tokenStartWeight,
                    lge.tokenEndWeight,
                    lge.collateralStartWeight,
                    lge.collateralEndWeight,
                    startTimestamp,
                    lgeEndTimestamp,
                );

                priceData.push({
                    price: calculateLbpTokenPrice(
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
}

function getWeightsAtTime(
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
    const collateralWeight = collateralStartWeight - (collateralStartWeight - collateralEndWeight) * percentComplete;

    return { tokenWeight, collateralWeight };
}

function calculateLbpTokenPrice(
    tokenWeight: number,
    collateralWeight: number,
    tokenBalance: number,
    collateralBalance: number,
    collateralTokenPrice: number,
): number {
    return (((tokenWeight / collateralWeight) * collateralBalance) / tokenBalance) * collateralTokenPrice;
}

function getSwapsInTimeRange(poolId: string, startTimestamp: number, endTimestamp: number) {
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

export const liquidityGenerationEventService = new LiquidityGenerationEventService(
    gnosisSafeService,
    copperProxyService,
    tokenService,
);
