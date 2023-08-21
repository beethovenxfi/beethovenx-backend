import axios from 'axios';
import { AprHandler } from '../base-apr-handlers';

class AnkrAprHandler implements AprHandler {
    serviceName: string;
    tokenAddress: string;
    networkPrismaId: string;
    readonly url: string = 'https://api.staking.ankr.com/v1alpha/metrics';
    readonly group = 'ANKR';

    constructor(aprHandlerConfig: AnkrAprHandlerConfig) {
        this.serviceName = aprHandlerConfig.serviceName;
        this.tokenAddress = aprHandlerConfig.tokenAddress;
        this.networkPrismaId = aprHandlerConfig.network;
    }

    async getAprs() {
        try {
            const { data } = await axios.get(this.url);
            const json = data as { services: { serviceName: string; apy: string }[] };
            const service = json.services.find((service) => service.serviceName === this.serviceName);
            if (!service) {
                return {};
            }
            const scaledValue = parseFloat(service.apy) / 1e2;
            return {
                [this.tokenAddress]: scaledValue,
            };
        } catch (error) {
            console.error('Failed to fetch Ankr APR:', error);
            return {};
        }
    }
}

export const ankrEthMainnet = '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb';
export const ankrEthFantom = '0x12d8ce035c5de3ce39b1fdd4c1d5a745eaba3b8c';

export const ankrFtmFantom = '0xcfc785741dc0e98ad4c9f6394bb9d43cd1ef5179';

type AnkrAprHandlerConfig = {
    serviceName: string;
    tokenAddress: string;
    network: string;
};

const ankrEthMainnetAprHandler = new AnkrAprHandler({
    serviceName: 'eth',
    tokenAddress: ankrEthMainnet,
    network: 'MAINNET',
});

const ankrEthFantomAprHandler = new AnkrAprHandler({
    serviceName: 'eth',
    tokenAddress: ankrEthFantom,
    network: 'FANTOM',
});

const ankrFtmFantomAprHandler = new AnkrAprHandler({
    serviceName: 'ftm',
    tokenAddress: ankrFtmFantom,
    network: 'FANTOM',
});
export const ankrEthHandlers = [ankrEthMainnetAprHandler, ankrEthFantomAprHandler, ankrFtmFantomAprHandler];
