import { BigNumber, utils } from 'ethers';
import { rest } from 'msw';
import { networkConfig } from '../config/network-config';

export const handlers = [
    //test containers
    rest.post('http://localhost/containers/*', async (req, res, ctx) => {
        return req.passthrough();
    }),
    rest.delete('http://localhost/containers/*', async (req, res, ctx) => {
        return req.passthrough();
    }),

    //RPC requests
    rest.post(networkConfig.rpcUrl, async (req, res, ctx) => {
        const body = await req.json();
        // initial request by ethers to detect chain
        if (body.method === 'eth_chainId') {
            return res(
                ctx.status(200),
                ctx.json({
                    id: body.id,
                    jsonrpc: body.jsonrpc,
                    result: '0x' + networkConfig.chain.id.toString(16),
                }),
            );
        }
        if (body.method === 'net_version') {
            return res(
                ctx.status(200),
                ctx.json({
                    id: body.id,
                    jsonrpc: body.jsonrpc,
                    result: networkConfig.chain.id.toString(),
                }),
            );
        }
        console.log(body);
        //read contract
        if (body.method === 'eth_call') {
            if (body.params[0].to === networkConfig.fbeets.address) {
                //assume call for total supply
                // console.log(utils.hexZeroPad('1000000000000000000', 32));
                // const result = BigNumber.from('85279049798468151971751469')._hex;
                // console.log(result);
                return res(
                    ctx.status(200),
                    ctx.json({
                        id: body.id,
                        jsonrpc: body.jsonrpc,
                        result: '0x0000000000000000000000000000000000000000000010000000000000000000',
                        // 0x000000000000000000000000000000000000000000469b55b04083053c0f8898
                    }),
                );
            }
            if (body.params[0].to === networkConfig.fbeets.poolAddress) {
                //assume call for bpt balance
                return req.passthrough();
            }
        }
        // write contract
        if (body.method === 'eth_signTransaction') {
        }
        console.log('returning default 0x0 response');
        return res(
            ctx.status(200),
            ctx.json({
                id: body.id,
                jsonrpc: body.jsonrpc,
                result: '0x00',
            }),
        );
    }),
];
