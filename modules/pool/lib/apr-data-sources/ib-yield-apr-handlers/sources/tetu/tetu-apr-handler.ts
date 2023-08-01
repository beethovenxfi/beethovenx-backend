import axios from "axios";
import { AprHandler } from "../../types";
import { TetuAprHandlerConfig } from "./types";

class TetuAprHandler implements AprHandler {
  network: number;
  baseUrl: string;
  networkName: string;
  readonly group = 'TETU';

  constructor(aprHandlerConfig: TetuAprHandlerConfig) {
    this.network = aprHandlerConfig.network;
    this.baseUrl = aprHandlerConfig.baseUrl;
    this.networkName = aprHandlerConfig.networkName;
  }

  async getAprs() {
    try {

      const { data } = await axios.get(`${ this.baseUrl }?network=${ this.networkName }`)
      const json = data as { vault: string, apr: number }[]
      const aprs = json.map((t) => [t.vault, t.apr / 100])

      return Object.fromEntries(aprs)
    } catch (error) {
      console.error('Failed to fetch Tetu APR:', error)
      return {}
    }
  }
}

const tetuPolygonAprHandler = new TetuAprHandler({
  network: 137,
  baseUrl: 'https://api.tetu.io/api/v1/reader/compoundAPRs',
  networkName: 'MATIC'
})

export const tetuHandlers = [tetuPolygonAprHandler]