import { rest } from 'msw';
import { networkConfig } from '../modules/config/network-config';

export const handlers = [
    rest.post(networkConfig.rpcUrl, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    id: 'e6f36a',
                },
            }),
        );
    }),
    rest.get(networkConfig.rpcUrl, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    id: 'e6f36a',
                },
            }),
        );
    }),
];
