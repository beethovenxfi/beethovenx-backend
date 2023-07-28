import { Contract } from "ethers";
import { abi } from "../abis/tesseraPool";
import { JsonRpcProvider } from "@ethersproject/providers";
import { tesseraYieldTokensMainnet } from "./tokens";
import { AprHandler } from "../../types";

class TesseraAprHandler implements AprHandler {
  provider: JsonRpcProvider;
  yieldTokens: { [key: string]: `0x${ string }` };
  stakingContractAddress: `0x${ string }`;
  readonly group = 'TESSERA';

  constructor(network: number, rpcUrl: string, yieldTokens: {
    [key: string]: `0x${ string }`
  }, contractAddress: `0x${ string }`) {
    this.provider = new JsonRpcProvider(rpcUrl, network);
    this.yieldTokens = yieldTokens;
    this.stakingContractAddress = contractAddress;
  }

  getAprs = async () => {
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

export const tesseraApePoolAprHandler = new TesseraAprHandler(1, 'https://rpc.ankr.com/eth', tesseraYieldTokensMainnet, '0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9' /*ApeCoinStaking*/)
