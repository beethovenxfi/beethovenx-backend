import axios from "axios";
import {
  cbETHMainnet, MATICXMainnet, rETHMainnet, sfrxETHMainnet,
  stETHMainnet, stMATICPolygon, swETHMainnet, USDRMainnet,
  vETHMainnet, wbETHMainnet,
  wstETHArbitrum,
  wstETHGnosis,
  wstETHMainnet,
  wstETHPolygon,
  wstETHZkEVM
} from "./tokens";
import { AprHandler } from "../../types";

class DefaultAprHandler implements AprHandler{
  
  tokens: string[];
  url: string;
  path: string;
  scale: number;
  readonly group = undefined;
  
  constructor(tokens: string[], url:string, path?:string, scale?:number){
    this.tokens = tokens;
    this.url = url;
    this.path = path ?? '';
    this.scale = scale ?? 100;
  }
  
  async getAprs()  {
    try{
      
    const { data } = await axios.get(this.url, { headers: { 'User-Agent': 'cf' } })
    const value = (this.path === '') ? data : this.getValueFromPath(data, this.path)
    const scaledValue = parseFloat(value) / this.scale

    return this.tokens.reduce((acc, token) => {
      acc[token] = scaledValue
      return acc
    }, {} as { [key: string]: number })
    } catch (error) {
      console.error(`Failed to fetch APRs in url ${this.url}}:`, error)
      return {}
    }
  }

  getValueFromPath = (obj: any, path: string) => {
    const parts = path.split('.')
    let value = obj
    for (const part of parts) {
      value = value[part]
    }
    return value
  }
  
}

export const vETHAprHandler = new DefaultAprHandler([vETHMainnet], 'https://apy.liebi.com/veth', 'veth')
export const stETHAprHandler = new DefaultAprHandler([
  wstETHPolygon,
  wstETHZkEVM,
  wstETHGnosis,
  stETHMainnet,
  wstETHMainnet,
  wstETHArbitrum
],
  'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
  'data.smaApr')

export const stMaticAprHandler = new DefaultAprHandler([stMATICPolygon], 'https://polygon.lido.fi/api/stats', 'apr')
export const cbEthAprHandler = new DefaultAprHandler([cbETHMainnet], 'https://api.exchange.coinbase.com/wrapped-assets/CBETH/', 'apy', 1)
export const sfrxEthAprHandler = new DefaultAprHandler([sfrxETHMainnet], 'https://api.frax.finance/v2/frxeth/summary/latest', 'sfrxethApr')
export const rETHAprHandler = new DefaultAprHandler([rETHMainnet], 'https://drop-api.stafi.io/reth/v1/poolData', 'data.stakeApr')
export const USDRAprHandler = new DefaultAprHandler([USDRMainnet], 'http://usdr-api.us-east-1.elasticbeanstalk.com/usdr/apy', 'usdr')

export const MATICXAprHandler = new DefaultAprHandler([MATICXMainnet], 'https://universe.staderlabs.com/polygon/apy', 'value')
export const wbETHAprHandler = new DefaultAprHandler([wbETHMainnet], 'https://www.binance.com/bapi/earn/v1/public/pos/cftoken/project/rewardRateList?projectId=BETH', 'data.0.rewardRate', 1);

export const swETHAprHandler = new DefaultAprHandler([swETHMainnet], 'https://v3.svc.swellnetwork.io/api/tokens/sweth/apr')
export const wjAURAAprHandler = new DefaultAprHandler([swETHMainnet], 'https://data.jonesdao.io/api/v1/jones/apy-wjaura', 'wjauraApy')