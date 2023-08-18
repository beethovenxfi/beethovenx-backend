import axios from 'axios';

import { AprHandler } from '../ib-yield-apr-handlers';

class TetuAprHandler implements AprHandler {
    networkPrismaId: string;
    baseUrl: string;
    networkName: string;
    tetuTokens: string[];
    readonly group = 'TETU';

    constructor(aprHandlerConfig: TetuAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.network;
        this.baseUrl = aprHandlerConfig.baseUrl;
        this.networkName = aprHandlerConfig.networkName;
        this.tetuTokens = aprHandlerConfig.tetuTokens;
    }

    async getAprs() {
        try {
            const { data } = await axios.get(`${this.baseUrl}?network=${this.networkName}`);
            const json = data as { vault: string; apr: number }[];
            const aprs = json
                .filter(({ vault }) => this.tetuTokens.includes(vault.toLowerCase()))
                .map((t) => [t.vault, t.apr / 100]);

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
    tetuTokens: string[];
};

export const tUSDCPolygon = '0x113f3d54c31ebc71510fd664c8303b34fbc2b355';
export const tUSDTPolygon = '0x236975da9f0761e9cf3c2b0f705d705e22829886';
export const tDAIPolygon = '0xace2ac58e1e5a7bfe274916c4d82914d490ed4a5';
const tetuStQIPolygon = '0x4cd44ced63d9a6fef595f6ad3f7ced13fceac768';

const tetuPolygonAprHandler = new TetuAprHandler({
    network: 'POLYGON',
    baseUrl: 'https://api.tetu.io/api/v1/reader/compoundAPRs',
    networkName: 'MATIC',
    tetuTokens: [tUSDCPolygon, tUSDTPolygon, tDAIPolygon, tetuStQIPolygon],
});
export const tetuHandlers = [tetuPolygonAprHandler];
