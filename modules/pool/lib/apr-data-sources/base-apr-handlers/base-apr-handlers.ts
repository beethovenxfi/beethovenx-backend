import { AaveAprHandler } from './sources/aave-apr-handler';
import { AnkrAprHandler } from './sources/ankr-apr-handler';
import { DefaultAprHandler } from './sources/default-apr-handler';
import { EulerAprHandler } from './sources/euler-apr-handler';
import { GearboxAprHandler } from './sources/gearbox-apr-handler';
import { IdleAprHandler } from './sources/idle-apr-handler';
import { OvixAprHandler } from './sources/ovix-apr-handler';
import { TesseraAprHandler } from './sources/tessera-apr-handler';
import { TetuAprHandler } from './sources/tetu-apr-handler';
import { TranchessAprHandler } from './sources/tranchess-apr-handler';
import { AprConfig } from '../../../../network/network-config-types';

export class BaseAprHandlers {
    private handlers: AprHandler[] = [];

    constructor(aprConfig: AprConfig, networkPrismaId: string, networkChainId: number) {
        this.handlers = this.buildAprHandlers(aprConfig, networkPrismaId, networkChainId);
    }

    buildAprHandlers(aprConfig: AprConfig, networkPrismaId: string, networkChainId: number) {
        const handlers: AprHandler[] = [];
        if (aprConfig.aave) {
            for (const config of Object.values(aprConfig.aave)) {
                const { tokens, subgraphUrl } = config;
                const aaveHandler = new AaveAprHandler({
                    tokens,
                    subgraphUrl,
                    networkPrismaId,
                });
                handlers.push(aaveHandler);
            }
        }
        if (aprConfig.ankr) {
            const { sourceUrl, tokens } = aprConfig.ankr;
            const ankrHandler = new AnkrAprHandler({
                sourceUrl,
                tokens,
                networkPrismaId,
            });
            handlers.push(ankrHandler);
        }
        if (aprConfig.euler) {
            const { subgraphUrl, tokens } = aprConfig.euler;
            const eulerHandler = new EulerAprHandler({
                subgraphUrl,
                tokens,
                networkPrismaId,
            });
            handlers.push(eulerHandler);
        }
        if (aprConfig.gearbox) {
            const { sourceUrl, tokens } = aprConfig.gearbox;
            const gearboxHandler = new GearboxAprHandler({
                sourceUrl,
                tokens,
                networkPrismaId,
            });
            handlers.push(gearboxHandler);
        }
        if (aprConfig.idle) {
            const { sourceUrl, tokens, authorizationHeader } = aprConfig.idle;
            const idleHandler = new IdleAprHandler({
                sourceUrl,
                tokens,
                authorizationHeader: 'Bearer ' + authorizationHeader,
                networkPrismaId,
            });
            handlers.push(idleHandler);
        }
        if (aprConfig.ovix) {
            const { rpcUrl, tokens } = aprConfig.ovix;
            const ovixHandler = new OvixAprHandler({
                rpcUrl,
                tokens,
                networkPrismaId,
                networkChainId,
            });
            handlers.push(ovixHandler);
        }
        if (aprConfig.tessera) {
            const { rpcUrl, tokens } = aprConfig.tessera;
            const tesseraHandler = new TesseraAprHandler({
                rpcUrl,
                tokens,
                networkPrismaId,
                networkChainId,
            });
            handlers.push(tesseraHandler);
        }
        if (aprConfig.tetu) {
            const { sourceUrl, tokens } = aprConfig.tetu;
            const tetuHandler = new TetuAprHandler({
                sourceUrl,
                tokens,
                networkPrismaId,
            });
            handlers.push(tetuHandler);
        }
        if (aprConfig.tranchess) {
            const { sourceUrl, tokens } = aprConfig.tranchess;
            const tranchessHandler = new TranchessAprHandler({
                sourceUrl,
                tokens,
                networkPrismaId,
            });
            handlers.push(tranchessHandler);
        }
        if (aprConfig.defaultHandlers) {
            for (const handlerConfig of Object.values(aprConfig.defaultHandlers)) {
                const handler = new DefaultAprHandler({ ...handlerConfig, networkPrismaId });
                handlers.push(handler);
            }
        }
        return handlers;
    }

    async fetchAprsFromAllHandlers(): Promise<TokenApr[]> {
        let aprs: { val: number; group: string; address: string }[] = [];
        for (const handler of this.handlers) {
            const fetchedResponse: { [key: string]: number } = await handler.getAprs();
            for (const [address, aprValue] of Object.entries(fetchedResponse)) {
                aprs.push({
                    val: aprValue,
                    group: handler.group,
                    address,
                });
            }
        }
        return aprs;
    }
}

export interface AprHandler {
    group: string;
    networkPrismaId: string;

    getAprs(): Promise<{ [tokenAddress: string]: number }>;
}

export type TokenApr = {
    val: number;
    address: string;
    group?: string;
};

// export const wrappedBoostedTokens = [
//     ...Object.values(wrappedAaveTokensV2Mainnet),
//     ...Object.values(wrappedAaveTokensV2Polygon),
//     ...Object.values(wrappedAaveTokensV3Mainnet),
//     ...Object.values(wrappedAaveTokensV3Polygon),
//     ...Object.values(wrappedAaveTokensV3Arbitrum),
//     ankrEthMainnet,
//     ankrEthFantom,
//     rETHMainnet,
//     USDRMainnet,
//     swETHMainnet,
//     wjAURAMainnet,
//     ...Object.values(eulerTokensMainnet),
//     ...Object.values(gearboxTokensMainnet),
//     ...Object.values(wrapped4626IdleTokensMainnet),
//     ...Object.values(ovixWrappedTokensZkEvm),
//     ...Object.values(reaperYieldTokensArbitrum),
//     ...Object.values(tesseraYieldTokensMainnet),
//     tUSDTPolygon,
//     tUSDCPolygon,
//     tDAIPolygon,
//     qETHMainnet,
//     overnightLpUsdcUsdPlusMainnet,
//     overnightUsdcUsdPlusMainnet,
//     overnightUsdPlusOptimism,
//     overnightDaiPlusOptimism,
// ];
