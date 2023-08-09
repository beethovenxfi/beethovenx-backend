import { Contract } from "ethers";
import { abi } from "./abis/tesseraPool";
import { JsonRpcProvider } from "@ethersproject/providers";
import { AprHandler } from "../types";

class TesseraAprHandler implements AprHandler {
  network: number;
  provider: JsonRpcProvider;
  yieldTokens: { [key: string]: `0x${ string }` };
  stakingContractAddress: `0x${ string }`;
  readonly group = 'TESSERA';

  constructor(aprHandlerConfig: TesseraAprHandlerConfig) {
    this.network = aprHandlerConfig.network;
    this.provider = new JsonRpcProvider(aprHandlerConfig.rpcUrl, aprHandlerConfig.network);
    this.yieldTokens = aprHandlerConfig.yieldTokens;
    this.stakingContractAddress = aprHandlerConfig.contractAddress;
  }

  async getAprs() {
    try {
      let apr = 0
      try {
        const contract = new Contract(this.stakingContractAddress, abi, this.provider)
        const poolsUI = await contract.getPoolsUI()

        const pool = poolsUI[0]
        const staked = BigInt(pool.stakedAmount)
        const reward = BigInt(pool.currentTimeRange.rewardsPerHour) * BigInt(24 * 365)
        apr = Number(reward.toString()) / Number(staked.toString());
      } catch (error) {
        console.error('Failed to fetch Tessera Ape Coin APR:', error)
      }

      return {
        [this.yieldTokens.sApe]: apr,
      }
    } catch (error) {
      console.error('Failed to fetch Tessera APR:', error)
      return {}
    }
  }
}

type TesseraAprHandlerConfig = {
  network: number;
  rpcUrl: string;
  yieldTokens: { [key: string]: `0x${ string }` };
  contractAddress: `0x${ string }`;
}

const tesseraYieldTokensMainnet = {
  sApe: '0x7966c5bae631294d7cffcea5430b78c2f76db6fa',
} as { [key: string]: `0x${ string }` }

const tesseraMainnetAprHandler = new TesseraAprHandler({
    network: 1,
    rpcUrl: 'https://rpc.ankr.com/eth',
    yieldTokens: tesseraYieldTokensMainnet,
    contractAddress: '0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9' /*ApeCoinStaking*/
  })

export const tesseraHandlers = [tesseraMainnetAprHandler]