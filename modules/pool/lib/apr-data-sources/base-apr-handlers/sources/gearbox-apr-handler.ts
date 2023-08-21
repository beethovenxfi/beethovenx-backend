import axios from 'axios';

import { AprHandler } from '../base-apr-handlers';

class GearboxAprHandler implements AprHandler {
    url: string;
    tokens: { [key: string]: string };
    networkPrismaId: string;
    readonly group = 'GEARBOX';

    constructor(aprHandlerConfig: GearboxAprHandlerConfig) {
        this.tokens = aprHandlerConfig.tokens;
        this.url = aprHandlerConfig.url;
        this.networkPrismaId = aprHandlerConfig.network;
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
    url: string;
    network: string;
};

export const gearboxTokensMainnet = {
    dDAI: '0x6cfaf95457d7688022fc53e7abe052ef8dfbbdba',
    dUSDC: '0xc411db5f5eb3f7d552f9b8454b2d74097ccde6e3',
};

const gearboxMainnetAprHandler = new GearboxAprHandler({
    tokens: gearboxTokensMainnet,
    url: 'https://mainnet.gearbox.foundation/api/pools',
    network: 'MAINNET',
});

export const gearboxHandlers = [gearboxMainnetAprHandler];
