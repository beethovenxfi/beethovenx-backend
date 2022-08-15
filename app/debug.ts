import axios from 'axios';

const v1Query = `query pools{
    beetsGetProtocolData{
      totalLiquidity
    }
    
    pools{
      id
      address
      name
      totalShares
      totalLiquidity
      tokensList
      poolType
    }
    
    tokenPriceGetCurrentPrices{
      address
      price
    }
  }`;

const v2Query = `
  query pools{
    protocolMetrics{
      totalLiquidity
      poolCount
    }
    poolGetPoolsCount
    poolGetPools{
      id
      address
      name
      allTokens{
        address 
      }
      dynamicData{
        totalShares
        totalLiquidity
      }
      type
    }
    
    tokenGetCurrentPrices{
      address
      price
    }
  }
  `;

const v1Url = `https://backend.beets-ftm-node.com/graphql`;
const v2Url = `https://backend-v2.beets-ftm-node.com/graphql`;
// const v2Url = `http://localhost:4000/graphql`;

async function debugMe() {
    const v1response = await axios.post(v1Url, {
        query: v1Query,
    });

    const v2response = await axios.post(v2Url, {
        query: v2Query,
    });
    // console.log(v2response.data);

    let totalDiff = 0;
    let v1TVL = 0;
    let v2TVL = 0;
    for (const v2Pool of v2response.data['data']['poolGetPools']) {
        if (v2Pool['type'] === 'LINEAR') {
            continue;
        }
        v2TVL += parseFloat(v2Pool['dynamicData']['totalLiquidity']);
        for (const v1Pool of v1response.data['data']['pools']) {
            if (v1Pool['address'].toLowerCase() === v2Pool['address'].toLowerCase()) {
                const tvlDiff = v1Pool['totalLiquidity'] - v2Pool['dynamicData']['totalLiquidity'];
                v1TVL += parseFloat(v1Pool['totalLiquidity']);
                totalDiff += tvlDiff;
                if (tvlDiff > 50000 || tvlDiff < -50000) {
                    console.log(`Pool name: ${v1Pool['name']}`);
                    console.log(`Pool id: ${v1Pool['id']}`);
                    console.log(`Pool type: ${v2Pool['type']}`);
                    console.log(`v1 TVL: ${v1Pool['totalLiquidity']}`);
                    console.log(`v2 TVL: ${v2Pool['dynamicData']['totalLiquidity']}`);
                    console.log(`TVL diff (v1 - v2): ${tvlDiff}`);
                    console.log(`---------------------`);
                }

                // console.log(`v1 vs v2 TVL: ${v1Pool['totalLiquidity'] - v2Pool['dynamicData']['totalLiquidity']}`);
            }
        }
    }
    console.log(`Total diff of all pools: ${totalDiff}`);
    console.log(`v1 TVL from metrics: ${v1response.data['data']['beetsGetProtocolData']['totalLiquidity']}`);
    console.log(`v1 TVL from pool sum: ${v1TVL}`);
    console.log(`v2 TVL from metrics: ${v2response.data['data']['protocolMetrics']['totalLiquidity']}`);
    console.log(`v2 TVL from pool sum: ${v2TVL}`);

    console.log(
        `Total TVL diff metrics - summed: ${v2response.data['data']['protocolMetrics']['totalLiquidity'] - v2TVL} `,
    );
    console.log(`Number of pools in v1: ${v1response.data['data']['pools'].length}`);
    console.log(`Number of pools in v2: ${v2response.data['data']['poolGetPools'].length}`);
}

debugMe();
