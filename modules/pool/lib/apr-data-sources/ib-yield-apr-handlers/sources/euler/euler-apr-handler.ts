import axios from "axios";
import { EulerResponse } from "./types";
import { eulerTokensMainnet } from "./tokens";
import { AprHandler } from "../../types";

class EulerAprHandler implements AprHandler {
  tokens: Map<string, string>
  subgraphUrl: string
  readonly group = 'EULER';

  readonly query = `
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

  constructor(tokens: Map<string, string>, subgraphUrl: string) {
    this.tokens = tokens
    this.subgraphUrl = subgraphUrl
  }

  async getAprs() {
    const requestQuery = {
      operationName: 'getAssetsAPY',
      query: this.query,
      variables: {
        eTokenAddress_in: Array.from(this.tokens.values()),
      },
    }

    const { data } = await axios({
      url: this.subgraphUrl,
      method: 'POST',
      data: JSON.stringify(requestQuery)
    })

    const {
      data: { assets },
    } = data as EulerResponse

    const aprEntries = assets.map(({ eTokenAddress, supplyAPY }) => [
      eTokenAddress,
      // supplyAPY is 1e27 and apr is in bps (1e4), so all we need is to format to 1e23
      Number(supplyAPY.slice(0, 27)) / 1e27
    ])

    return Object.fromEntries(aprEntries)
  }
}

export const eulerMainnetAprHandler = new EulerAprHandler(eulerTokensMainnet, 'https://api.thegraph.com/subgraphs/name/euler-xyz/euler-mainnet');