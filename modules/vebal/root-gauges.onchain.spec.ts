import { RootGaugesRepository, toPrismaNetwork } from './root-gauges.repository';
import { Chain } from '@prisma/client';

// anvil --fork-url https://eth-mainnet.alchemyapi.io/v2/7gYoDJEw6-QyVP5hd2UfZyelzDIDemGz --port 8555 --fork-block-number=17569375

// In CI we will use http://127.0.0.1:8555 to use the anvil fork;
// const httpRpc = process.env.TEST_RPC_URL || 'https://cloudflare-eth.com';
const httpRpc = 'http://127.0.0.1:8555';
console.log(`🤖 Integration tests using ${httpRpc} as rpc url`);

it('maps onchain network format into prisma chain format', async () => {
    expect(toPrismaNetwork('Mainnet')).toBe(Chain.MAINNET);
    expect(toPrismaNetwork('Optimism')).toBe(Chain.OPTIMISM);
    expect(toPrismaNetwork('veBAL')).toBe(Chain.MAINNET);
    expect(() => toPrismaNetwork('Unknown')).toThrowError('Network UNKNOWN is not supported');
});

it('fetches list of root gauge addresses', async () => {
    const service = new RootGaugesRepository();
    const addresses = await service.getRootGaugeAddresses();
    expect(addresses.length).toBe(333);
}, 10_000);

it.only('generates root gauge rows given a list of gauge addresses', async () => {
    const service = new RootGaugesRepository();

    const rootGaugeAddresses = [
        '0x79eF6103A513951a3b25743DB509E267685726B7',
        '0xfb0265841C49A6b19D70055E596b212B0dA3f606',
        '0x8F7a0F9cf545DB78BF5120D3DBea7DE9c6220c10',
    ];
    // Uncomment to test with all the root gauges
    // const rootGaugeAddresses = await service.getRootGaugeAddresses();

    const rows = await service.fetchOnchainRootGauges(rootGaugeAddresses);

    expect(rows).toMatchInlineSnapshot(`
      [
        {
          "gaugeAddress": "0x79ef6103a513951a3b25743db509e267685726b7",
          "isInSubgraph": false,
          "isKilled": false,
          "network": "MAINNET",
          "relativeWeight": 0.07037221488051114,
          "relativeWeightCap": undefined,
        },
        {
          "gaugeAddress": "0xfb0265841c49a6b19d70055e596b212b0da3f606",
          "isInSubgraph": false,
          "isKilled": true,
          "network": "OPTIMISM",
          "relativeWeight": 0,
          "relativeWeightCap": undefined,
        },
        {
          "gaugeAddress": "0x8f7a0f9cf545db78bf5120d3dbea7de9c6220c10",
          "isInSubgraph": false,
          "isKilled": false,
          "network": "ARBITRUM",
          "relativeWeight": 0,
          "relativeWeightCap": "0.02",
        },
      ]
    `);
}, 10_000);

it('Excludes Liquidity Mining Committee gauge', async () => {
    const liquidityMiningAddress = '0x7AA5475b2eA29a9F4a1B9Cf1cB72512D1B4Ab75e';
    const service = new RootGaugesRepository();
    const rows = await service.fetchOnchainRootGauges([liquidityMiningAddress]);
    expect(rows).toEqual([]);
});

it('fetches veBAL gauge as MAINNET', async () => {
    const vebalAddress = '0xE867AD0a48e8f815DC0cda2CDb275e0F163A480b';
    const service = new RootGaugesRepository();
    const rows = await service.fetchOnchainRootGauges([vebalAddress]);
    expect(rows).toEqual([
        {
            gaugeAddress: '0xe867ad0a48e8f815dc0cda2cdb275e0f163a480b',
            isInSubgraph: false,
            isKilled: true,
            network: 'MAINNET',
            relativeWeight: 0,
            relativeWeightCap: undefined,
        },
    ]);
});
