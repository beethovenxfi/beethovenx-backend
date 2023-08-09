import axios from "axios";
import { AprHandler } from "../types";

class OvernightAprHandler implements AprHandler {
  overnightTokens: { [key: string]: string };
  url: string;
  network: number;
  readonly group = 'OVERNIGHT';

  constructor(aprHandlerConfig: OvernightAprHandlerConfig) {
    this.overnightTokens = aprHandlerConfig.tokens;
    this.url = aprHandlerConfig.url;
    this.network = aprHandlerConfig.network;
  }

  async getAprs() {
    try {

      const { data } = await axios.get(this.url)
      const rate = data as number

      return Object.values(this.overnightTokens).reduce((acc, token) => {
        acc[token] = rate
        return acc
      }, {} as { [key: string]: number })
    } catch (error) {
      console.error(`Failed to fetch Overnight APRs in url:`, error)
      return {}
    }
  }
}

const overnightTokens = {
  lpUsdcUsdPlus: '0x1aafc31091d93c3ff003cff5d2d8f7ba2e728425', //lpUsdcUsdPlus
  UsdcUsdPlus: '0x6933ec1ca55c06a894107860c92acdfd2dd8512f' // UsdcUsdPlus
}

type OvernightAprHandlerConfig = {
  tokens: {[key: string]: string};
  url: string;
  network: number;
}

const overnightMainnetAprHandler = new OvernightAprHandler({
  tokens: overnightTokens,
  url: 'https://app.overnight.fi/api/balancer/week/apr',
  network: 1
})

export const overnightHandlers = [overnightMainnetAprHandler]