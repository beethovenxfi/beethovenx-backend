import axios from "axios";

const yieldTokens = {
  eUSDC: '0xeb91861f8a4e1c12333f42dce8fb0ecdc28da716',
  eDAI: '0xe025e3ca2be02316033184551d4d3aa22024d9dc',
  eUSDT: '0x4d19f33948b99800b6113ff3e83bec9b537c85d2',
  eFRAX: '0x5484451a88a35cd0878a1be177435ca8a0e4054e',
}

const query = `
  query getAssetsAPY($eTokenAddress_in: [String!]) {
    assets(
      where: {
        eTokenAddress_in: $eTokenAddress_in
      }
    ) {
      eTokenAddress
      supplyAPY
    }
  }
`

const requestQuery = {
  operationName: 'getAssetsAPY',
  query,
  variables: {
    eTokenAddress_in: Object.values(yieldTokens),
  },
}

const url = 'https://api.thegraph.com/subgraphs/name/euler-xyz/euler-mainnet'

interface EulerResponse {
  data: {
    assets: [
      {
        eTokenAddress: string
        supplyAPY: string
      }
    ]
  }
}

export const euler = async () => {
  const {data} = await axios.post(url, {
    body: JSON.stringify(requestQuery)
  })

  const {
    data: { assets },
  } = data as EulerResponse

  const aprEntries = assets.map(({ eTokenAddress, supplyAPY }) => [
    eTokenAddress,
    // supplyAPY is 1e27 and apr is in bps (1e4), so all we need is to format to 1e23
    Math.round(Number(supplyAPY.slice(0, -20)) / 1e3)
  ])

  return Object.fromEntries(aprEntries)
}
