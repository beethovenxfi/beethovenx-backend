import axios from "axios";
import { AaveAprHandlerConfig, ReserveResponse } from "./types";
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

  wrappedTokens: { [key: string]: string }
  aaveTokens: { [key: string]: string }
  underlyingTokens: { [key: string]: string }
  subgraphUrl: string
  network: number;

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

  constructor(aprHandlerConfig: AaveAprHandlerConfig) {
    this.wrappedTokens = aprHandlerConfig.wrappedTokens
    this.aaveTokens = aprHandlerConfig.aaveTokens
    this.underlyingTokens = aprHandlerConfig.underlyingTokens
    this.subgraphUrl = aprHandlerConfig.subgraphUrl
    this.network = aprHandlerConfig.network;
  }

  async getAprs() {
    try {
      const requestQuery = {
        operationName: 'getReserves',
        query: this.query,
        variables: {
          aTokens: Object.values(this.aaveTokens),
          underlyingAssets: Object.values(this.underlyingTokens),
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
        // Converting from aave ray number (27 digits) to float
        Number(r.liquidityRate.slice(0, 27)) / 1e27,
      ]))
      const aprEntries = Object.fromEntries(
        Object.values(this.underlyingTokens)
          //Removing undefined aprs
          .filter(([, address]) => !!aprsByUnderlyingAddress[address])
          //Mapping aprs by wrapped instead of underlying addresses
          .map(([underlyingTokenName, underlyingTokenAddress]) => [
            this.wrappedTokens['wa' + underlyingTokenName] as string,
            aprsByUnderlyingAddress[underlyingTokenAddress],
          ]))
      return aprEntries;
    } catch (e) {
      console.error(`Failed to fetch Aave APR in subgraph ${ this.subgraphUrl }:`, e)
      return {}
    }
  }
}

const aaveV2MainnetAprHandler = new AaveAprHandler({
  wrappedTokens: wrappedAaveTokensV2Mainnet,
  aaveTokens: aaveTokensV2Mainnet,
  underlyingTokens: underlyingTokensMainnet,
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
  network: 1
})

const aaveV2PolygonAprHandler = new AaveAprHandler({
  wrappedTokens: wrappedAaveTokensV2Polygon,
  aaveTokens: aaveTokensV2Polygon,
  underlyingTokens: underlyingTokensPolygon,
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic',
  network: 137
})
const aaveV3MainnetAprHandler = new AaveAprHandler({
  wrappedTokens: wrappedAaveTokensV3Mainnet,
  aaveTokens: aaveTokensV3Mainnet,
  underlyingTokens: underlyingTokensMainnet,
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3',
  network: 1
})
const aaveV3PolygonAprHandler = new AaveAprHandler({
  wrappedTokens: wrappedAaveTokensV3Polygon,
  aaveTokens: aaveTokensV3Polygon,
  underlyingTokens: underlyingTokensPolygon,
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon',
  network: 137
});
const aaveV3ArbitrumAprHandler = new AaveAprHandler({
  wrappedTokens: wrappedAaveTokensV3Arbitrum,
  aaveTokens: aaveTokensV3Arbitrum,
  underlyingTokens: underlyingTokensArbitrum,
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum',
  network: 42161
})

export const aaveHandlers = [
  aaveV2MainnetAprHandler,
  aaveV2PolygonAprHandler,
  aaveV3MainnetAprHandler,
  aaveV3PolygonAprHandler,
  aaveV3ArbitrumAprHandler
]
