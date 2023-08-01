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

export type EulerAprHandlerConfig = {
  tokens: {[key: string]: string};
  subgraphUrl: string;
  network: number;
  
}