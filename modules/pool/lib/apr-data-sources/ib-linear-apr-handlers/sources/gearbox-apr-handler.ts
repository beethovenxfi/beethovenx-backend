import axios from 'axios';
import * as Sentry from '@sentry/node';

import { AprHandler } from '../ib-linear-apr-handlers';
import { GearBoxAprConfig } from '../../../../../network/apr-config-types';

export class GearboxAprHandler implements AprHandler {
    url: string;
    tokens: { [key: string]: string };
    readonly group = 'GEARBOX';

    constructor(aprHandlerConfig: GearBoxAprConfig) {
        this.tokens = aprHandlerConfig.tokens;
        this.url = aprHandlerConfig.sourceUrl;
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
            Sentry.captureException(`Gearbox IB APR handler failed: ${error}`);
            return {};
        }
    }
}
