import axios from 'axios';

import { AprHandler } from '../base-apr-handlers';

export const qETHMainnet = '0x93ef1ea305d11a9b2a3ebb9bb4fcc34695292e7d';

class TranchessAprHandler implements AprHandler {
    networkPrismaId: string;
    url: string;
    token: string;
    readonly group = 'TRANCHESS';

    constructor(aprHandlerConfig: TranchessAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.network;
        this.token = aprHandlerConfig.token;
        this.url = aprHandlerConfig.url;
    }

    async getAprs() {
        try {
            const { data } = await axios.get('https://tranchess.com/eth/api/v3/funds');
            const [{ weeklyAveragePnlPercentage }] = data as { weeklyAveragePnlPercentage: string }[];
            // The key weeklyAveragePnlPercentage is the daily yield of qETH in 18 decimals, timing 365 should give you the APR.
            const value = (365 * Number(weeklyAveragePnlPercentage)) / 1e18;
            return {
                [this.token]: value,
            };
        } catch (error) {
            console.error('Failed to fetch Tranchess APR:', error);
            return {};
        }
    }
}

type TranchessAprHandlerConfig = {
    network: string;
    token: string;
    url: string;
};

const tranchessMainnetAprHandler = new TranchessAprHandler({
    network: 'MAINNET',
    token: qETHMainnet,
    url: 'https://tranchess.com/eth/api/v3/funds',
});

export const tranchessHandlers = [tranchessMainnetAprHandler];
