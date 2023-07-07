import axios from "axios";

const ddai = '0x6cfaf95457d7688022fc53e7abe052ef8dfbbdba'
const dusdc = '0xc411db5f5eb3f7d552f9b8454b2d74097ccde6e3'

export const gearbox = async () => {
  const {data} = await axios.get('https://mainnet.gearbox.foundation/api/pools')
  const json = data as { data: { dieselToken: string; depositAPY_RAY: string }[] }
  const dai = json.data.find((t) => t.dieselToken.toLowerCase() == ddai)
  const usdc = json.data.find((t) => t.dieselToken.toLowerCase() == dusdc)
  if (!dai || !usdc) {
    return null
  }

  const scaleDai = Math.round(
    // depositAPY_RAY is 1e27 and apr is in bps (1e4), so all we need is to format to 1e23
    Number(dai.depositAPY_RAY.slice(0, -20)) / 1e3
  )
  const scaleUsdc = Math.round(
    Number(usdc.depositAPY_RAY.slice(0, -20)) / 1e3
  )
  return {
    [ddai]: scaleDai,
    [dusdc]: scaleUsdc
  }
}