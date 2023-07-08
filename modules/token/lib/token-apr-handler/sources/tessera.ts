import { abi } from './abis/tesseraPool'
import { JsonRpcProvider } from "@ethersproject/providers";
import { MulticallWrapper } from "ethers-multicall-provider";
import { Contract } from "ethers";

// const client = createPublicClient({
//   chain: mainnet,
//   transport: http('https://rpc.ankr.com/eth'),
// })

const jsonRpcProvider = new JsonRpcProvider('https://rpc.ankr.com/eth', 1 /*MAINNET*/)
const provider = MulticallWrapper.wrap(jsonRpcProvider)

const yieldTokens = {
  sApe: '0x7966c5bae631294d7cffcea5430b78c2f76db6fa',
}

/**
 * Staked ApeCoin APR fetching
 *
 * @returns apr in bsp
 */
export const tessera = async () => {
  let apr = 0

  try {
    const contract = new Contract('0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9', abi, provider)
    const poolsUI  = await contract.getPoolsUI()

    const apePool = poolsUI[0]
    const staked = apePool.stakedAmount
    const reward = apePool.currentTimeRange.rewardsPerHour * BigInt(24 * 365)

    apr = Number(reward * BigInt(1e4) / staked)
  } catch (error) {
    console.error('Failed to fetch Tessera Ape Coin APR:', error)
  }

  return {
    [yieldTokens.sApe]: apr,
  }
}
