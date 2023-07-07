import { abi } from './abis/tesseraPool'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http('https://rpc.ankr.com/eth'),
})

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
    const poolsUI  = await client.readContract({
      address: '0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9',
      abi,
      functionName: 'getPoolsUI',
    }) as unknown as { stakedAmount: bigint; currentTimeRange: { rewardsPerHour: bigint } }[]

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
