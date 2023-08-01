export type ReaperAprHandlerConfig = {
  network: number;
  rpcUrl: string;
  yieldTokens: { [key: string]: `0x${ string }` }
  strategiesMap: {
    [key: string]: `0x${ string }`
  }
}