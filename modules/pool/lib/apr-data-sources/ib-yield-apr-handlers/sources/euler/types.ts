export interface EulerResponse {
  data: {
    assets: [
      {
        eTokenAddress: string
        supplyAPY: string
      }
    ]
  }
}