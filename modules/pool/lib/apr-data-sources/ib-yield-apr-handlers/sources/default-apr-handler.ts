import axios from 'axios';

import { AprHandler } from '../ib-yield-apr-handlers';

class DefaultAprHandler implements AprHandler {
    tokens: string[];
    url: string;
    path: string;
    scale: number;
    networkPrismaId: string;
    readonly group = 'DEFAULT';

    constructor(aprHandlerConfig: DefaultAprHandlerConfig) {
        this.tokens = aprHandlerConfig.tokens;
        this.url = aprHandlerConfig.url;
        this.networkPrismaId = aprHandlerConfig.network;
        this.path = aprHandlerConfig.path ?? '';
        this.scale = aprHandlerConfig.scale ?? 100;
    }

    async getAprs() {
        try {
            const { data } = await axios.get(this.url, { headers: { 'User-Agent': 'cf' } });
            const value = this.path === '' ? data : this.getValueFromPath(data, this.path);
            const scaledValue = parseFloat(value) / this.scale;

            return this.tokens.reduce((acc, token) => {
                acc[token] = scaledValue;
                return acc;
            }, {} as { [key: string]: number });
        } catch (error) {
            console.error(`Failed to fetch APRs in url ${this.url}:`, error);
            return {};
        }
    }

    getValueFromPath(obj: any, path: string) {
        const parts = path.split('.');
        let value = obj;
        for (const part of parts) {
            value = value[part];
        }
        return value;
    }
}

export type DefaultAprHandlerConfig = {
    tokens: string[];
    url: string;
    network: string;
    scale?: number;
    path?: string;
};

export const vETHMainnet = '0x4bc3263eb5bb2ef7ad9ab6fb68be80e43b43801f';
const wstETHGnosis = '0x6c76971f98945ae98dd7d4dfca8711ebea946ea6';
const wstETHZkEVM = '0x5d8cff95d7a57c0bf50b30b43c7cc0d52825d4a9';
const stETHMainnet = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84';
const wstETHMainnet = '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0';
const wstETHPolygon = '0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd';
const wstETHArbitrum = '0x5979d7b546e38e414f7e9822514be443a4800529';
const stMATICPolygon = '0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4';
export const cbETHMainnet = '0xbe9895146f7af43049ca1c1ae358b0541ea49704';

const sfrxETHMainnet = '0xac3e018457b222d93114458476f3e3416abbe38f';
export const rETHMainnet = '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593';
export const USDRMainnet = '0xaf0d9d65fc54de245cda37af3d18cbec860a4d4b';
const MATICXPolygon = '0xfa68fb4628dff1028cfec22b4162fccd0d45efb6';
const wbETHMainnet = '0xa2e3356610840701bdf5611a53974510ae27e2e1';
export const swETHMainnet = '0xf951e335afb289353dc249e82926178eac7ded78';
export const wjAURAMainnet = '0x198d7387fa97a73f05b8578cdeff8f2a1f34cd1f';

const vETHMainnetAprHandler = new DefaultAprHandler({
    tokens: [vETHMainnet],
    url: 'https://apy.liebi.com/veth',
    path: 'veth',
    network: 'MAINNET',
});
const stETHMainnetAprHandler = new DefaultAprHandler({
    tokens: [stETHMainnet, wstETHMainnet],
    url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
    path: 'data.smaApr',
    network: 'MAINNET',
});
const stETHPolygonAprHandler = new DefaultAprHandler({
    tokens: [wstETHPolygon],
    url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
    path: 'data.smaApr',
    network: 'POLYGON',
});
const stETHZkEVMAprHandler = new DefaultAprHandler({
    tokens: [wstETHZkEVM],
    url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
    path: 'data.smaApr',
    network: 'ZKEVM',
});
const stETHGnosisAprHandler = new DefaultAprHandler({
    tokens: [wstETHGnosis],
    url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
    path: 'data.smaApr',
    network: 'GNOSIS',
});
const stETHArbitrumAprHandler = new DefaultAprHandler({
    tokens: [wstETHArbitrum],
    url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
    path: 'data.smaApr',
    network: 'ARBITRUM',
});

const stMaticPolygonAprHandler = new DefaultAprHandler({
    tokens: [stMATICPolygon],
    url: 'https://polygon.lido.fi/api/stats',
    path: 'apr',
    network: 'POLYGON',
});
const cbEthMainnetAprHandler = new DefaultAprHandler({
    tokens: [cbETHMainnet],
    url: 'https://api.exchange.coinbase.com/wrapped-assets/CBETH/',
    path: 'apy',
    scale: 1,
    network: 'MAINNET',
});
const sfrxEthMainnetAprHandler = new DefaultAprHandler({
    tokens: [sfrxETHMainnet],
    url: 'https://api.frax.finance/v2/frxeth/summary/latest',
    path: 'sfrxethApr',
    network: 'MAINNET',
});
const rETHMainnetAprHandler = new DefaultAprHandler({
    tokens: [rETHMainnet],
    url: 'https://drop-api.stafi.io/reth/v1/poolData',
    path: 'data.stakeApr',
    network: 'MAINNET',
});
const USDRMainnetAprHandler = new DefaultAprHandler({
    tokens: [USDRMainnet],
    url: 'http://usdr-api.us-east-1.elasticbeanstalk.com/usdr/apy',
    path: 'usdr',
    network: 'MAINNET',
});

const MATICXPolygonAprHandler = new DefaultAprHandler({
    tokens: [MATICXPolygon],
    url: 'https://universe.staderlabs.com/polygon/apy',
    path: 'value',
    network: 'POLYGON',
});
const wbETHPolygonAprHandler = new DefaultAprHandler({
    tokens: [wbETHMainnet],
    url: 'https://www.binance.com/bapi/earn/v1/public/pos/cftoken/project/rewardRateList?projectId=BETH',
    path: 'data.0.rewardRate',
    scale: 1,
    network: 'POLYGON',
});

const swETHMainnetAprHandler = new DefaultAprHandler({
    tokens: [swETHMainnet],
    url: 'https://v3.svc.swellnetwork.io/api/tokens/sweth/apr',
    network: 'MAINNET',
});
const wjAURAMainnetAprHandler = new DefaultAprHandler({
    tokens: [wjAURAMainnet],
    url: 'https://data.jonesdao.io/api/v1/jones/apy-wjaura',
    path: 'wjauraApy',
    network: 'MAINNET',
});

export const defaultHandlers = [
    vETHMainnetAprHandler,
    stETHMainnetAprHandler,
    stETHPolygonAprHandler,
    stETHZkEVMAprHandler,
    stETHGnosisAprHandler,
    stETHArbitrumAprHandler,
    stMaticPolygonAprHandler,
    cbEthMainnetAprHandler,
    sfrxEthMainnetAprHandler,
    rETHMainnetAprHandler,
    USDRMainnetAprHandler,
    MATICXPolygonAprHandler,
    wbETHPolygonAprHandler,
    swETHMainnetAprHandler,
    wjAURAMainnetAprHandler,
];
