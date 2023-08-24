import { Contract } from 'ethers';
import { abi } from './abis/tesseraPool';
import { JsonRpcProvider } from '@ethersproject/providers';

import { AprHandler } from '../base-apr-handlers';

export class TesseraAprHandler implements AprHandler {
    networkPrismaId: string;
    provider: JsonRpcProvider;
    tokens: {
        [tokenName: string]: {
            tesseraPoolAddress: string;
            tokenAddress: string;
        };
    };
    readonly group = 'TESSERA';

    constructor(aprHandlerConfig: TesseraAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
        this.provider = new JsonRpcProvider(aprHandlerConfig.rpcUrl, aprHandlerConfig.networkChainId);
        this.tokens = aprHandlerConfig.tokens;
    }

    async getAprs() {
        try {
            let aprEntries = [];
            for (const { tesseraPoolAddress, tokenAddress } of Object.values(this.tokens)) {
                try {
                    const contract = new Contract(tesseraPoolAddress, abi, this.provider);
                    const poolsUI = await contract.getPoolsUI();

                    const pool = poolsUI[0];
                    const staked = BigInt(pool.stakedAmount);
                    const reward = BigInt(pool.currentTimeRange.rewardsPerHour) * BigInt(24 * 365);
                    const apr = Number(reward.toString()) / Number(staked.toString());
                    aprEntries.push([tokenAddress, apr]);
                } catch (error) {
                    console.error('Failed to fetch Tessera Ape Coin APR:', error);
                    aprEntries.push([tokenAddress, 0]);
                }
            }
            return Object.fromEntries(aprEntries);
        } catch (error) {
            console.error('Failed to fetch Tessera APR:', error);
            return {};
        }
    }
}

type TesseraAprHandlerConfig = {
    networkPrismaId: string;
    networkChainId: number;
    rpcUrl: string;
    tokens: {
        [tokenName: string]: {
            tesseraPoolAddress: string;
            tokenAddress: string;
        };
    };
};
