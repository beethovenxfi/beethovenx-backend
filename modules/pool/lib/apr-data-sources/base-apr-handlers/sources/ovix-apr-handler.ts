import { BigNumber, Contract } from 'ethers';
import { abi } from './abis/oErc20';
import { JsonRpcProvider } from '@ethersproject/providers';

import { AprHandler } from '../base-apr-handlers';

export class OvixAprHandler implements AprHandler {
    networkPrismaId: string;
    provider: JsonRpcProvider;
    tokens: {
        [tokenName: string]: {
            yieldAddress: string;
            wrappedAddress: string;
        };
    };
    readonly group = 'OVIX';

    constructor(aprHandlerConfig: OvixAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
        this.provider = new JsonRpcProvider(aprHandlerConfig.rpcUrl, aprHandlerConfig.networkChainId);
        this.tokens = aprHandlerConfig.tokens;
    }

    async getAprs() {
        try {
            const aprEntries = Object.values(this.tokens).map(async ({ yieldAddress, wrappedAddress }) => {
                const contract = new Contract(yieldAddress, abi, this.provider);
                const borrowRate = await contract.borrowRatePerTimestamp();
                return [
                    wrappedAddress,
                    Math.pow(1 + (borrowRate as BigNumber).toNumber() / 1e18, 365 * 24 * 60 * 60) - 1,
                ];
            });

            return Object.fromEntries(await Promise.all(aprEntries));
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
    tokens: {
        [tokenName: string]: {
            yieldAddress: string;
            wrappedAddress: string;
        };
    };
};
