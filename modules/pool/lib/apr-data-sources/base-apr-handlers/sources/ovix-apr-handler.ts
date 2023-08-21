import { BigNumber, Contract } from 'ethers';
import { abi } from './abis/oErc20';
import { JsonRpcProvider } from '@ethersproject/providers';

import { AprHandler } from '../base-apr-handlers';

class OvixAprHandler implements AprHandler {
    networkPrismaId: string;
    provider: JsonRpcProvider;
    yieldTokens: { [key: string]: `0x${string}` };
    wrappedTokens: { [key: string]: `0x${string}` };
    readonly group = 'OVIX';

    constructor(aprHandlerConfig: OvixAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
        this.provider = new JsonRpcProvider(aprHandlerConfig.rpcUrl, aprHandlerConfig.networkChainId);
        this.yieldTokens = aprHandlerConfig.yieldTokens;
        this.wrappedTokens = aprHandlerConfig.wrappedTokens;
    }

    async getAprs() {
        try {
            const calls = Object.keys(this.yieldTokens).map(async (tokenName) => {
                const contract = new Contract(this.yieldTokens[tokenName], abi, this.provider);
                return contract.borrowRatePerTimestamp();
            });

            const borrowRates = Array(Object.keys(this.yieldTokens).length);
            for (const [index, aprPromise] of calls.entries()) {
                borrowRates[index] = await aprPromise;
            }

            const aprs = Object.keys(this.wrappedTokens).map((tokenName, i) => [
                this.wrappedTokens[tokenName],
                Math.pow(1 + (borrowRates[i] as BigNumber).toNumber() / 1e18, 365 * 24 * 60 * 60) - 1,
            ]);

            return Object.fromEntries(aprs);
        } catch (error) {
            console.error('Failed to fetch Ovix APR:', error);
            return {};
        }
    }
}

type OvixAprHandlerConfig = {
    networkPrismaId: string;
    networkChainId: number;
    rpcUrl: string;
    yieldTokens: { [key: string]: `0x${string}` };
    wrappedTokens: {
        [key: string]: `0x${string}`;
    };
};

const ovixYieldTokensZkEvm = {
    USDT: '0xad41c77d99e282267c1492cdefe528d7d5044253',
    USDC: '0x68d9baa40394da2e2c1ca05d30bf33f52823ee7b',
} as { [key: string]: `0x${string}` };

export const ovixWrappedTokensZkEvm = {
    USDT: '0x550d3bb1f77f97e4debb45d4f817d7b9f9a1affb',
    USDC: '0x3a6789fc7c05a83cfdff5d2f9428ad9868b4ff85',
} as { [key: string]: `0x${string}` };

const ovixZkEVMAprHandler = new OvixAprHandler({
    networkPrismaId: 'ZKEVM',
    networkChainId: 1101,
    rpcUrl: 'https://zkevm-rpc.com',
    yieldTokens: ovixYieldTokensZkEvm,
    wrappedTokens: ovixWrappedTokensZkEvm,
});

export const ovixHandlers = [ovixZkEVMAprHandler];
