import axios from "axios";
import { AprHandler } from "../../types";

const qETHMainnet = '0x93ef1ea305d11a9b2a3ebb9bb4fcc34695292e7d'

class TranchessAprHandler implements AprHandler {
  url: string;
  token: string;
  readonly group = 'TRANCHESS';

  constructor(token: string, url: string) {
    this.token = token;
    this.url = url;
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

export const tranchessMainnetAprHandler = new TranchessAprHandler(qETHMainnet, 'https://tranchess.com/eth/api/v3/funds')