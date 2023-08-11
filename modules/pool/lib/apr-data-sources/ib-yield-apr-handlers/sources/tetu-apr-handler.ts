import axios from 'axios';

import { AprHandler } from '../ib-yield-apr-handlers';

class TetuAprHandler implements AprHandler {
    networkPrismaId: string;
    baseUrl: string;
    networkName: string;
    readonly group = 'TETU';

    constructor(aprHandlerConfig: TetuAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.network;
        this.baseUrl = aprHandlerConfig.baseUrl;
        this.networkName = aprHandlerConfig.networkName;
    }

    async getAprs() {
        try {
            const { data } = await axios.get(`${this.baseUrl}?network=${this.networkName}`);
            const json = data as { vault: string; apr: number }[];
            const aprs = json.map((t) => [t.vault, t.apr / 100]);

            return Object.fromEntries(aprs);
        } catch (error) {
            console.error('Failed to fetch Tetu APR:', error);
            return {};
        }
    }
}

type TetuAprHandlerConfig = {
    network: string;
    baseUrl: string;
    networkName: string;
};

const tetuPolygonAprHandler = new TetuAprHandler({
    network: 'POLYGON',
    baseUrl: 'https://api.tetu.io/api/v1/reader/compoundAPRs',
    networkName: 'MATIC',
});

export const tetuHandlers = [tetuPolygonAprHandler];
