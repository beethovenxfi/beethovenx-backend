import axios from "axios";
import { gearboxTokensMainnet } from "./tokens";
import { AprHandler } from "../../types";

class GearboxAprHandler implements AprHandler {
  url: string;
  tokens: Map<string, string>;
  readonly group = 'GEARBOX';

  constructor(tokens: Map<string, string>, url: string,) {
    this.tokens = tokens;
    this.url = url;
  }

  async getAprs() {
    try {

      const { data } = await axios.get(this.url)
      const json = data as { data: { dieselToken: string; depositAPY_RAY: string }[] }

      const aprEntries = json.data
        .filter((t) => Array.from(this.tokens.values()).includes(t.dieselToken.toLowerCase()))
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

export const gearboxMainnetAprHandler = new GearboxAprHandler(
  gearboxTokensMainnet,
  'https://mainnet.gearbox.foundation/api/pools'
)