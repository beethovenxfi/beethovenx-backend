import axios from 'axios';
import { AprHandler } from '../base-apr-handlers';

export class EulerAprHandler implements AprHandler {
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
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
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
    networkPrismaId: string;
};
