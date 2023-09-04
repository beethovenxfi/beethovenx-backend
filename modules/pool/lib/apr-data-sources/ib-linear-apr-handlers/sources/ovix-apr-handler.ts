import { BigNumber, Contract } from 'ethers';
import { abi } from './abis/oErc20';

import { AprHandler } from '../ib-linear-apr-handlers';
import { networkContext } from '../../../../../network/network-context.service';
import { OvixAprConfig } from '../../../../../network/apr-config-types';

export class OvixAprHandler implements AprHandler {
    tokens: {
        [tokenName: string]: {
            yieldAddress: string;
            wrappedAddress: string;
        };
    };
    readonly group = 'OVIX';

    constructor(aprHandlerConfig: OvixAprConfig) {
        this.tokens = aprHandlerConfig.tokens;
    }

    async getAprs() {
        try {
            const aprEntries = Object.values(this.tokens).map(async ({ yieldAddress, wrappedAddress }) => {
                const contract = new Contract(yieldAddress, abi, networkContext.provider);
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