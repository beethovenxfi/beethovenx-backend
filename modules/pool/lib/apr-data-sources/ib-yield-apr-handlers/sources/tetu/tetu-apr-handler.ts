import axios from "axios";
import { AprHandler } from "../../types";

class TetuAprHandler implements AprHandler {
  
  baseUrl: string;
  networkName: string;
  readonly group = 'TETU';
  
  constructor(baseUrl: string, networkName: string) {
    this.baseUrl = baseUrl;
    this.networkName = networkName;
  }
  
  async getAprs() {
    try{
      
    const { data } = await axios.get(`${this.baseUrl}?network=${ this.networkName }`)
    const json = data as { vault: string, apr: number }[]
    const aprs = json.map((t) => [t.vault, t.apr / 100])

    return Object.fromEntries(aprs)
    } catch (error) {
      console.error('Failed to fetch Tetu APR:', error)
      return {}
    }
  }
}

export const tetuAprHandler = new TetuAprHandler('https://api.tetu.io/api/v1/reader/compoundAPRs', 'MATIC')