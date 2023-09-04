import { AprHandler } from '../ib-linear-apr-handlers';
import axios from 'axios';
import { YearnVault } from '../../apr-types';
import { YearnAprConfig } from '../../../../../network/apr-config-types';
import * as Sentry from '@sentry/node';

export class YearnAprHandler implements AprHandler {
    sourceUrl: string;
    group: string = 'YEARN';

    constructor(aprHandlerConfig: YearnAprConfig) {
        this.sourceUrl = aprHandlerConfig.sourceUrl;
    }
    async getAprs(): Promise<{ [p: string]: number }> {
        try {
            const { data } = await axios.get<YearnVault[]>(this.sourceUrl);
            const aprs = Object.fromEntries(
                data.map(({ address, apy: { net_apy } }) => {
                    return [address.toLowerCase(), net_apy];
                }),
            );
            return aprs;
        } catch (error) {
            console.error(`Yearn IB APR handler failed: `, error);
            Sentry.captureException(`Yearn IB APR handler failed: ${error}`);
            return {};
        }
    }
}
