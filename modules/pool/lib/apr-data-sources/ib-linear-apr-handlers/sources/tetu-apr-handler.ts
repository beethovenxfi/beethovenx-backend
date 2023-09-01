import axios from 'axios';

import { AprHandler } from '../ib-linear-apr-handlers';
import { TetuAprConfig } from '../../../../../network/apr-config-types';

export class TetuAprHandler implements AprHandler {
    sourceUrl: string;
    tokens: {
        [tokenName: string]: string;
    };
    readonly group = 'TETU';

    constructor(aprHandlerConfig: TetuAprConfig) {
        this.sourceUrl = aprHandlerConfig.sourceUrl;
        this.tokens = aprHandlerConfig.tokens;
    }

    async getAprs() {
        try {
            const { data } = await axios.get(this.sourceUrl);
            const json = data as { vault: string; apr: number }[];
            const aprs = json
                .filter(({ vault }) => Object.values(this.tokens).includes(vault.toLowerCase()))
                .map((t) => [t.vault, t.apr / 100]);
            return Object.fromEntries(aprs);
        } catch (error) {
            console.error('Failed to fetch Tetu APR:', error);
            return {};
        }
    }
}
