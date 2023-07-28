import axios from "axios";
import { overnightTokens } from "./tokens";
import { AprHandler } from "../../types";

class OvernightAprHandler implements AprHandler {
  overnightTokens: Map<string, string>;
  url: string;
  readonly group = 'OVERNIGHT';

  constructor(tokens: Map<string, string>, url: string) {
    this.overnightTokens = tokens;
    this.url = url;
  }

  getAprs = async () => {
    try {

      const { data } = await axios.get(this.url)
      const rate = data as number

      return Array.from(this.overnightTokens.values()).reduce((acc, token) => {
        acc[token] = rate
        return acc
      }, {} as { [key: string]: number })
    } catch (error) {
      console.error(`Failed to fetch Overnight APRs in url:`, error)
      return {}
    }
  }
}

export const overnightMainnetAprHandler = new OvernightAprHandler(overnightTokens, 'https://app.overnight.fi/api/balancer/week/apr')