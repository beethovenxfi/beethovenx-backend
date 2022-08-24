import { AmountHumanReadable } from '../common/global-types';
import { PrismaPoolStaking } from '@prisma/client';

export interface UserStakedBalanceService {
    syncStakedBalances(): Promise<void>;
    initStakedBalances(): Promise<void>;
    syncUserBalance(input: UserSyncUserBalanceInput): Promise<void>;
}

export interface UserPoolBalance {
    poolId: string;
    tokenAddress: string;
    totalBalance: AmountHumanReadable;
    walletBalance: AmountHumanReadable;
    stakedBalance: AmountHumanReadable;
}

export interface UserSyncUserBalanceInput {
    userAddress: string;
    poolId: string;
    poolAddress: string;
    staking: PrismaPoolStaking;
}

// for portfolio
export interface UserPortfolioSnapshot {
    timestamp: number;
    walletBalance: string;
    gaugeBalance: string;
    farmBalance: string;
    totalBalance: string;
    totalValueUSD: string;
    fees24h: string;
    totalFees: string;
    pools: UserPoolSnapshot[];

    // totalSwapFees: number;
    // totalSwapVolume: number;
    // tokens: UserTokenData[];
}

export interface UserPoolSnapshot {
    id: string;
    timestamp: number;
    // poolId: string;
    // poolAddress: string;
    // poolName: string;
    percentShare: number;
    walletBalance: string;
    gaugeBalance: string;
    farmBalance: string;
    totalBalance: string;
    totalValueUSD: string;
    fees24h: string;
    // totalFees: string;
    // percentOfPortfolio: number;
    // priceChange24h: number;
    // priceChangePercent24h: number;

    // shares: number;
    // pricePerShare: number;
    // tokens: UserTokenData[];
    // swapFees: number;
    // swapVolume: number;
}
