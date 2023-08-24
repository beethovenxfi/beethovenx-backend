import axios from 'axios';

import { AprHandler } from '../base-apr-handlers';

export class GearboxAprHandler implements AprHandler {
    url: string;
    tokens: { [key: string]: string };
    networkPrismaId: string;
    readonly group = 'GEARBOX';

    constructor(aprHandlerConfig: GearboxAprHandlerConfig) {
        this.tokens = aprHandlerConfig.tokens;
        this.url = aprHandlerConfig.sourceUrl;
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
    }

    async getAprs() {
        try {
            const { data } = await axios.get(this.url);
            const json = data as { data: { dieselToken: string; depositAPY_RAY: string }[] };

            const aprEntries = json.data
                .filter((t) => Object.values(this.tokens).includes(t.dieselToken.toLowerCase()))
                .map(({ dieselToken, depositAPY_RAY }) => {
                    return [dieselToken, Number(depositAPY_RAY.slice(0, 27)) / 1e27];
                });
            return Object.fromEntries(aprEntries);
        } catch (error) {
            console.error('Failed to fetch Gearbox APR:', error);
            return {};
        }
    }
}

type GearboxAprHandlerConfig = {
    tokens: { [key: string]: string };
    sourceUrl: string;
    networkPrismaId: string;
};
