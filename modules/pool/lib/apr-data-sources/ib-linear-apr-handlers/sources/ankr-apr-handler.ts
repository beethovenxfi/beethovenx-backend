import axios from 'axios';
import { AprHandler } from '../ib-linear-apr-handlers';

export class AnkrAprHandler implements AprHandler {
    tokens: {
        [underlyingAssetName: string]: {
            address: string;
            serviceName: string;
        };
    };
    url: string;
    readonly group = 'ANKR';

    constructor(aprHandlerConfig: AnkrAprHandlerConfig) {
        this.tokens = aprHandlerConfig.tokens;
        this.url = aprHandlerConfig.sourceUrl;
    }

    async getAprs() {
        try {
            const { data } = await axios.get(this.url);
            const services = (data as { services: { serviceName: string; apy: string }[] }).services;
            const aprs = Object.fromEntries(
                Object.values(this.tokens).map(({ address, serviceName }) => {
                    const service = services.find((service) => service.serviceName === serviceName);
                    if (!service) {
                        return [address, 0];
                    }
                    return [address, parseFloat(service.apy) / 1e2];
                }),
            );
            return aprs;
        } catch (error) {
            console.error('Failed to fetch Ankr APR:', error);
            return {};
        }
    }
}

type AnkrAprHandlerConfig = {
    tokens: {
        [underlyingAssetName: string]: {
            address: string;
            serviceName: string;
        };
    };
    sourceUrl: string;
};
