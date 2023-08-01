import axios from "axios";
import { gearboxTokensMainnet } from "./tokens";
import { AprHandler } from "../../types";
import { GearboxAprHandlerConfig } from "./types";

class GearboxAprHandler implements AprHandler {
  url: string;
  tokens: { [key: string]: string}
  network: number;
  readonly group = 'GEARBOX';

  constructor(aprHandlerConfig: GearboxAprHandlerConfig) {
    this.tokens = aprHandlerConfig.tokens;
    this.url = aprHandlerConfig.url;
    this.network = aprHandlerConfig.network;
  }

  async getAprs() {
    try {

      const { data } = await axios.get(this.url)
      const json = data as { data: { dieselToken: string; depositAPY_RAY: string }[] }

      const aprEntries = json.data
        .filter((t) => Object.values(this.tokens).includes(t.dieselToken.toLowerCase()))
        .map((({ dieselToken, depositAPY_RAY }) => {
          return [dieselToken, Number(depositAPY_RAY.slice(0, 27)) / 1e27]
        }))
      return Object.fromEntries(aprEntries);
    } catch (error) {
      console.error('Failed to fetch Gearbox APR:', error)
      return {}
    }
  }
}

const gearboxMainnetAprHandler = new GearboxAprHandler({
    tokens: gearboxTokensMainnet,
    url: 'https://mainnet.gearbox.foundation/api/pools',
    network: 1
  })

export const gearboxHandlers = [gearboxMainnetAprHandler]