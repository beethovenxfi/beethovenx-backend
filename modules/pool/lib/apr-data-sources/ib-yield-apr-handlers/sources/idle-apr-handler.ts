import axios from "axios";
import { AprHandler } from "../types";

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

const wrapped4626IdleTokensMainnet = {
  idleDAI: '0x0c80f31b840c6564e6c5e18f386fad96b63514ca',
  idleUSDC: '0xc3da79e0de523eef7ac1e4ca9abfe3aac9973133',
  idleUSDT: '0x544897a3b944fdeb1f94a0ed973ea31a80ae18e1',
}

const idleTokensMainnet = {
  idleDAI: '0xec9482040e6483b7459cc0db05d51dfa3d3068e1',
  idleUSDC: '0xdc7777c771a6e4b3a82830781bdde4dbc78f320e',
  idleUSDT: '0xfa3afc9a194babd56e743fa3b7aa2ccbed3eaaad',
}

type IdleAprHandlerConfig = {
  wrappedIdleTokens: {[key: string]: string};
  idleTokens: {[key: string]: string};
  baseIdleApiUrl: string;
  authorizationHeader: string;
  network: number;
}

const idleMainnetAprHandler = new IdleAprHandler({
    wrappedIdleTokens: wrapped4626IdleTokensMainnet,
    idleTokens: idleTokensMainnet,
    baseIdleApiUrl: 'https://api.idle.finance/junior-rates/',
    authorizationHeader: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IkFwcDciLCJpYXQiOjE2NzAyMzc1Mjd9.L12KJEt8fW1Cvy3o7Nl4OJ2wtEjzlObaAYJ9aC_CY6M',
    network: 1
  });

export const idleAprHandlers = [idleMainnetAprHandler]