import axios from "axios";

export const tetu = async () => {
  const { data } = await axios.get('https://api.tetu.io/api/v1/reader/compoundAPRs?network=MATIC')
  const json = data as { vault: string, apr: number }[]
  const aprs = json.map((t) => [t.vault, Math.round(t.apr * 100)])

  return Object.fromEntries(aprs)
}
