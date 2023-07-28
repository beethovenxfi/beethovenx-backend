import axios from "axios";
import { idleTokensMainnet, wrapped4626IdleTokensMainnet } from "./tokens";
import { AprHandler } from "../../types";

class IdleAprHandler implements AprHandler {
  wrappedIdleTokens: Map<string, string>;
  idleTokens: Map<string, string>
  baseIdleApiUrl: string;
  authorizationHeader: string;
  readonly group = 'IDLE';

  constructor(wrappedIdleTokens: Map<string, string>,
              idleTokens: Map<string, string>,
              baseIdleApiUrl: string,
              authorizationHeader: string) {
    this.wrappedIdleTokens = wrappedIdleTokens;
    this.idleTokens = idleTokens;
    this.baseIdleApiUrl = baseIdleApiUrl;
    this.authorizationHeader = authorizationHeader;
  }

  async getAprs() {
    try {

      const aprPromises = Array.from(this.idleTokens.entries()).map(async ([tokenName, idleTokenAddress]) => {
        const { data } = await axios.get([this.baseIdleApiUrl, idleTokenAddress, "?isRisk=false&order=desc&limit=1"].join(''), {
          headers: {
            Authorization: this.authorizationHeader,
          },
        })
        const [json] = data as { idleRate: string }[]
        const value = Number(json.idleRate) / 1e20
        return [
          this.wrappedIdleTokens.get(tokenName),
          value,
        ]
      })
      const res = Array(this.idleTokens.size)
      for (const [index, aprPromise] of aprPromises.entries()) {
        res[index] = await aprPromise
      }
      return Object.fromEntries(res);
    } catch (error) {
      console.error('Failed to fetch Idle APR:', error)
      return {}
    }
  }
}

export const idleMainnetAprHandler = new IdleAprHandler(
  wrapped4626IdleTokensMainnet,
  idleTokensMainnet,
  'https://api.idle.finance/junior-rates/',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IkFwcDciLCJpYXQiOjE2NzAyMzc1Mjd9.L12KJEt8fW1Cvy3o7Nl4OJ2wtEjzlObaAYJ9aC_CY6M'
);