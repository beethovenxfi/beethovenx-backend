import {
    aaveHandlers,
    wrappedAaveTokensV2Mainnet,
    wrappedAaveTokensV2Polygon,
    wrappedAaveTokensV3Arbitrum,
    wrappedAaveTokensV3Mainnet,
    wrappedAaveTokensV3Polygon,
} from './sources/aave-apr-handler';
import { ankrEthMainnet, ankrHandlers } from './sources/ankr-apr-handler';
import { defaultHandlers, rETHMainnet, swETHMainnet, USDRMainnet, wjAURAMainnet } from './sources/default-apr-handler';
import { eulerHandlers, eulerTokensMainnet } from './sources/euler-apr-handler';
import { gearboxHandlers, gearboxTokensMainnet } from './sources/gearbox-apr-handler';
import { idleAprHandlers, wrapped4626IdleTokensMainnet } from './sources/idle-apr-handler';
import { overnightHandlers, overnightTokens } from './sources/overnight-apr-handler';
import { ovixHandlers, ovixWrappedTokensZkEvm } from './sources/ovix-apr-handler';
import { reaperHandlers, reaperYieldTokensArbitrum } from './sources/reaper-apr-handler';
import { tesseraHandlers, tesseraYieldTokensMainnet } from './sources/tessera-apr-handler';
import { tDAIPolygon, tetuHandlers, tUSDCPolygon, tUSDTPolygon } from './sources/tetu-apr-handler';
import { qETHMainnet } from './sources/tranchess-apr-handler';

const aprHandlers: AprHandler[] = [
    ...aaveHandlers,
    ...ankrHandlers,
    ...defaultHandlers,
    ...eulerHandlers,
    ...gearboxHandlers,
    ...idleAprHandlers,
    ...overnightHandlers,
    ...ovixHandlers,
    ...reaperHandlers,
    ...tesseraHandlers,
    ...tetuHandlers,
];

export class IbYieldAprHandlers {
    private handlers: AprHandler[] = [];

    constructor(networkPrismaId: string) {
        this.handlers = aprHandlers.filter((handler) => handler.networkPrismaId === networkPrismaId);
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
    readonly group: string;
    networkPrismaId: string;

    getAprs(): Promise<{ [tokenAddress: string]: number }>;
}

export type TokenApr = {
    val: number;
    address: string;
    group?: string;
};

export const wrappedTokens = [
    ...Object.values(wrappedAaveTokensV2Mainnet),
    ...Object.values(wrappedAaveTokensV2Polygon),
    ...Object.values(wrappedAaveTokensV3Mainnet),
    ...Object.values(wrappedAaveTokensV3Polygon),
    ...Object.values(wrappedAaveTokensV3Arbitrum),
    ankrEthMainnet,
    rETHMainnet,
    USDRMainnet,
    swETHMainnet,
    wjAURAMainnet,
    ...Object.values(eulerTokensMainnet),
    ...Object.values(gearboxTokensMainnet),
    ...Object.values(wrapped4626IdleTokensMainnet),
    ...Object.values(overnightTokens),
    ...Object.values(ovixWrappedTokensZkEvm),
    ...Object.values(reaperYieldTokensArbitrum),
    ...Object.values(tesseraYieldTokensMainnet),
    tUSDTPolygon,
    tUSDCPolygon,
    tDAIPolygon,
    qETHMainnet,
];
