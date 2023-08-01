import axios from "axios";
import { AprHandler } from "../../types";
import { AnkrAprHandlerConfig } from "./types";

const ankrEthMainnet = '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb'

class AnkrAprHandler implements AprHandler {
  serviceName: string
  tokenAddress: string
  network: number
  readonly url: string = 'https://api.staking.ankr.com/v1alpha/metrics';
  readonly group = 'ANKR';

  constructor(aprHandlerConfig: AnkrAprHandlerConfig) {
    this.serviceName = aprHandlerConfig.serviceName
    this.tokenAddress = aprHandlerConfig.tokenAddress
    this.network = aprHandlerConfig.network
  }

  async getAprs() {
    try {

      const { data } = await axios.get(this.url)
      const json = data as { services: { serviceName: string; apy: string }[] }
      const service = json.services.find((service) => service.serviceName === this.serviceName)
      if (!service) {
        return {}
      }
      const scaledValue = parseFloat(service.apy) / 1e2
      return {
        [this.tokenAddress]: scaledValue
      }
    } catch (error) {
      console.error('Failed to fetch Ankr APR:', error)
      return {}
    }
  }
}

const ankrEthMainnetAprHandler = new AnkrAprHandler(
  {
    serviceName: 'eth',
    tokenAddress: ankrEthMainnet,
    network: 1
  });

export const ankrHandlers = [ankrEthMainnetAprHandler];