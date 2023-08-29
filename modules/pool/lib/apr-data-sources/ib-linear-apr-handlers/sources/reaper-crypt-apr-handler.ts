import { AprHandler } from '../ib-linear-apr-handlers';
import { getContractAt } from '../../../../../web3/contract';
import ReaperCryptStrategyAbi from './abis/ReaperCryptStrategy.json';
import axios from 'axios';
import ReaperCryptAbi from './abis/ReaperCrypt.json';
import { networkContext } from '../../../../../network/network-context.service';

const APR_PERCENT_DIVISOR = 10_000;

const sFTMxBaseApr = 0.046;
export class ReaperCryptAprHandler implements AprHandler {
    multiStrategyTokens?: { [tokenName: string]: { address: string; isSftmX?: boolean; isWstETH?: boolean } };
    singleStrategyTokens?: { [tokenName: string]: { address: string; isSftmX?: boolean; isWstETH?: boolean } };
    subgraphUrl?: string;
    averageAPRAcrossLastNHarvests?: number;
    wstETHBaseApr: number = 0;

    readonly query = `query getVaults($ids: [ID!]) {
            vaults(where:{id_in: $ids}){
              id
              apr
            }
          }`;
    readonly group = 'REAPER';
    constructor(aprConfig: ReaperCryptAprHandlerConfig) {
        this.multiStrategyTokens = aprConfig.multiStrategy?.tokens;
        this.singleStrategyTokens = aprConfig.singleStrategy?.tokens;
        this.subgraphUrl = aprConfig.multiStrategy?.subgraphUrl;
        this.averageAPRAcrossLastNHarvests = aprConfig.singleStrategy?.averageAPRAcrossLastNHarvests;
    }

    async getAprs(): Promise<{ [p: string]: number }> {
        let multiStrategyAprs = {};
        let singleStrategyAprs = {};
        this.wstETHBaseApr = await this.getWstEthBaseApr();
        if (this.multiStrategyTokens !== undefined) {
            multiStrategyAprs = await this.getMultiStrategyAprFromSubgraph(this.multiStrategyTokens);
        }
        if (this.singleStrategyTokens !== undefined) {
            singleStrategyAprs = await this.getSingleStrategyCryptApr(this.singleStrategyTokens);
        }
        return { ...multiStrategyAprs, ...singleStrategyAprs };
    }

    private async getSingleStrategyCryptApr(tokens: {
        [tokenName: string]: { address: string; isSftmX?: boolean; isWstETH?: boolean };
    }): Promise<{ [tokenAddress: string]: number }> {
        const aprs: { [tokenAddress: string]: number } = {};
        console.log(networkContext.provider);
        for (const { address, isSftmX, isWstETH } of Object.values(tokens)) {
            const tokenContract = getContractAt(address, ReaperCryptAbi);
            const strategyAddress = await tokenContract.strategy();
            const strategyContract = getContractAt(strategyAddress, ReaperCryptStrategyAbi);
            let avgAprAcrossXHarvests = 0;

            avgAprAcrossXHarvests =
                (await strategyContract.averageAPRAcrossLastNHarvests(this.averageAPRAcrossLastNHarvests)) /
                APR_PERCENT_DIVISOR;
            if (isSftmX) {
                avgAprAcrossXHarvests = avgAprAcrossXHarvests * (1 + sFTMxBaseApr);
            }
            if (isWstETH) {
                avgAprAcrossXHarvests = avgAprAcrossXHarvests * (1 + this.wstETHBaseApr);
            }
            aprs[address] = avgAprAcrossXHarvests;
        }

        return aprs;
    }

    private async getMultiStrategyAprFromSubgraph(tokens: {
        [tokenName: string]: { address: string; isSftmX?: boolean; isWstETH?: boolean };
    }): Promise<{ [tokenAddress: string]: number }> {
        const requestQuery = {
            operationName: 'getVaults',
            query: this.query,
            variables: {
                ids: Object.values(tokens).map(({ address }) => address),
            },
        };
        const {
            data: { data },
        }: { data: { data: MultiStratResponse } } = await axios({
            method: 'post',
            url: this.subgraphUrl,
            data: JSON.stringify(requestQuery),
        });
        return data.vaults.reduce((acc, { id, apr }) => {
            console.log(id);
            const token = Object.values(tokens).find((token) => token.address.toLowerCase() === id.toLowerCase());
            if (!token) {
                return acc;
            }
            let tokenApr = parseFloat(apr) / APR_PERCENT_DIVISOR;
            if (token.isSftmX) {
                tokenApr = tokenApr * (1 + sFTMxBaseApr);
            }
            if (token.isWstETH) {
                tokenApr = tokenApr * (1 + this.wstETHBaseApr);
            }
            return {
                ...acc,
                [id]: tokenApr,
            };
        }, {});
    }

    private async getWstEthBaseApr(): Promise<number> {
        const { data } = await axios.get<{
            data: { aprs: [{ timeUnix: number; apr: number }]; smaApr: number };
        }>('https://eth-api.lido.fi/v1/protocol/steth/apr/sma');
        return data.data.smaApr / 100;
    }
}
type MultiStratResponse = {
    vaults: {
        id: string;
        apr: string;
    }[];
};
interface ReaperCryptAprHandlerConfig {
    networkChainId: number;
    multiStrategy?: {
        subgraphUrl: string;
        tokens: {
            [tokenName: string]: {
                address: string;
                isSftmX?: boolean;
                isWstETH?: boolean;
            };
        };
    };
    singleStrategy?: {
        averageAPRAcrossLastNHarvests: number;
        tokens: {
            [tokenName: string]: {
                address: string;
                isSftmX?: boolean;
                isWstETH?: boolean;
            };
        };
    };
}
