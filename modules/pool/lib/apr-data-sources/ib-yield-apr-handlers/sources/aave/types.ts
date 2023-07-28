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