export type IdleAprHandlerConfig = {
  wrappedIdleTokens: {[key: string]: string};
  idleTokens: {[key: string]: string};
  baseIdleApiUrl: string;
  authorizationHeader: string;
  network: number;
}