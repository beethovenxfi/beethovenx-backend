export interface ReserveResponse {
  data: {
    reserves: [
      {
        underlyingAsset: string
        liquidityRate: string
      }
    ]
  }
}

export type AaveAprHandlerConfig = {
  wrappedTokens: { [key: string]: string }
  aaveTokens: { [key: string]: string }
  underlyingTokens: { [key: string]: string }
  subgraphUrl: string
  network: number;
}