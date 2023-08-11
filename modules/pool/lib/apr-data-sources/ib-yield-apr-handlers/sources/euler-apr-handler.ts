import axios from 'axios';
import { AprHandler } from '../ib-yield-apr-handlers';

class EulerAprHandler implements AprHandler {
    tokens: { [key: string]: string };
    subgraphUrl: string;
    networkPrismaId: string;
    readonly group = 'EULER';

    readonly query = `
  query getAssetsAPY($eTokenAddress_in: [String!]) {
    assets(
      where: {
        eTokenAddress_in: $eTokenAddress_in
      }
    ) {
      eTokenAddress
      supplyAPY
    }
  }
`;

    constructor(aprHandlerConfig: EulerAprHandlerConfig) {
        this.tokens = aprHandlerConfig.tokens;
        this.subgraphUrl = aprHandlerConfig.subgraphUrl;
        this.networkPrismaId = aprHandlerConfig.network;
    }

    async getAprs() {
        const requestQuery = {
            operationName: 'getAssetsAPY',
            query: this.query,
            variables: {
                eTokenAddress_in: Object.values(this.tokens),
            },
        };

        const { data } = await axios({
            url: this.subgraphUrl,
            method: 'POST',
            data: JSON.stringify(requestQuery),
        });

        const {
            data: { assets },
        } = data as EulerResponse;

        const aprEntries = assets.map(({ eTokenAddress, supplyAPY }) => [
            eTokenAddress,
            // supplyAPY is 1e27 and apr is in bps (1e4), so all we need is to format to 1e23
            Number(supplyAPY.slice(0, 27)) / 1e27,
        ]);

        return Object.fromEntries(aprEntries);
    }
}

const eulerTokensMainnet = {
    eUSDC: '0xeb91861f8a4e1c12333f42dce8fb0ecdc28da716',
    eDAI: '0xe025e3ca2be02316033184551d4d3aa22024d9dc',
    eUSDT: '0x4d19f33948b99800b6113ff3e83bec9b537c85d2',
    eFRAX: '0x5484451a88a35cd0878a1be177435ca8a0e4054e',
};

interface EulerResponse {
    data: {
        assets: [
            {
                eTokenAddress: string;
                supplyAPY: string;
            },
        ];
    };
}

type EulerAprHandlerConfig = {
    tokens: { [key: string]: string };
    subgraphUrl: string;
    network: string;
};

const eulerMainnetAprHandler = new EulerAprHandler({
    tokens: eulerTokensMainnet,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/euler-xyz/euler-mainnet',
    network: 'MAINNET',
});

export const eulerHandlers = [eulerMainnetAprHandler];
