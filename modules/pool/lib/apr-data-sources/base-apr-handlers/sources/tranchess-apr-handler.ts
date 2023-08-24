import axios from 'axios';

import { AprHandler } from '../base-apr-handlers';

export class TranchessAprHandler implements AprHandler {
    networkPrismaId: string;
    url: string;
    tokens: {
        [tokenName: string]: {
            address: string;
            underlyingAssetName: string;
        };
    };
    readonly group = 'TRANCHESS';

    constructor(aprHandlerConfig: TranchessAprHandlerConfig) {
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
        this.tokens = aprHandlerConfig.tokens;
        this.url = aprHandlerConfig.sourceUrl;
    }

    async getAprs() {
        try {
            const { data } = await axios.get('https://tranchess.com/eth/api/v3/funds');
            // const [{ weeklyAveragePnlPercentage }] = data as { weeklyAveragePnlPercentage: string }[];
            const aprEntries = Object.values(this.tokens).map(({ address, underlyingAssetName }) => {
                const weeklyAveragePnlPercentage = (
                    data as { weeklyAveragePnlPercentage: string; name: string }[]
                ).filter(({ name }) => name === underlyingAssetName)[0].weeklyAveragePnlPercentage;
                return [address, (365 * Number(weeklyAveragePnlPercentage)) / 1e18];
            });
            // The key weeklyAveragePnlPercentage is the daily yield of qETH in 18 decimals, timing 365 should give you the APR.
            return Object.fromEntries(aprEntries);
        } catch (error) {
            console.error('Failed to fetch Tranchess APR:', error);
            return {};
        }
    }
}

type TranchessAprHandlerConfig = {
    networkPrismaId: string;
    tokens: {
        [tokenName: string]: {
            address: string;
            underlyingAssetName: string;
        };
    };
    sourceUrl: string;
};
