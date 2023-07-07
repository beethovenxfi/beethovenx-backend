import axios from "axios";

const ankrEth = '0xe95a203b1a91a908f9b9ce46459d101078c2c3cb'

export const ankr = async () => {
  const { data } = await axios.get('https://api.staking.ankr.com/v1alpha/metrics')
  const json = data as { services: { serviceName: string; apy: string }[] }
  const service = json.services.find((service) => service.serviceName === 'eth')
  if (!service) {
    return null
  }
  const scaledValue = Math.round(parseFloat(service.apy) * 100)
  return {
    [ankrEth]: scaledValue
  }
}
