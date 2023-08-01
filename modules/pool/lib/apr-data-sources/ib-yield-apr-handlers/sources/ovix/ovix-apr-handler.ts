import { BigNumber, Contract } from "ethers";
import { abi } from "../abis/oErc20";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ovixWrappedTokensZkEvm, ovixYieldTokensZkEvm } from "./tokens";
import { AprHandler } from "../../types";
import { OvixAprHandlerConfig } from "./types";

class OvixAprHandler implements AprHandler {
  network: number;
  provider: JsonRpcProvider;
  yieldTokens: { [key: string]: `0x${ string }` };
  wrappedTokens: { [key: string]: `0x${ string }` };
  readonly group = 'OVIX';

  constructor(aprHandlerConfig: OvixAprHandlerConfig) {
    this.network = aprHandlerConfig.network;
    this.provider = new JsonRpcProvider(aprHandlerConfig.rpcUrl, aprHandlerConfig.network);
    this.yieldTokens = aprHandlerConfig.yieldTokens;
    this.wrappedTokens = aprHandlerConfig.wrappedTokens;
  }

  async getAprs() {
    try {

      const calls = Object.keys(this.yieldTokens).map(async (tokenName) => {
        const contract = new Contract(this.yieldTokens[tokenName], abi, this.provider)
        return contract.borrowRatePerTimestamp()
      })

      const borrowRates = Array(Object.keys(this.yieldTokens).length)
      for (const [index, aprPromise] of calls.entries()) {
        borrowRates[index] = await aprPromise
      }

      const aprs = Object.keys(this.wrappedTokens).map((tokenName, i) => [
        this.wrappedTokens[tokenName],
        (Math.pow(1 + (borrowRates[i] as BigNumber).toNumber() / 1e18, 365 * 24 * 60 * 60) - 1)
      ])

      return Object.fromEntries(aprs)
    } catch (error) {
      console.error('Failed to fetch Ovix APR:', error)
      return {}
    }
  }
}

const ovixZkEVMAprHandler = new OvixAprHandler({
  network: 1101,
  rpcUrl: 'https://zkevm-rpc.com',
  yieldTokens: ovixYieldTokensZkEvm,
  wrappedTokens: ovixWrappedTokensZkEvm
});

export const ovixHandlers = [ovixZkEVMAprHandler]
