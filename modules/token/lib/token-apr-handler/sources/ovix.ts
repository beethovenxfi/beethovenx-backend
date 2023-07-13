import { abi } from './abis/oErc20'
import { BigNumber, Contract } from "ethers";
import { ethers } from "ethers";
import { MulticallWrapper } from "ethers-multicall-provider";
import { JsonRpcProvider } from "@ethersproject/providers";

const jsonRpcProvider = new JsonRpcProvider('https://zkevm-rpc.com', 1101)
const provider = MulticallWrapper.wrap(jsonRpcProvider)

export const yieldTokens = {
  USDT: '0xad41c77d99e282267c1492cdefe528d7d5044253',
  USDC: '0x68d9baa40394da2e2c1ca05d30bf33f52823ee7b',
} as { [key: string]: `0x${string}` }

export const wrappedTokens = {
  USDT: '0x550d3bb1f77f97e4debb45d4f817d7b9f9a1affb',
  USDC: '0x3a6789fc7c05a83cfdff5d2f9428ad9868b4ff85',
} as { [key: string]: `0x${string}` }

const noRates = Object.fromEntries(
  Object.values(yieldTokens).map((v) => [v, 0])
)

const getBorrowRates = () => {
  
  const calls = Object.keys(yieldTokens).map(async (coin) => {
    const contract = new Contract(yieldTokens[coin], abi, provider)
    return contract.borrowRatePerTimestamp()
  })

  return Promise.all(calls)
}

export const ovix = async () => {
  try {
    const borrowRates = await getBorrowRates()
    const aprs = Object.keys(wrappedTokens).map((coin, i) => [
      wrappedTokens[coin],
      Math.round(10000 * (Math.pow(1 + (borrowRates[i] as BigNumber).toNumber() / 1e18, 365 * 24 * 60 * 60) - 1))
    ])
    return Object.fromEntries(aprs)
  } catch (error) {
    console.log(error)
    return noRates
  }
}
