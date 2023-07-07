import { abi } from './abis/oErc20'
import { ContractFunctionConfig, createPublicClient, http } from 'viem'
import { polygonZkEvm } from 'viem/chains'

const client = createPublicClient({
  chain: {
    ...polygonZkEvm,
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 57_746,
      },
    }
  },
  transport: http('https://zkevm-rpc.com'),
})

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
  const contracts: ContractFunctionConfig[] = Object.keys(yieldTokens).map((coin) => ({
    address: yieldTokens[coin],
    abi,
    functionName: 'borrowRatePerTimestamp',
    args: []
  }))

  return client.multicall({ contracts })
}

export const ovix = async () => {
  try {
    const borrowRates = await getBorrowRates()

    const aprs = Object.keys(wrappedTokens).map((coin, i) => [
      wrappedTokens[coin],
      Math.round(10000 * (Math.pow(1 + Number(borrowRates[i].result) / 1e18, 365 * 24 * 60 * 60) - 1))
    ])

    return Object.fromEntries(aprs)
  } catch (error) {
    console.log(error)
    return noRates
  }
}
