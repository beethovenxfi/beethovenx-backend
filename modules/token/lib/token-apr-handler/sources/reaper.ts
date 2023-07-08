import { abi } from './abis/reaperStrategy'
import { ContractFunctionConfig, createPublicClient, http, Narrow } from 'viem'
import { JsonRpcProvider } from "@ethersproject/providers";
import { MulticallWrapper } from "ethers-multicall-provider";
import { Contract } from "ethers";

// const client = createPublicClient({
//   chain: arbitrum,
//   transport: http('https://arb1.arbitrum.io/rpc'),
// })

const jsonRpcProvider = new JsonRpcProvider('https://arb1.arbitrum.io/rpc', 42161 /*ARBITRUM*/)
const provider = MulticallWrapper.wrap(jsonRpcProvider)

export const yieldTokens = {
  DAI: '0x12f256109e744081f633a827be80e06d97ff7447',
  USDT: '0x0179bac7493a92ac812730a4c64a0b41b7ea0ecf',
  USDC: '0xaeacf641a0342330ec681b57c0a6af0b71d5cbff',
} as { [key: string]: `0x${ string }` }

export const strategiesMap = {
  DAI: '0xd4d5321b04e4832772a4d70e1eed6bcb7402d7ac',
  USDT: '0x8a674ebbe33d6b03825626fa432e9ece888e13b5',
  USDC: '0x6f6c0c5b7af2a326111ba6a9fa4926f7ca3adf44',
} as { [key: string]: `0x${ string }` }

const noRates = Object.fromEntries(
  Object.values(yieldTokens).map((v) => [v, 0])
)

const getAprs = () => {

  const calls = Object.keys(strategiesMap).map(async (coin) => {
    const contract = new Contract(strategiesMap[coin], abi, provider)
    return contract.averageAPRAcrossLastNHarvests(3)
  })

  return Promise.all(calls)
}

export const reaper = async () => {
  try {
    const results = await getAprs()

    const aprs = Object.keys(strategiesMap).map((coin, i) => [
      yieldTokens[coin],
      Math.round(Number(results[i].result)),
    ])

    return Object.fromEntries(aprs)
  } catch (error) {
    console.log(error)
    return noRates
  }
}
