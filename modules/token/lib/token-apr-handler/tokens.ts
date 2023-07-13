import { aave, ankr, defaultFetch, gearbox, idle, overnight, ovix, reaper, tessera, tetu, tranchess } from "./sources";

export const tokens = [
  { name: 'idleDai', group: "IDLE", fetchFn: () => idle('0x0c80f31b840c6564e6c5e18f386fad96b63514ca') },
  { name: 'idleUsdc', group: "IDLE", fetchFn: () => idle('0xc3da79e0de523eef7ac1e4ca9abfe3aac9973133') },
  { name: 'idleUsdt', group: "IDLE", fetchFn: () => idle('0x544897a3b944fdeb1f94a0ed973ea31a80ae18e1') },
  { name: 'qETH', group: "TRANCHESS", fetchFn: tranchess },
  { name: 'gearbox', group: "GEARBOX", fetchFn: gearbox },
  { name: 'overnight', group: "OVERNIGHT", fetchFn: overnight },
  { name: 'aaveV2Mainnet', group: "AAVE", fetchFn: () => aave(1) },
  { name: 'aaveV2Polygon', group: "AAVE", fetchFn: () => aave(137) },
  { name: 'aaveV3Mainnet', group: "AAVE", fetchFn: () => aave(1, 'v3') },
  { name: 'aaveV3Polygon', group: "AAVE", fetchFn: () => aave(137, 'v3') },
  { name: 'aaveV3Arbitrum', group: "AAVE", fetchFn: () => aave(42161, 'v3') },
  { name: 'ankr', group: "ANKR", fetchFn: ankr },
  { name: 'reaper', group: "REAPER", fetchFn: reaper },
  { name: 'tessera', group: "TESSERA", fetchFn: tessera },
  { name: 'tetu', group: "TETU", fetchFn: tetu },
  { name: 'ovix', group: "OVIX", fetchFn: ovix },
  {
    name: 'vEth',
    fetchFn: () => defaultFetch({
      tokens: ['0x4bc3263eb5bb2ef7ad9ab6fb68be80e43b43801f'],
      url: 'https://apy.liebi.com/veth',
      path: 'veth'
    })
  },
  {
    name: 'stEth',
    fetchFn: () => defaultFetch({
      tokens: ['0x6c76971f98945ae98dd7d4dfca8711ebea946ea6', '0x5d8cff95d7a57c0bf50b30b43c7cc0d52825d4a9', '0xae7ab96520de3a18e5e111b5eaab095312d7fe84', '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0', '0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd', '0x5979d7b546e38e414f7e9822514be443a4800529'],
      url: 'https://eth-api.lido.fi/v1/protocol/steth/apr/sma',
      path: 'data.smaApr'
    })
  },
  {
    name: 'stMatic',
    fetchFn: () => defaultFetch({
      tokens: ['0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4'],
      url: 'https://polygon.lido.fi/api/stats',
      path: 'apr'
    })
  },
  {
    name: 'cbEth',
    fetchFn: () => defaultFetch({
      tokens: ['0xbe9895146f7af43049ca1c1ae358b0541ea49704'],
      url: 'https://api.exchange.coinbase.com/wrapped-assets/CBETH/',
      path: 'apy',
      scale: 10000
    })
  },
  // { name: 'rETH',    fetchFn: () => defaultFetch({ tokens: ['0xb23c20efce6e24acca0cef9b7b7aa196b84ec942', '0xae78736cd615f374d3085123a210448e74fc6393', '0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8'], url: 'https://api.rocketpool.net/api/apr', path: 'yearlyAPR' }) },
  {
    name: 'sfrxETH',
    fetchFn: () => defaultFetch({
      tokens: ['0xac3e018457b222d93114458476f3e3416abbe38f'],
      url: 'https://api.frax.finance/v2/frxeth/summary/latest',
      path: 'sfrxethApr'
    })
  },
  {
    name: 'stafi',
    fetchFn: () => defaultFetch({
      tokens: ['0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593'],
      url: 'https://drop-api.stafi.io/reth/v1/poolData',
      path: 'data.stakeApr'
    })
  },
  {
    name: 'usdr',
    fetchFn: () => defaultFetch({
      tokens: ['0xaf0d9d65fc54de245cda37af3d18cbec860a4d4b'],
      url: 'http://usdr-api.us-east-1.elasticbeanstalk.com/usdr/apy',
      path: 'usdr'
    })
  },
  {
    name: 'maticX',
    fetchFn: () => defaultFetch({
      tokens: ['0xfa68fb4628dff1028cfec22b4162fccd0d45efb6'],
      url: 'https://universe.staderlabs.com/polygon/apy',
      path: 'value'
    })
  },
  // Had to proxy this one because Binance API was blocking requests from Cloudflare, original URL: https://www.binance.com/bapi/earn/v1/public/pos/cftoken/project/rewardRateList?projectId=BETH
  // { name: 'wbETH',   fetchFn: () => defaultFetch({ tokens: ['0xa2e3356610840701bdf5611a53974510ae27e2e1'], url: 'https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-683e4669-de62-4f89-9609-2e24ba8acfa7/default/binance', path: 'data.0.rewardRate', scale: 10000 }) },
  {
    name: 'wbETH',
    fetchFn: () => defaultFetch({
      tokens: ['0xa2e3356610840701bdf5611a53974510ae27e2e1'],
      url: 'https://www.binance.com/bapi/earn/v1/public/pos/cftoken/project/rewardRateList?projectId=BETH',
      path: 'data.0.rewardRate',
      scale: 10000
    })
  },
  {
    name: 'swETH',
    fetchFn: () => defaultFetch({
      tokens: ['0xf951e335afb289353dc249e82926178eac7ded78'],
      url: 'https://v3.svc.swellnetwork.io/api/tokens/sweth/apr',
      path: '',
      scale: 100
    })
  },
  {
    name: 'wjAURA',
    fetchFn: () => defaultFetch({
      tokens: ['0x198d7387fa97a73f05b8578cdeff8f2a1f34cd1f'],
      url: 'https://data.jonesdao.io/api/v1/jones/apy-wjaura',
      path: 'wjauraApy',
      scale: 200
    })
  },
  // { name: 'euler',     fetchFn: euler },
]
