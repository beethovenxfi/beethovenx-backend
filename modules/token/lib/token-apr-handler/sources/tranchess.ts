import axios from "axios";

export const tranchess = async () => {
  const { data } = await axios.get('https://tranchess.com/eth/api/v3/funds');
  const [{ weeklyAveragePnlPercentage }] = data as { weeklyAveragePnlPercentage: string }[]
  // The key weeklyAveragePnlPercentage is the daily yield of qETH in 18 decimals, timing 365 should give you the APR.
  const scaledValue = Math.round(365 * Number(weeklyAveragePnlPercentage) / 1e14)
  return {
    '0x93ef1ea305d11a9b2a3ebb9bb4fcc34695292e7d': scaledValue
  }
}
