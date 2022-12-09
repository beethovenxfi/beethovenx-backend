import { env } from '../../app/env';
import { copperProxyService, CopperProxyService } from '../copper/copper-proxy.service';
import { getAddress } from 'ethers/lib/utils';
import { gnosisSafeService, GnosisSafeService } from '../gnosis/gnosis-safe.service';
import moment from 'moment';
import { prisma } from '../../prisma/prisma-client';
import { TokenService, tokenService } from '../token/token.service';
import { isSameAddress } from '@balancer-labs/sdk';
import { networkConfig } from '../config/network-config';
import { getContractAt, jsonRpcProvider } from '../web3/contract';
import VaultAbi from '../pool/abi/Vault.json';

export type LiquidityGenerationCreateInput = {
    id: string;
    address: string;
    name: string;
    websiteUrl: string;
    tokenIconUrl: string;
    bannerImageUrl: string;
    twitterUrl: string;
    mediumUrl: string;
    discordUrl: string;
    telegramUrl: string;
    description: string;
    startTimestamp: number;
    endTimestamp: number;
    tokenAddress: string;
    tokenAmount: string;
    tokenEndWeight: number;
    tokenStartWeight: number;
    collateralAddress: string;
    collateralAmount: string;
    collateralStartWeight: number;
    collateralEndWeight: number;
    swapFee: string;
};

export type LiquidityGenerationEvent = {
    id: string;
    address: string;
    name: string;
    websiteUrl: string;
    tokenIconUrl: string;
    bannerImageUrl: string;
    twitterUrl: string;
    mediumUrl: string;
    discordUrl: string;
    telegramUrl: string;
    description: string;
    startTimestamp: number;
    endTimestamp: number;
    tokenAddress: string;
    tokenAmount: string;
    tokenStartWeight: number;
    tokenEndWeight: number;
    collateralAddress: string;
    collateralAmount: string;
    collateralStartWeight: number;
    collateralEndWeight: number;
    swapFee: string;
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

    // predict 24 data points per default
    readonly PREDICTION_TIME_STEP = 24;

    public async createLiquidityGenerationEvent(
        input: LiquidityGenerationCreateInput,
    ): Promise<LiquidityGenerationEvent> {
        const poolOwner = await this.copperProxyService.getLbpPoolOwner(getAddress(input.address));
        const adminIsMultisig = await this.gnosisSafeService.isAddressGnosisSafe(getAddress(poolOwner));

        await prisma.prismaLge.create({
            data: {
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
                startTimestamp: input.startTimestamp,
                endTimestamp: input.endTimestamp,
                tokenAddress: input.tokenAddress.toLowerCase(),
                tokenAmount: input.tokenAmount,
                tokenStartWeight: input.tokenStartWeight,
                tokenEndWeight: input.tokenEndWeight,
                collateralAddress: input.collateralAddress.toLowerCase(),
                collateralAmount: input.collateralAmount,
                collateralStartWeight: input.collateralStartWeight,
                collateralEndWeight: input.collateralEndWeight,
                swapFee: input.swapFee,
                adminAddress: poolOwner,
                adminIsMultisig,
                chainId: env.CHAIN_ID,
            },
        });

        return prisma.prismaLge.findUnique({
            where: { id: input.id },
            rejectOnNotFound: true,
        });
    }

    public async getLges(): Promise<LiquidityGenerationEvent[]> {
        return prisma.prismaLge.findMany();
    }

    public async getLiquidityGenerationEvent(id: string): Promise<LiquidityGenerationEvent> {
        return prisma.prismaLge.findUnique({
            where: { id: id },
            rejectOnNotFound: true,
        });
    }

    public async getLgeChartData(id: string, steps: number): Promise<PriceData[]> {
        const lge = await this.getLiquidityGenerationEvent(id);
        const now = moment().unix();
        const hasEnded = now > lge.endTimestamp;
        const hasStarted = now >= lge.startTimestamp;

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

    // TODO: do we need to consider token decimals when calculating and predicting prices from weights?

    /*
    For each running LGE, this method persists the real price for the launch token. It uses two methods for this:
    1) If there were no swaps since it was called previously, it will persist one real price using the current token balances, current token weights
       as well as the current collateral price from the DB (coingecko).
    2) If there were swaps on the pool, it will get the persist one real price for each swap that happened. It will use the token balances and token weights 
       at the blocknumber of the swap, and the current collateral price from the DB (coingecko).

    Please note: Since it uses current pricing for the collateral, this method should be called regularly in short intervalls to make sure that heavy price movements
    of the collateral token are captured. In addition, it should also be called regularly to create a "real-time" user experience.
    */
    public async syncLgeRealPriceData() {
        const now = moment().unix();
        const lges = await this.getLges();
        for (const lge of lges) {
            // check if lge is running
            if (now >= lge.startTimestamp && now <= lge.endTimestamp) {
                const tokenPrices = await tokenService.getTokenPrices();
                const latestPriceData = await prisma.prismaLgePriceData.findMany({
                    where: { id: lge.id },
                    orderBy: { timestamp: 'desc' },
                });
                let lastSyncedBlockNumber = 0;
                if (latestPriceData.length > 0) {
                    lastSyncedBlockNumber = latestPriceData[0].blockNumber;
                }
                const latestBlockNumber = await jsonRpcProvider.getBlockNumber();

                const vaulContract = getContractAt(networkConfig.balancer.vault, VaultAbi);
                const filter = vaulContract.filters.Swap({ address: networkConfig.balancer.vault, topics: [lge.id] });
                const swapEvents = await vaulContract.queryFilter(filter, lastSyncedBlockNumber, latestBlockNumber);

                if (swapEvents.length === 0) {
                    // create a manual price entry
                    const { tokenWeight, collateralWeight } = this.getWeightsAtTime(
                        now,
                        lge.tokenStartWeight,
                        lge.tokenEndWeight,
                        lge.collateralStartWeight,
                        lge.collateralEndWeight,
                        lge.startTimestamp,
                        lge.endTimestamp,
                    );
                    const { collateralBalance, tokenBalance } = await this.getCurrentPoolTokenBalances(lge);
                    const collateralTokenPrice = tokenService.getPriceForToken(tokenPrices, lge.collateralAddress);
                    const tokenPrice = this.calculateLbpTokenPrice(
                        tokenWeight,
                        collateralWeight,
                        collateralBalance,
                        tokenBalance,
                        collateralTokenPrice,
                    );
                    await prisma.prismaLgePriceData.create({
                        data: {
                            id: lge.id,
                            timestamp: now,
                            blockNumber: latestBlockNumber,
                            launchTokenPrice: tokenPrice,
                        },
                    });
                    return;
                }

                for (const swapEvent of swapEvents) {
                    const swapTimestamp = (await swapEvent.getBlock()).timestamp;
                    const poolTokens = await vaulContract.getPoolTokens(lge.id, { blockTag: swapEvent.blockNumber });
                    const tokenBalance = isSameAddress(poolTokens.address[0], lge.tokenAddress)
                        ? poolTokens.balances[0]
                        : poolTokens.balances[1];
                    const collateralBalance = isSameAddress(poolTokens.address[0], lge.collateralAddress)
                        ? poolTokens.balances[0]
                        : poolTokens.balances[1];

                    const collateralPrice = tokenService.getPriceForToken(tokenPrices, lge.collateralAddress);
                    const { tokenWeight, collateralWeight } = this.getWeightsAtTime(
                        swapTimestamp,
                        lge.tokenStartWeight,
                        lge.tokenEndWeight,
                        lge.collateralStartWeight,
                        lge.collateralEndWeight,
                        lge.startTimestamp,
                        lge.endTimestamp,
                    );
                    const tokenPrice = this.calculateLbpTokenPrice(
                        tokenWeight,
                        collateralWeight,
                        collateralBalance,
                        tokenBalance,
                        collateralPrice,
                    );

                    await prisma.prismaLgePriceData.create({
                        data: {
                            id: lge.id,
                            timestamp: swapTimestamp,
                            blockNumber: swapEvent.blockNumber,
                            launchTokenPrice: tokenPrice,
                        },
                    });
                }
            }
        }
    }

    public async getLgeRealPriceData(lge: LiquidityGenerationEvent): Promise<PriceData[]> {
        const priceData = await prisma.prismaLgePriceData.findMany({ where: { id: lge.id } });
        return priceData.map((priceData) => {
            return {
                price: priceData.launchTokenPrice,
                timestamp: priceData.timestamp,
                type: 'REAL',
            };
        });
    }

    /*
    Prediction of the price is fairly simple. We use the current collateral price, the current token balances and the changing token weights.
    The number of data points we predict is static set to PREDICTION_TIME_STEP but enforces a minimum of 1 data point per 12 hours and a maximum of
    1 datapoint per second.
    */
    private async getLgeChartPredictedPriceData(lge: LiquidityGenerationEvent): Promise<PriceData[]> {
        const now = moment().unix();
        const hasStarted = now > lge.startTimestamp;
        const firstPredictionTimestamp = hasStarted ? now : lge.startTimestamp;
        const secondsRemaining = lge.endTimestamp - firstPredictionTimestamp;
        const TWELVE_HOURS_IN_SECONDS = 43200;

        let predictionInterval = Math.floor(secondsRemaining / this.PREDICTION_TIME_STEP);
        if (predictionInterval === 0) {
            predictionInterval = 1;
        }
        if (predictionInterval > TWELVE_HOURS_IN_SECONDS) {
            predictionInterval = TWELVE_HOURS_IN_SECONDS;
        }
        // for the prediction, we use the current token price of the collateral token as well as the current token balances
        const { collateralBalance, tokenBalance } = await this.getCurrentPoolTokenBalances(lge);
        const tokenPrices = await tokenService.getTokenPrices();
        const collateralTokenPrice = tokenService.getPriceForToken(tokenPrices, lge.collateralAddress);

        let { tokenWeight, collateralWeight } = this.getWeightsAtTime(
            firstPredictionTimestamp,
            lge.tokenStartWeight,
            lge.tokenEndWeight,
            lge.collateralStartWeight,
            lge.collateralEndWeight,
            lge.startTimestamp,
            lge.endTimestamp,
        );

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

        while (timestamp + predictionInterval < lge.endTimestamp) {
            timestamp = timestamp + predictionInterval;
            let { tokenWeight, collateralWeight } = this.getWeightsAtTime(
                timestamp,
                lge.tokenStartWeight,
                lge.tokenEndWeight,
                lge.collateralStartWeight,
                lge.collateralEndWeight,
                lge.startTimestamp,
                lge.endTimestamp,
            );

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
            timestamp: lge.endTimestamp,
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
            if (isSameAddress(poolToken.address, lge.tokenAddress)) {
                if (poolToken.dynamicData) {
                    tokenBalance = parseFloat(poolToken.dynamicData.balance);
                }
            }
            if (isSameAddress(poolToken.address, lge.collateralAddress)) {
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

    private calculateLbpTokenPrice(
        tokenWeight: number,
        collateralWeight: number,
        tokenBalance: number,
        collateralBalance: number,
        collateralTokenPrice: number,
    ): number {
        return (((tokenWeight / collateralWeight) * collateralBalance) / tokenBalance) * collateralTokenPrice;
    }
}

export const liquidityGenerationEventService = new LiquidityGenerationEventService(
    gnosisSafeService,
    copperProxyService,
    tokenService,
);
