import { BigNumber, Contract } from "ethers";
import { abi } from "../abis/oErc20";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ovixWrappedTokensZkEvm, ovixYieldTokensZkEvm } from "./tokens";
import { AprHandler } from "../../types";

class OvixAprHandler implements AprHandler {
  provider: JsonRpcProvider;
  yieldTokens: { [key: string]: `0x${ string }` };
  wrappedTokens: { [key: string]: `0x${ string }` };
  readonly group = 'OVIX';

  constructor(network: number, rpcUrl: string, yieldTokens: { [key: string]: `0x${ string }` }, wrappedTokens: {
    [key: string]: `0x${ string }`
  }) {
    this.provider = new JsonRpcProvider(rpcUrl, network);
    this.yieldTokens = yieldTokens;
    this.wrappedTokens = wrappedTokens;
  }

  getAprs = async () => {
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

export const ovixZkEVMAprHandler = new OvixAprHandler(1101, 'https://zkevm-rpc.com', ovixYieldTokensZkEvm, ovixWrappedTokensZkEvm);
