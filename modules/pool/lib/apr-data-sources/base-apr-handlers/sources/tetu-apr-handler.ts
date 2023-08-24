import axios from 'axios';

import { AprHandler } from '../base-apr-handlers';

export class TetuAprHandler implements AprHandler {
    networkPrismaId: string;
    sourceUrl: string;
    tokens: {
        [tokenName: string]: string;
    };
    readonly group = 'TETU';

    constructor(aprHandlerConfig: TetuAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
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

type TetuAprHandlerConfig = {
    networkPrismaId: string;
    sourceUrl: string;
    tokens: {
        [tokenName: string]: string;
    };
};
