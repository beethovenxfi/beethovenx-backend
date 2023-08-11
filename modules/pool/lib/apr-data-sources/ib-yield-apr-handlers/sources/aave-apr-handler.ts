import axios from 'axios';
import { AprHandler } from '../ib-yield-apr-handlers';

class AaveAprHandler implements AprHandler {
    wrappedTokens: { [key: string]: string };
    aaveTokens: { [key: string]: string };
    underlyingTokens: { [key: string]: string };
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
        this.wrappedTokens = aprHandlerConfig.wrappedTokens;
        this.aaveTokens = aprHandlerConfig.aaveTokens;
        this.underlyingTokens = aprHandlerConfig.underlyingTokens;
        this.subgraphUrl = aprHandlerConfig.subgraphUrl;
        this.networkPrismaId = aprHandlerConfig.network;
    }

    async getAprs() {
        try {
            const requestQuery = {
                operationName: 'getReserves',
                query: this.query,
                variables: {
                    aTokens: Object.values(this.aaveTokens),
                    underlyingAssets: Object.values(this.underlyingTokens),
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
            const aprEntries = Object.fromEntries(
                Object.values(this.underlyingTokens)
                    //Removing undefined aprs
                    .filter(([, address]) => !!aprsByUnderlyingAddress[address])
                    //Mapping aprs by wrapped instead of underlying addresses
                    .map(([underlyingTokenName, underlyingTokenAddress]) => [
                        this.wrappedTokens['wa' + underlyingTokenName] as string,
                        aprsByUnderlyingAddress[underlyingTokenAddress],
                    ]),
            );
            return aprEntries;
        } catch (e) {
            console.error(`Failed to fetch Aave APR in subgraph ${this.subgraphUrl}:`, e);
            return {};
        }
    }
}

const wrappedAaveTokensV2Mainnet = {
    waUSDT: '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58',
    waUSDC: '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de',
    waDAI: '0x02d60b84491589974263d922d9cc7a3152618ef6',
};

const aaveTokensV2Mainnet = {
    aUSDT: '0x3ed3b47dd13ec9a98b44e6204a523e766b225811',
    aUSDC: '0xbcca60bb61934080951369a648fb03df4f96263c',
    aDAI: '0x028171bca77440897b824ca71d1c56cac55b68a3',
};

const wrappedAaveTokensV2Polygon = {
    waUSDT: '0x19c60a251e525fa88cd6f3768416a8024e98fc19',
    waUSDC: '0x221836a597948dce8f3568e044ff123108acc42a',
    waDAI: '0xee029120c72b0607344f35b17cdd90025e647b00',
};

const aaveTokensV2Polygon = {
    aUSDT: '0x60d55f02a771d515e077c9c2403a1ef324885cec',
    aUSDC: '0x1a13f4ca1d028320a707d99520abfefca3998b7f',
    aDAI: '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
};

const wrappedAaveTokensV3Mainnet = {
    waUSDT: '0xa7e0e66f38b8ad8343cff67118c1f33e827d1455',
    waUSDC: '0x57d20c946a7a3812a7225b881cdcd8431d23431c',
    waDAI: '0x098256c06ab24f5655c5506a6488781bd711c14b',
    waWETH: '0x59463bb67ddd04fe58ed291ba36c26d99a39fbc6',
};

const aaveTokensV3Mainnet = {
    aUSDT: '0x23878914efe38d27c4d67ab83ed1b93a74d4086a',
    aUSDC: '0x98c23e9d8f34fefb1b7bd6a91b7ff122f4e16f5c',
    aDAI: '0x018008bfb33d285247a21d44e50697654f754e63',
    aWETH: '0x4d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e8',
};

const wrappedAaveTokensV3Polygon = {
    waMATIC: '0x0d6135b2cfbae3b1c58368a93b855fa54fa5aae1',
    waUSDT: '0x7c76b6b3fe14831a39c0fec908da5f17180df677',
    waUSDC: '0x9719d867a500ef117cc201206b8ab51e794d3f82',
    waDAI: '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
    waWETH: '0xa5bbf0f46b9dc8a43147862ba35c8134eb45f1f5',
};

const aaveTokensV3Polygon = {
    aMATIC: '0x6d80113e533a2c0fe82eabd35f1875dcea89ea97',
    aUSDT: '0x60d55f02a771d515e077c9c2403a1ef324885cec',
    aUSDC: '0x1a13f4ca1d028320a707d99520abfefca3998b7f',
    aDAI: '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
    aWETH: '0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8',
};

const wrappedAaveTokensV3Arbitrum = {
    waUSDT: '0x3c7680dfe7f732ca0279c39ff30fe2eafdae49db',
    waUSDC: '0xe719aef17468c7e10c0c205be62c990754dff7e5',
    waDAI: '0x345a864ac644c82c2d649491c905c71f240700b2',
    waWETH: '0x18c100415988bef4354effad1188d1c22041b046',
};

const aaveTokensV3Arbitrum = {
    aUSDT: '0x6ab707aca953edaefbc4fd23ba73294241490620',
    aUSDC: '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
    aDAI: '0x82e64f49ed5ec1bc6e43dad4fc8af9bb3a2312ee',
    aWETH: '0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8',
};

const underlyingTokensMainnet = {
    USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
    WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
};

const underlyingTokensPolygon = {
    MATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    DAI: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
};

const underlyingTokensArbitrum = {
    USDT: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    USDC: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    DAI: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    WETH: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
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
    wrappedTokens: { [key: string]: string };
    aaveTokens: { [key: string]: string };
    underlyingTokens: { [key: string]: string };
    subgraphUrl: string;
    network: string;
};

const aaveV2MainnetAprHandler = new AaveAprHandler({
    wrappedTokens: wrappedAaveTokensV2Mainnet,
    aaveTokens: aaveTokensV2Mainnet,
    underlyingTokens: underlyingTokensMainnet,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
    network: 'MAINNET',
});

const aaveV2PolygonAprHandler = new AaveAprHandler({
    wrappedTokens: wrappedAaveTokensV2Polygon,
    aaveTokens: aaveTokensV2Polygon,
    underlyingTokens: underlyingTokensPolygon,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/aave-v2-matic',
    network: 'POLYGON',
});
const aaveV3MainnetAprHandler = new AaveAprHandler({
    wrappedTokens: wrappedAaveTokensV3Mainnet,
    aaveTokens: aaveTokensV3Mainnet,
    underlyingTokens: underlyingTokensMainnet,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3',
    network: 'MAINNET',
});
const aaveV3PolygonAprHandler = new AaveAprHandler({
    wrappedTokens: wrappedAaveTokensV3Polygon,
    aaveTokens: aaveTokensV3Polygon,
    underlyingTokens: underlyingTokensPolygon,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-polygon',
    network: 'POLYGON',
});
const aaveV3ArbitrumAprHandler = new AaveAprHandler({
    wrappedTokens: wrappedAaveTokensV3Arbitrum,
    aaveTokens: aaveTokensV3Arbitrum,
    underlyingTokens: underlyingTokensArbitrum,
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-arbitrum',
    network: 'ARBITRUM',
});

export const aaveHandlers = [
    aaveV2MainnetAprHandler,
    aaveV2PolygonAprHandler,
    aaveV3MainnetAprHandler,
    aaveV3PolygonAprHandler,
    aaveV3ArbitrumAprHandler,
];
