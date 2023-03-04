import { env } from '../../app/env';
import { sanityClient } from '../sanity/sanity';
import { copperProxyService, CopperProxyService } from '../copper/copper-proxy.service';
import { getAddress } from 'ethers/lib/utils';
import { gnosisSafeService, GnosisSafeService } from '../gnosis/gnosis-safe.service';
import moment from 'moment-timezone';
import { tokenService } from '../token/token.service';
import { prisma } from '../../prisma/prisma-client';
import { isSameAddress } from '@balancer-labs/sdk';

type LbpCreateInput = {
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

type Lbp = {
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

type PriceData = {
    id: string;
    price: number;
    timestamp: number;
    type: 'REAL' | 'PREDICTED';
};

// predict 24 data points per default
const PREDICTION_TIME_STEP = 24;

export class LbpService {
    constructor(
        private readonly gnosisSafeService: GnosisSafeService,
        private readonly copperProxyService: CopperProxyService,
    ) {}

    public async createLbp(input: LbpCreateInput): Promise<Lbp> {
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

    public async getLbps(): Promise<Lbp[]> {
        return sanityClient.fetch(`*[_type == "lbp" && chainId == "${env.CHAIN_ID}"]`);
    }

    public async getLbp(id: string): Promise<Lbp> {
        const result = await sanityClient.fetch(
            `*[_type == "lbp" && chainId == "${env.CHAIN_ID}" && id == "${id}"][0]`,
        );

        if (!result) {
            throw new Error(`LBP with id ${id} not found`);
        }

        return result;
    }

    public async getLbpChartData(id: string): Promise<PriceData[]> {
        const lbp = await this.getLbp(id);
        const now = moment().unix();
        const startTimestamp = moment(lbp.startDate).unix();
        const endTimestamp = moment(lbp.endDate).unix();

        const hasEnded = now > endTimestamp;
        const hasStarted = now >= startTimestamp;

        let realPriceData: PriceData[] = [];
        let predictedPriceData: PriceData[] = [];

        if (hasStarted) {
            realPriceData = await this.getLbpRealPriceData(lbp);
        }

        if (!hasEnded) {
            // always predict the price with a PREDICTION_TIME_STEP step
            predictedPriceData = await this.getLbpChartPredictedPriceData(lbp);
        }

        return [...realPriceData, ...predictedPriceData];
    }

    /*
    Prediction of the price is fairly simple. We use the current collateral price, the current token balances and the changing token weights.
    The number of data points we predict is static set to PREDICTION_TIME_STEP but enforces a minimum of 1 data point per 12 hours and a maximum of
    1 datapoint per second.
    */
    private async getLbpChartPredictedPriceData(lbp: Lbp): Promise<PriceData[]> {
        const now = moment().unix();
        const startTimestamp = moment(lbp.startDate).unix();
        const endTimestamp = moment(lbp.endDate).unix();
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
        const { collateralBalance, tokenBalance } = await this.getCurrentPoolTokenBalances(lbp);
        const tokenPrices = await tokenService.getTokenPrices();
        const collateralTokenPrice = tokenService.getPriceForToken(tokenPrices, lbp.collateralTokenAddress);

        let { tokenWeight, collateralWeight } = this.getWeightsAtTime(
            firstPredictionTimestamp,
            lbp.tokenStartWeight,
            lbp.tokenEndWeight,
            lbp.collateralStartWeight,
            lbp.collateralEndWeight,
            startTimestamp,
            endTimestamp,
        );

        const priceData: PriceData[] = [];

        priceData.push({
            id: `${lbp.id}-predicted-${firstPredictionTimestamp}`,
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
                lbp.tokenStartWeight,
                lbp.tokenEndWeight,
                lbp.collateralStartWeight,
                lbp.collateralEndWeight,
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
                id: `${lbp.id}-${timestamp}`,
                price: tokenPrice,
                timestamp: timestamp,
                type: 'PREDICTED',
            });
        }

        priceData.push({
            id: `${lbp.id}-${endTimestamp}`,
            price: this.calculateLbpTokenPrice(
                lbp.tokenEndWeight,
                lbp.collateralEndWeight,
                tokenBalance,
                collateralBalance,
                collateralTokenPrice,
            ),
            timestamp: endTimestamp,
            type: 'PREDICTED',
        });

        return priceData;
    }

    private async getCurrentPoolTokenBalances(lbp: Lbp) {
        const poolTokens = await prisma.prismaPoolToken.findMany({
            where: { poolId: lbp.id },
            include: { dynamicData: true },
        });

        let tokenBalance = parseFloat(lbp.tokenAmount);
        let collateralBalance = parseFloat(lbp.collateralAmount);
        for (const poolToken of poolTokens) {
            if (isSameAddress(poolToken.address, lbp.tokenContractAddress)) {
                if (poolToken.dynamicData) {
                    tokenBalance = parseFloat(poolToken.dynamicData.balance);
                }
            }
            if (isSameAddress(poolToken.address, lbp.collateralTokenAddress)) {
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

    public async getLbpRealPriceData(lbp: Lbp): Promise<PriceData[]> {
        const startTimestamp = moment(lbp.startDate).unix();
        const endTimestamp = moment(lbp.endDate).unix();
        const swaps = await prisma.prismaPoolSwap.findMany({
            where: { poolId: lbp.id, timestamp: { gte: startTimestamp, lte: endTimestamp } },
            orderBy: { timestamp: 'asc' },
        });

        return swaps.map((swap) => {
            const price =
                swap.valueUSD /
                (swap.tokenIn === lbp.tokenContractAddress
                    ? parseFloat(swap.tokenAmountIn)
                    : parseFloat(swap.tokenAmountOut));

            return {
                id: `${lbp.id}-${swap.timestamp}`,
                price,
                timestamp: swap.timestamp,
                type: 'REAL',
            };
        });
    }
}

export const lbpService = new LbpService(gnosisSafeService, copperProxyService);
