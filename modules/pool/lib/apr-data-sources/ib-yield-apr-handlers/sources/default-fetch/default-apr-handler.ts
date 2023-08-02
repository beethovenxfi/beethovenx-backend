import axios from "axios";
import {
  cbETHMainnet, MATICXPolygon, rETHMainnet, sfrxETHMainnet,
  stETHMainnet, stMATICPolygon, swETHMainnet, USDRMainnet,
  vETHMainnet, wbETHMainnet, wjAURAMainnet,
  wstETHArbitrum,
  wstETHGnosis,
  wstETHMainnet,
  wstETHPolygon,
  wstETHZkEVM
} from "./tokens";
import { AprHandler } from "../../types";
import { DefaultAprHandlerConfig } from "./types";

class DefaultAprHandler implements AprHandler {

  tokens: string[];
  url: string;
  path: string;
  scale: number;
  network: number;
  readonly group = "DEFAULT";

  constructor(aprHandlerConfig: DefaultAprHandlerConfig) {
    this.tokens = aprHandlerConfig.tokens;
    this.url = aprHandlerConfig.url;
    this.network = aprHandlerConfig.network;
    this.path = aprHandlerConfig.path ?? '';
    this.scale = aprHandlerConfig.scale ?? 100;
  }

  async getAprs() {
    try {

      const { data } = await axios.get(this.url, { headers: { 'User-Agent': 'cf' } })
      const value = (this.path === '') ? data : this.getValueFromPath(data, this.path)
      const scaledValue = parseFloat(value) / this.scale

      return this.tokens.reduce((acc, token) => {
        acc[token] = scaledValue
        return acc
      }, {} as { [key: string]: number })
    } catch (error) {
      console.error(`Failed to fetch APRs in url ${ this.url }:`, error)
      return {}
    }
  }

  getValueFromPath(obj: any, path: string) {
    const parts = path.split('.')
    let value = obj
    for (const part of parts) {
      value = value[part]
    }
    return value
  }

}

const vETHMainnetAprHandler = new DefaultAprHandler({
  tokens: [vETHMainnet],
  url: 'https://apy.liebi.com/veth',
  path: 'veth',
  network: 1
})
const stETHMainnetAprHandler = new DefaultAprHandler({
  tokens: [
    stETHMainnet,
    wstETHMainnet,
  ],
  url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
  path: 'data.smaApr',
  network: 1
})
const stETHPolygonAprHandler = new DefaultAprHandler({
  tokens: [
    wstETHPolygon,
  ],
  url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
  path: 'data.smaApr',
  network: 137
})
const stETHZkEVMAprHandler = new DefaultAprHandler({
  tokens: [
    wstETHZkEVM,
  ],
  url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
  path: 'data.smaApr',
  network: 1101
})
const stETHGnosisAprHandler = new DefaultAprHandler({
  tokens: [
    wstETHGnosis,
  ],
  url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
  path: 'data.smaApr',
  network: 100
})
const stETHArbitrumAprHandler = new DefaultAprHandler({
  tokens: [
    wstETHArbitrum
  ],
  url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
  path: 'data.smaApr',
  network: 42161
})

const stMaticPolygonAprHandler = new DefaultAprHandler({
  tokens: [stMATICPolygon],
  url: 'https://polygon.lido.fi/api/stats',
  path: 'apr',
  network: 137
})
const cbEthMainnetAprHandler = new DefaultAprHandler({
    tokens: [cbETHMainnet],
    url: 'https://api.exchange.coinbase.com/wrapped-assets/CBETH/',
    path: 'apy',
    scale: 1,
    network: 1
  }
)
const sfrxEthMainnetAprHandler = new DefaultAprHandler({
  tokens: [sfrxETHMainnet],
  url: 'https://api.frax.finance/v2/frxeth/summary/latest',
  path: 'sfrxethApr',
  network: 1
})
const rETHMainnetAprHandler = new DefaultAprHandler({
  tokens: [rETHMainnet],
  url: 'https://drop-api.stafi.io/reth/v1/poolData',
  path: 'data.stakeApr',
  network: 1
})
const USDRMainnetAprHandler = new DefaultAprHandler({
  tokens: [USDRMainnet],
  url: 'http://usdr-api.us-east-1.elasticbeanstalk.com/usdr/apy',
  path: 'usdr',
  network: 1
})

const MATICXPolygonAprHandler = new DefaultAprHandler({
  tokens: [MATICXPolygon],
  url: 'https://universe.staderlabs.com/polygon/apy',
  path: 'value',
  network: 137
})
const wbETHPolygonAprHandler = new DefaultAprHandler({
  tokens: [wbETHMainnet],
  url: 'https://www.binance.com/bapi/earn/v1/public/pos/cftoken/project/rewardRateList?projectId=BETH',
  path: 'data.0.rewardRate',
  scale: 1,
  network: 137   ,
});

const swETHMainnetAprHandler = new DefaultAprHandler({
  tokens: [swETHMainnet],
  url: 'https://v3.svc.swellnetwork.io/api/tokens/sweth/apr',
  network: 1
})
const wjAURAMainnetAprHandler = new DefaultAprHandler({
  tokens: [wjAURAMainnet],
  url: 'https://data.jonesdao.io/api/v1/jones/apy-wjaura',
  path: 'wjauraApy',
  network: 1,
})

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
]