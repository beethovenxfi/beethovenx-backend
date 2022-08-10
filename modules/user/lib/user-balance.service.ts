import { UserPoolBalance } from '../user-types';
import { prisma } from '../../../prisma/prisma-client';
import _ from 'lodash';
import { parseUnits } from 'ethers/lib/utils';
import { formatFixed } from '@ethersproject/bignumber';
import { networkConfig } from '../../config/network-config';
import { PrismaPoolStaking } from '@prisma/client';
import { TokenService } from '../../token/token.service';

export class UserBalanceService {
    constructor(private readonly tokenService: TokenService) {}

    public async getUserPoolBalances(
        address: string,
        minUsdLiquidity: number = 0.0000000000000001,
    ): Promise<UserPoolBalance[]> {
        const user = await prisma.prismaUser.findUnique({
            where: { address: address.toLowerCase() },
            include: {
                walletBalances: { where: { poolId: { not: null }, balanceNum: { gt: 0 } } },
                stakedBalances: {
                    where: { poolId: { not: null }, balanceNum: { gt: 0 } },
                },
            },
        });

        if (!user) {
            return [];
        }

        const poolIds = _.uniq([
            ...user.stakedBalances.map((balance) => balance.poolId),
            ...user.walletBalances.map((balance) => balance.poolId),
        ]) as string[];

        const tokenPrices = await this.tokenService.getTokenPrices();

        const balancesWithPrice = [];
        for (const poolId of poolIds) {
            const stakedBalance = user.stakedBalances.find((balance) => balance.poolId === poolId);
            const walletBalance = user.walletBalances.find((balance) => balance.poolId === poolId);
            const tokenAddress = stakedBalance?.tokenAddress || walletBalance?.tokenAddress || '';
            const stakedNum = parseUnits(stakedBalance?.balance || '0', 18);
            const walletNum = parseUnits(walletBalance?.balance || '0', 18);
            const totalBalance = formatFixed(stakedNum.add(walletNum), 18);

            const tokenPrice = this.tokenService.getPriceForToken(tokenPrices, tokenAddress);
            if (parseFloat(totalBalance) >= minUsdLiquidity) {
                balancesWithPrice.push({
                    poolId,
                    tokenAddress,
                    totalBalance,
                    stakedBalance: stakedBalance?.balance ?? '0',
                    walletBalance: walletBalance?.balance ?? '0',
                    tokenPrice,
                });
            }
        }

        return balancesWithPrice;
    }

    public async getUserFbeetsBalance(address: string): Promise<Omit<UserPoolBalance, 'poolId'>> {
        const user = await prisma.prismaUser.findUnique({
            where: { address: address.toLowerCase() },
            include: {
                walletBalances: { where: { tokenAddress: networkConfig.fbeets.address } },
                stakedBalances: { where: { tokenAddress: networkConfig.fbeets.address } },
            },
        });

        const stakedBalance = user?.stakedBalances[0];
        const walletBalance = user?.walletBalances[0];
        const stakedNum = parseUnits(stakedBalance?.balance || '0', 18);
        const walletNum = parseUnits(walletBalance?.balance || '0', 18);

        return {
            tokenAddress: networkConfig.fbeets.address,
            totalBalance: formatFixed(stakedNum.add(walletNum), 18),
            stakedBalance: stakedBalance?.balance || '0',
            walletBalance: walletBalance?.balance || '0',
            tokenPrice: this.tokenService.getPriceForToken(
                await this.tokenService.getTokenPrices(),
                networkConfig.fbeets.address,
            ),
        };
    }

    public async getUserStaking(address: string): Promise<PrismaPoolStaking[]> {
        const user = await prisma.prismaUser.findUnique({
            where: { address },
            include: {
                stakedBalances: {
                    where: { balanceNum: { gt: 0 } },
                    include: {
                        staking: {
                            include: {
                                farm: {
                                    include: {
                                        rewarders: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        return (user?.stakedBalances || [])
            .filter((stakedBalance) => stakedBalance.staking)
            .map((stakedBalance) => stakedBalance.staking);
    }
}
