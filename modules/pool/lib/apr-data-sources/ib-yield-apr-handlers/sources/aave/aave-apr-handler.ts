import axios from "axios";
import { ReserveResponse } from "./types";
import {
  aaveTokensV2Mainnet,
  aaveTokensV2Polygon,
  aaveTokensV3Arbitrum,
  aaveTokensV3Mainnet,
  aaveTokensV3Polygon, underlyingTokensArbitrum,
  underlyingTokensMainnet,
  underlyingTokensPolygon,
  wrappedAaveTokensV2Mainnet,
  wrappedAaveTokensV2Polygon,
  wrappedAaveTokensV3Arbitrum,
  wrappedAaveTokensV3Mainnet,
  wrappedAaveTokensV3Polygon
} from "./tokens";
import { AprHandler } from "../../types";

class AaveAprHandler implements AprHandler {

  wrappedTokens: Map<string, string>
  aaveTokens: Map<string, string>
  underlyingTokens: Map<string, string>
  subgraphUrl: string

  readonly group = 'AAVE';

  readonly query = `query getReserves($aTokens: [String!], $underlyingAssets: [Bytes!]) {
    reserves(
      where: {
        aToken_in: $aTokens
        underlyingAsset_in: $underlyingAssets
        isActive: true
      }
    ) {
      id
      underlyingAsset
      liquidityRate
    }
  }`

  constructor(wrappedTokens: Map<string, string>,
              aaveTokens: Map<string, string>,
              underlyingTokens: Map<string, string>,
              subgraphUrl: string
  ) {
    this.wrappedTokens = wrappedTokens
    this.aaveTokens = aaveTokens
    this.underlyingTokens = underlyingTokens
    this.subgraphUrl = subgraphUrl
  }

  async getAprs() {
    try {
      const requestQuery = {
        operationName: 'getReserves',
        query: this.query,
        variables: {
          aTokens: Array.from(this.aaveTokens.values()),
          underlyingAssets: Array.from(this.underlyingTokens.values()),
        },
      }
      const { data } = await axios({
        url: this.subgraphUrl,
        method: "post",
        data: requestQuery,
        headers: { "Content-Type": "application/json" }
      })
      const {
        data: { reserves },
      } = data as ReserveResponse

      const aprsByUnderlyingAddress = Object.fromEntries(reserves.map((r) => [
        r.underlyingAsset,
        // Note: our assumption is frontend usage, this service is not a good source where more accuracy is needed.
        // Converting from aave ray number (27 digits) to bsp
        // essentially same as here:
        // https://github.com/aave/aave-utilities/blob/master/packages/math-utils/src/formatters/reserve/index.ts#L231
        Number(r.liquidityRate.slice(0, 27)) / 1e27,
      ]))
      const aprEntries = Object.fromEntries(
        Array.from(this.underlyingTokens.entries())
          //Removing undefined aprs
          .filter(([, address]) => !!aprsByUnderlyingAddress[address])
          //Mapping aprs by wrapped instead of underlying addresses
          .map(([underlyingTokenName, underlyingTokenAddress]) => [
            this.wrappedTokens.get('wa' + underlyingTokenName) as string,
            aprsByUnderlyingAddress[underlyingTokenAddress],
          ]))
      return aprEntries;
    } catch (e) {
      console.error(`Failed to fetch Aave APR in subgraph ${ this.subgraphUrl }:`, e)
      return {}
    }
  }
}

export const aaveV2MainnetAprHandler = new AaveAprHandler(wrappedAaveTokensV2Mainnet, aaveTokensV2Mainnet, underlyingTokensMainnet, 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2')
export const aaveV2PolygonAprHandler = new AaveAprHandler(wrappedAaveTokensV2Polygon, aaveTokensV2Polygon, underlyingTokensPolygon, 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic')
export const aaveV3MainnetAprHandler = new AaveAprHandler(wrappedAaveTokensV3Mainnet, aaveTokensV3Mainnet, underlyingTokensMainnet, 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3')
export const aaveV3PolygonAprHandler = new AaveAprHandler(wrappedAaveTokensV3Polygon, aaveTokensV3Polygon, underlyingTokensPolygon, 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon');
export const aaveV3ArbitrumAprHandler = new AaveAprHandler(wrappedAaveTokensV3Arbitrum, aaveTokensV3Arbitrum, underlyingTokensArbitrum, 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum')

