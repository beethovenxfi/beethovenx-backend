// can be fetched from subgraph
// aave-js: supplyAPR = graph.liquidityRate = core.getReserveCurrentLiquidityRate(_reserve)
// or directly from RPC:
// wrappedAaveToken.LENDING_POOL.getReserveCurrentLiquidityRate(mainTokenAddress)

import axios from "axios";

const wrappedTokensMap = {
  v2: {
    [1]: {
      // USDT
      '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58': {
        aToken: '0x3ed3b47dd13ec9a98b44e6204a523e766b225811',
        underlying: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      },
      // USDC
      '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de': {
        aToken: '0xbcca60bb61934080951369a648fb03df4f96263c',
        underlying: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
      // DAI
      '0x02d60b84491589974263d922d9cc7a3152618ef6': {
        aToken: '0x028171bca77440897b824ca71d1c56cac55b68a3',
        underlying: '0x6b175474e89094c44da98b954eedeac495271d0f',
      },
    },
    [137]: {
      // USDT
      '0x19c60a251e525fa88cd6f3768416a8024e98fc19': {
        aToken: '0x60d55f02a771d515e077c9c2403a1ef324885cec',
        underlying: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      },
      // USDC
      '0x221836a597948dce8f3568e044ff123108acc42a': {
        aToken: '0x1a13f4ca1d028320a707d99520abfefca3998b7f',
        underlying: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      },
      // DAI
      '0xee029120c72b0607344f35b17cdd90025e647b00': {
        aToken: '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
        underlying: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      },
    },
  },
  v3: {
    [1]: {
      // USDT
      '0xa7e0e66f38b8ad8343cff67118c1f33e827d1455': {
        aToken: '0x23878914efe38d27c4d67ab83ed1b93a74d4086a',
        underlying: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      },
      // USDC
      '0x57d20c946a7a3812a7225b881cdcd8431d23431c': {
        aToken: '0x98c23e9d8f34fefb1b7bd6a91b7ff122f4e16f5c',
        underlying: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      },
      // DAI
      '0x098256c06ab24f5655c5506a6488781bd711c14b': {
        aToken: '0x018008bfb33d285247a21d44e50697654f754e63',
        underlying: '0x6b175474e89094c44da98b954eedeac495271d0f',
      },
      // WETH
      '0x59463bb67ddd04fe58ed291ba36c26d99a39fbc6': {
        aToken: '0x4d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e8',
        underlying: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
    },
    [137]: {
      // Matic
      '0x0d6135b2cfbae3b1c58368a93b855fa54fa5aae1': {
        aToken: '0x6d80113e533a2c0fe82eabd35f1875dcea89ea97',
        underlying: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      },
      // USDT
      '0x715d73a88f2f0115d87cfe5e0f25d756b2f9679f': {
        aToken: '0x6ab707aca953edaefbc4fd23ba73294241490620',
        underlying: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      },
      // USDC
      '0xac69e38ed4298490906a3f8d84aefe883f3e86b5': {
        aToken: '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
        underlying: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      },
      // DAI
      '0xdb6df721a6e7fdb97363079b01f107860ac156f9': {
        aToken: '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
        underlying: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      },
      // WETH
      '0xa5bbf0f46b9dc8a43147862ba35c8134eb45f1f5': {
        aToken: '0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8',
        underlying: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      },
    },
    [42161]: {
      // USDT
      '0x3c7680dfe7f732ca0279c39ff30fe2eafdae49db': {
        aToken: '0x6ab707aca953edaefbc4fd23ba73294241490620',
        underlying: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      },
      // USDC
      '0xe719aef17468c7e10c0c205be62c990754dff7e5': {
        aToken: '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
        underlying: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      },
      // DAI
      '0x345a864ac644c82c2d649491c905c71f240700b2': {
        aToken: '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
        underlying: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
      },
      // WETH
      '0x18c100415988bef4354effad1188d1c22041b046': {
        aToken: '0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8',
        underlying: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      }
    },
  }
}

const aTokens = {
  v2: {
    [1]: Object.values(wrappedTokensMap.v2[1]).map(
      (t) => t.aToken
    ),
    [137]: Object.values(wrappedTokensMap.v2[137]).map(
      (t) => t.aToken
    ),
    [42161]: {},
  },
  v3: {
    [1]: Object.values(wrappedTokensMap.v3[1]).map(
      (t) => t.aToken
    ),
    [137]: Object.values(wrappedTokensMap.v3[137]).map(
      (t) => t.aToken
    ),
    [42161]: Object.values(wrappedTokensMap.v3[42161]).map(
      (t) => t.aToken
    ),
  }
}

const underlyingAssets = {
  v2: {
    [1]: Object.values(wrappedTokensMap.v2[1]).map(
      (t) => t.underlying
    ),
    [137]: Object.values(wrappedTokensMap.v2[137]).map(
      (t) => t.underlying
    ),
    [42161]: {},
  },
  v3: {
    [1]: Object.values(wrappedTokensMap.v3[1]).map(
      (t) => t.underlying
    ),
    [137]: Object.values(wrappedTokensMap.v3[137]).map(
      (t) => t.underlying
    ),
    [42161]: Object.values(wrappedTokensMap.v3[42161]).map(
      (t) => t.underlying
    ),
  }
}

const underlyingsToWrapped = [
  { version: 'v2', network: 1, tokens: Object.fromEntries(
      Object.keys(wrappedTokensMap.v2[1]).map((wrapped) => [
        wrappedTokensMap.v2[1][wrapped as keyof (typeof wrappedTokensMap)['v2'][1]].underlying,
        wrapped,
      ])
    ) },
  { version: 'v2', network: 137, tokens: Object.fromEntries(
      Object.keys(wrappedTokensMap.v2[137]).map((wrapped) => [
        wrappedTokensMap.v2[137][
          wrapped as keyof (typeof wrappedTokensMap)['v2'][137]
        ].underlying,
        wrapped,
      ])
    ) },
  { version: 'v3', network: 1, tokens: Object.fromEntries(
      Object.keys(wrappedTokensMap.v3[1]).map((wrapped) => [
        wrappedTokensMap.v3[1][wrapped as keyof (typeof wrappedTokensMap)['v3'][1]].underlying,
        wrapped,
      ])
    ) },
  { version: 'v3', network: 137, tokens: Object.fromEntries(
      Object.keys(wrappedTokensMap.v3[137]).map((wrapped) => [
        wrappedTokensMap.v3[137][
          wrapped as keyof (typeof wrappedTokensMap)['v3'][137]
        ].underlying,
        wrapped,
      ])
    ) },
  { version: 'v3', network: 42161, tokens: Object.fromEntries(
      Object.keys(wrappedTokensMap.v3[42161]).map((wrapped) => [
        wrappedTokensMap.v3[42161][
          wrapped as keyof (typeof wrappedTokensMap)['v3'][42161]
        ].underlying,
        wrapped,
      ])
    ) },
]

// Subgraph
// liquidityRate, depositors APR (in rays - 27 digits)
const endpoints = [
  { version: 'v2', network: 1, subgraph: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2' },
  { version: 'v2', network: 137, subgraph: 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic' },
  { version: 'v3', network: 1, subgraph: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3' },
  { version: 'v3', network: 137, subgraph: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon' },
  { version: 'v3', network: 42161, subgraph: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum' },
]

const query = `
  query getReserves($aTokens: [String!], $underlyingAssets: [Bytes!]) {
    reserves(
      where: {
        aToken_in: $aTokens
        underlyingAsset_in: $underlyingAssets
        isActive: true
      }
    ) {
      underlyingAsset
      liquidityRate
    }
  }
`

interface ReserveResponse {
  data: {
    reserves: [
      {
        underlyingAsset: string
        liquidityRate: string
      }
    ]
  }
}

/**
 * Fetching and parsing aave APRs from a subgraph
 *
 * @returns APRs for aave tokens
 */
export const aave = async (network: number, version: keyof (typeof wrappedTokensMap) = 'v2') => {
  const noRates = Object.fromEntries(
    Object.keys(wrappedTokensMap[version]).map((key) => [key, 0])
  )

  if (!network || (network != 1 && network != 137 && network != 42161)) {
    return noRates
  }

  if (network == 42161 && version != 'v3') {
    return noRates
  }

  try {
    const requestQuery = {
      operationName: 'getReserves',
      query,
      variables: {
        aTokens: aTokens[version][network],
        underlyingAssets: underlyingAssets[version][network],
      },
    }

    const endpoint = endpoints.find((e) => e.version == version && e.network == network)?.subgraph
    const underlyingToWrapped = underlyingsToWrapped.find((e) => e.version == version && e.network == network)?.tokens

    if (!endpoint) {
      throw 'no endpoint found'
    }

    if (!underlyingToWrapped) {
      throw 'no underlyingToWrapped found'
    }

    const { data } = await axios.post(endpoint, {
      body: JSON.stringify(requestQuery)
    })

    const {
      data: { reserves },
    } = data as ReserveResponse

    const aprEntries = reserves.map((r) => [
      underlyingToWrapped[r.underlyingAsset],
      // Note: our assumption is frontend usage, this service is not a good source where more accuracy is needed.
      // Converting from aave ray number (27 digits) to bsp
      // essentially same as here:
      // https://github.com/aave/aave-utilities/blob/master/packages/math-utils/src/formatters/reserve/index.ts#L231
      Math.round(Number(r.liquidityRate.slice(0, -20)) / 1e3),
    ])

    return Object.fromEntries(aprEntries)
  } catch (error) {
    console.log(error)

    return noRates
  }
}

// TODO: RPC multicall
// always upto date
// const lendingPoolAddress = '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9';
