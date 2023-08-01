export type OvixAprHandlerConfig = {
  network: number;
  rpcUrl: string;
  yieldTokens: { [key: string]: `0x${ string }` }
  wrappedTokens: {
    [key: string]: `0x${ string }`
  }
}