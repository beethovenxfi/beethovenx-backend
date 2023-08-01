import axios from "axios";
import { AprHandler } from "../../types";
import { TranchessAprHandlerConfig } from "./types";

const qETHMainnet = '0x93ef1ea305d11a9b2a3ebb9bb4fcc34695292e7d'

class TranchessAprHandler implements AprHandler {
  network: number;
  url: string;
  token: string;
  readonly group = 'TRANCHESS';

  constructor(aprHandlerConfig: TranchessAprHandlerConfig) {
    this.network = aprHandlerConfig.network;
    this.token = aprHandlerConfig.token;
    this.url = aprHandlerConfig.url;
  }

  async getAprs() {
    try {
      const { data } = await axios.get('https://tranchess.com/eth/api/v3/funds');
      const [{ weeklyAveragePnlPercentage }] = data as { weeklyAveragePnlPercentage: string }[]
      // The key weeklyAveragePnlPercentage is the daily yield of qETH in 18 decimals, timing 365 should give you the APR.
      const value = (365 * Number(weeklyAveragePnlPercentage)) / 1e18
      return {
        [this.token]: value
      }
    } catch (error) {
      console.error('Failed to fetch Tranchess APR:', error)
      return {}
    }
  }
}

const tranchessMainnetAprHandler = new TranchessAprHandler({
  network: 1,
  token: qETHMainnet,
  url: 'https://tranchess.com/eth/api/v3/funds'
})

export const tranchessHandlers = [tranchessMainnetAprHandler]