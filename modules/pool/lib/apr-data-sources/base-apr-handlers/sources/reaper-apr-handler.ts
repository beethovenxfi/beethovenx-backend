import { JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber, Contract } from 'ethers';
import { abi } from './abis/reaperStrategy';

import { AprHandler } from '../base-apr-handlers';

class ReaperAprHandler implements AprHandler {
    networkPrismaId: string;
    provider: JsonRpcProvider;
    yieldTokens: { [key: string]: `0x${string}` };
    strategiesMap: { [key: string]: `0x${string}` };
    readonly group = 'REAPER';

    constructor(aprHandlerConfig: ReaperAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
        this.provider = new JsonRpcProvider(aprHandlerConfig.rpcUrl, aprHandlerConfig.networkChainId);
        this.yieldTokens = aprHandlerConfig.yieldTokens;
        this.strategiesMap = aprHandlerConfig.strategiesMap;
    }

    async getAprs() {
        try {
            const contractCalls = Object.keys(this.strategiesMap).map(async (tokenName) => {
                const contract = new Contract(this.strategiesMap[tokenName], abi, this.provider);
                return contract.averageAPRAcrossLastNHarvests(3);
            });
            const callsAprResults: BigNumber[] = Array(Object.keys(this.yieldTokens).length);
            for (const [index, aprPromise] of contractCalls.entries()) {
                callsAprResults[index] = await aprPromise;
            }
            const aprs = Object.keys(this.strategiesMap).map((tokenName, i) => {
                return [this.yieldTokens[tokenName], callsAprResults[i].toNumber() / 1e4];
            });

            return Object.fromEntries(aprs);
        } catch (error) {
            console.error('Failed to fetch Reaper APR:', error);
            return {};
        }
    }
}

type ReaperAprHandlerConfig = {
    networkPrismaId: string;
    networkChainId: number;
    rpcUrl: string;
    yieldTokens: { [key: string]: `0x${string}` };
    strategiesMap: {
        [key: string]: `0x${string}`;
    };
};

export const reaperYieldTokensArbitrum = {
    DAI: '0x12f256109e744081f633a827be80e06d97ff7447',
    USDT: '0x0179bac7493a92ac812730a4c64a0b41b7ea0ecf',
    USDC: '0xaeacf641a0342330ec681b57c0a6af0b71d5cbff',
} as { [key: string]: `0x${string}` };

const reaperStrategiesMapArbitrum = {
    DAI: '0xd4d5321b04e4832772a4d70e1eed6bcb7402d7ac',
    USDT: '0x8a674ebbe33d6b03825626fa432e9ece888e13b5',
    USDC: '0x6f6c0c5b7af2a326111ba6a9fa4926f7ca3adf44',
} as { [key: string]: `0x${string}` };

const reaperArbitrumAprHandler = new ReaperAprHandler({
    networkPrismaId: 'ARBITRUM',
    networkChainId: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    yieldTokens: reaperYieldTokensArbitrum,
    strategiesMap: reaperStrategiesMapArbitrum,
});

export const reaperHandlers = [reaperArbitrumAprHandler];
