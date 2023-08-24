import axios from 'axios';
import { AprHandler } from '../base-apr-handlers';

export class AaveAprHandler implements AprHandler {
    tokens: {
        [assetName: string]: {
            underlyingAssetAddress: string;
            aTokenAddress: string;
            wrappedTokens: {
                [tokenName: string]: string;
            };
        };
    };
    subgraphUrl: string;
    networkPrismaId: string;

    readonly group = 'AAVE';

    readonly query = `query getReserves($aTokens: [String!], $underlyingAssets: [Bytes!]) {
    reserves(
      where: {
        aToken_in: $aTokens
        underlyingAsset_in: $underlyingAssets
        isActive: true
      }
    ) {
      id
      underlyingAsset
      liquidityRate
    }
  }`;

    constructor(aprHandlerConfig: AaveAprHandlerConfig) {
        this.tokens = aprHandlerConfig.tokens;
        this.subgraphUrl = aprHandlerConfig.subgraphUrl;
        this.networkPrismaId = aprHandlerConfig.networkPrismaId;
    }

    async getAprs() {
        try {
            const requestQuery = {
                operationName: 'getReserves',
                query: this.query,
                variables: {
                    aTokens: Object.values(this.tokens).map(({ aTokenAddress }) => aTokenAddress),
                    underlyingAssets: Object.values(this.tokens).map(
                        ({ underlyingAssetAddress }) => underlyingAssetAddress,
                    ),
                },
            };
            const { data } = await axios({
                url: this.subgraphUrl,
                method: 'post',
                data: requestQuery,
                headers: { 'Content-Type': 'application/json' },
            });
            const {
                data: { reserves },
            } = data as ReserveResponse;

            const aprsByUnderlyingAddress = Object.fromEntries(
                reserves.map((r) => [
                    r.underlyingAsset,
                    // Converting from aave ray number (27 digits) to float
                    Number(r.liquidityRate.slice(0, 27)) / 1e27,
                ]),
            );
            const aprEntries = Object.values(this.tokens)
                .map(({ wrappedTokens, underlyingAssetAddress }) => {
                    const apr = aprsByUnderlyingAddress[underlyingAssetAddress];
                    return Object.values(wrappedTokens).map((wrappedTokenAddress) => ({ [wrappedTokenAddress]: apr }));
                })
                .flat()
                .reduce((acc, curr) => ({ ...acc, ...curr }), {});
            return aprEntries;
        } catch (e) {
            console.error(`Failed to fetch Aave APR in subgraph ${this.subgraphUrl}:`, e);
            return {};
        }
    }
}

export const wrappedAaveTokensV2Mainnet = {
    waUSDT: '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58',
    waUSDC: '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de',
    waDAI: '0x02d60b84491589974263d922d9cc7a3152618ef6',
};

export const wrappedAaveTokensV2Polygon = {
    waUSDT: '0x19c60a251e525fa88cd6f3768416a8024e98fc19',
    waUSDC: '0x221836a597948dce8f3568e044ff123108acc42a',
    waDAI: '0xee029120c72b0607344f35b17cdd90025e647b00',
};

export const wrappedAaveTokensV3Mainnet = {
    waUSDT: '0xa7e0e66f38b8ad8343cff67118c1f33e827d1455',
    waUSDC: '0x57d20c946a7a3812a7225b881cdcd8431d23431c',
    waDAI: '0x098256c06ab24f5655c5506a6488781bd711c14b',
    waWETH: '0x59463bb67ddd04fe58ed291ba36c26d99a39fbc6',
};

export const wrappedAaveTokensV3Polygon = {
    waMATIC: '0x0d6135b2cfbae3b1c58368a93b855fa54fa5aae1',
    waUSDT: '0x7c76b6b3fe14831a39c0fec908da5f17180df677',
    waUSDC: '0x9719d867a500ef117cc201206b8ab51e794d3f82',
    waDAI: '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
    waWETH: '0xa5bbf0f46b9dc8a43147862ba35c8134eb45f1f5',
};

export const wrappedAaveTokensV3Arbitrum = {
    waUSDT: '0x3c7680dfe7f732ca0279c39ff30fe2eafdae49db',
    waUSDC: '0xe719aef17468c7e10c0c205be62c990754dff7e5',
    waDAI: '0x345a864ac644c82c2d649491c905c71f240700b2',
    waWETH: '0x18c100415988bef4354effad1188d1c22041b046',
};

interface ReserveResponse {
    data: {
        reserves: [
            {
                underlyingAsset: string;
                liquidityRate: string;
            },
        ];
    };
}

type AaveAprHandlerConfig = {
    tokens: {};
    subgraphUrl: string;
    networkPrismaId: string;
};
