import axios from "axios";
import { idleTokensMainnet, wrapped4626IdleTokensMainnet } from "./tokens";
import { AprHandler } from "../../types";
import { IdleAprHandlerConfig } from "./types";

class IdleAprHandler implements AprHandler {
  wrappedIdleTokens: { [key: string]: string };
  idleTokens: { [key: string]: string };
  baseIdleApiUrl: string;
  authorizationHeader: string;
  network: number;
  readonly group = 'IDLE';

  constructor(aprHandlerConfig: IdleAprHandlerConfig) {
    this.wrappedIdleTokens = aprHandlerConfig.wrappedIdleTokens;
    this.idleTokens = aprHandlerConfig.idleTokens;
    this.baseIdleApiUrl = aprHandlerConfig.baseIdleApiUrl;
    this.authorizationHeader = aprHandlerConfig.authorizationHeader;
    this.network = aprHandlerConfig.network;
  }

  async getAprs() {
    try {

      const aprPromises = Object.entries(this.idleTokens)
        .map(async ([tokenName, idleTokenAddress]) => {
          const { data } = await axios.get([this.baseIdleApiUrl, idleTokenAddress, "?isRisk=false&order=desc&limit=1"].join(''), {
            headers: {
              Authorization: this.authorizationHeader,
            },
          })
          const [json] = data as { idleRate: string }[]
          const value = Number(json.idleRate) / 1e20
          return [
            this.wrappedIdleTokens[tokenName],
            value,
          ]
        })
      const res = Array(Object.keys(this.idleTokens).length)
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

const idleMainnetAprHandler = new IdleAprHandler(
  {
    wrappedIdleTokens: wrapped4626IdleTokensMainnet,
    idleTokens: idleTokensMainnet,
    baseIdleApiUrl: 'https://api.idle.finance/junior-rates/',
    authorizationHeader: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IkFwcDciLCJpYXQiOjE2NzAyMzc1Mjd9.L12KJEt8fW1Cvy3o7Nl4OJ2wtEjzlObaAYJ9aC_CY6M',
    network: 1
  });

export const idleAprHandlers = [idleMainnetAprHandler]