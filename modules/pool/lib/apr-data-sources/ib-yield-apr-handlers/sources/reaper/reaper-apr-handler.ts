import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumber, Contract } from "ethers";
import { abi } from "../abis/reaperStrategy";
import { reaperStrategiesMapArbitrum, reaperYieldTokensArbitrum } from "./tokens";
import { AprHandler } from "../../types";

class ReaperAprHandler implements AprHandler {
  provider: JsonRpcProvider;
  yieldTokens: { [key: string]: `0x${ string }` };
  strategiesMap: { [key: string]: `0x${ string }` };
  readonly group = 'REAPER';

  constructor(network: number, rpcUrl: string, yieldTokens: { [key: string]: `0x${ string }` }, strategiesMap: {
    [key: string]: `0x${ string }`
  }) {
    this.provider = new JsonRpcProvider(rpcUrl, network);
    this.yieldTokens = yieldTokens;
    this.strategiesMap = strategiesMap;
  }

  async getAprs() {
    try {

      const contractCalls = Object.keys(this.strategiesMap).map(async (tokenName) => {
        const contract = new Contract(this.strategiesMap[tokenName], abi, this.provider)
        return contract.averageAPRAcrossLastNHarvests(3)
      })
      const callsAprResults: BigNumber[] = Array(Object.keys(this.yieldTokens).length)
      for (const [index, aprPromise] of contractCalls.entries()) {
        callsAprResults[index] = await aprPromise
      }
      const aprs = Object.keys(this.strategiesMap).map((tokenName, i) => {
        return [
          this.yieldTokens[tokenName],
          callsAprResults[i].toNumber() / 1e4,
        ]
      })

      return Object.fromEntries(aprs)
    } catch (error) {
      console.error('Failed to fetch Reaper APR:', error)
      return {}
    }
  }
}

export const reaperArbitrumAprHandler = new ReaperAprHandler(42161, 'https://arb1.arbitrum.io/rpc', reaperYieldTokensArbitrum, reaperStrategiesMapArbitrum)