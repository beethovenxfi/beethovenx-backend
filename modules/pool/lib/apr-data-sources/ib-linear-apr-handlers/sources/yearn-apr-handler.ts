import { AprHandler } from '../ib-linear-apr-handlers';
import axios from 'axios';
import { YearnVault } from '../../apr-types';
import { YearnAprConfig } from '../../../../../network/apr-config-types';

export class YearnAprHandler implements AprHandler {
    sourceUrl: string;
    group: string = 'YEARN';

    constructor(aprHandlerConfig: YearnAprConfig) {
        this.sourceUrl = aprHandlerConfig.sourceUrl;
    }
    async getAprs(): Promise<{ [p: string]: number }> {
        const { data } = await axios.get<YearnVault[]>(this.sourceUrl);
        const aprs = Object.fromEntries(
            data.map(({ address, apy: { net_apy } }) => {
                return [address.toLowerCase(), net_apy];
            }),
        );
        return aprs;
    }
}
