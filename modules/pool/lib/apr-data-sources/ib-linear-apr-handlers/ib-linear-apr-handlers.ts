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
import { YearnAprHandler } from './sources/yearn-apr-handler';
import { ReaperCryptAprHandler } from './sources/reaper-crypt-apr-handler';
import { BeefyAprHandler } from './sources/beefy-apr-handler';
import { IbAprConfig } from '../../../../network/apr-config-types';

export class IbLinearAprHandlers {
    private handlers: AprHandler[] = [];
    //List of addresses of wrappedBoostedTokens, used to check what is LINEAR_BOOSTED APR and what is IB_YIELD APR
    wrappedBoostedTokens: string[] = [];
    fixedAprTokens?: { [tokenName: string]: { address: string; value: number; group?: string } };

    constructor(aprConfig: IbAprConfig) {
        this.handlers = this.buildAprHandlers(aprConfig);
        this.wrappedBoostedTokens = this.buildWrappedBoostedTokens(aprConfig);
        this.fixedAprTokens = aprConfig.fixed;
    }

    buildAprHandlers(aprConfig: IbAprConfig) {
        const handlers: AprHandler[] = [];
        if (aprConfig.aave) {
            for (const config of Object.values(aprConfig.aave)) {
                const aaveHandler = new AaveAprHandler(config);
                handlers.push(aaveHandler);
            }
        }
        if (aprConfig.ankr) {
            const ankrHandler = new AnkrAprHandler(aprConfig.ankr);
            handlers.push(ankrHandler);
        }
        if (aprConfig.beefy) {
            const beefyHandler = new BeefyAprHandler(aprConfig.beefy);
            handlers.push(beefyHandler);
        }
        if (aprConfig.euler) {
            const eulerHandler = new EulerAprHandler(aprConfig.euler);
            handlers.push(eulerHandler);
        }
        if (aprConfig.gearbox) {
            const gearboxHandler = new GearboxAprHandler(aprConfig.gearbox);
            handlers.push(gearboxHandler);
        }
        if (aprConfig.idle) {
            const idleHandler = new IdleAprHandler(aprConfig.idle);
            handlers.push(idleHandler);
        }
        if (aprConfig.ovix) {
            const ovixHandler = new OvixAprHandler({
                ...aprConfig.ovix,
            });
            handlers.push(ovixHandler);
        }
        if (aprConfig.reaper) {
            const reaperCryptHandler = new ReaperCryptAprHandler({ ...aprConfig.reaper });
            handlers.push(reaperCryptHandler);
        }
        if (aprConfig.tessera) {
            const tesseraHandler = new TesseraAprHandler({
                ...aprConfig.tessera,
            });
            handlers.push(tesseraHandler);
        }
        if (aprConfig.tetu) {
            const tetuHandler = new TetuAprHandler(aprConfig.tetu);
            handlers.push(tetuHandler);
        }
        if (aprConfig.tranchess) {
            const tranchessHandler = new TranchessAprHandler(aprConfig.tranchess);
            handlers.push(tranchessHandler);
        }
        if (aprConfig.yearn) {
            const yearnHandler = new YearnAprHandler(aprConfig.yearn);
            handlers.push(yearnHandler);
        }
        if (aprConfig.defaultHandlers) {
            for (const handlerConfig of Object.values(aprConfig.defaultHandlers)) {
                const handler = new DefaultAprHandler(handlerConfig);
                handlers.push(handler);
            }
        }
        return handlers;
    }

    buildWrappedBoostedTokens(aprConfig: IbAprConfig): string[] {
        return [
            ...Object.values(aprConfig?.aave?.v2?.tokens?.USDC?.wrappedTokens || {}),
            ...Object.values(aprConfig?.aave?.v3?.tokens?.USDC?.wrappedTokens || {}),
            ...Object.values(aprConfig?.aave?.v2?.tokens?.USDT?.wrappedTokens || {}),
            ...Object.values(aprConfig?.aave?.v3?.tokens?.USDT?.wrappedTokens || {}),
            ...Object.values(aprConfig?.aave?.v2?.tokens?.DAI?.wrappedTokens || {}),
            ...Object.values(aprConfig?.aave?.v3?.tokens?.DAI?.wrappedTokens || {}),
            ...Object.values(aprConfig?.aave?.v3?.tokens?.wETH?.wrappedTokens || {}),
            ...Object.values(aprConfig?.aave?.v3?.tokens?.wMATIC?.wrappedTokens || {}),
            ...Object.values(aprConfig?.ankr?.tokens || {}).map(({ address }) => address),
            ...Object.values(aprConfig?.euler?.tokens || {}),
            ...Object.values(aprConfig?.gearbox?.tokens || {}),
            ...Object.values(aprConfig?.idle?.tokens || {}).map(({ wrapped4626Address }) => wrapped4626Address),
            ...Object.values(aprConfig?.ovix?.tokens || {}).map(({ wrappedAddress }) => wrappedAddress),
            ...Object.values(aprConfig?.tessera?.tokens || {}).map(({ tokenAddress }) => tokenAddress),
            ...Object.values(aprConfig?.tranchess?.tokens || {}).map(({ address }) => address),
            ...Object.values(aprConfig?.tetu?.tokens || {}),
            ...Object.values(
                Object.entries(aprConfig?.defaultHandlers || {})
                    //Filtering out handlers that are not LINEAR_BOOSTED
                    .filter(([key, _]) => ['rETH', 'USDR', 'swETH', 'wjAURA', 'qETH', 'overnight'].includes(key))
                    .reduce((acc, [_, value]) => ({ ...acc, ...value.tokens }), {}) as { [p: string]: string },
            ),
        ];
    }

    async fetchAprsFromAllHandlers(): Promise<TokenApr[]> {
        let aprs: TokenApr[] = [];
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
        if (this.fixedAprTokens) {
            for (const { address, value, group } of Object.values(this.fixedAprTokens)) {
                aprs.push({
                    val: value,
                    group,
                    address,
                });
            }
        }
        return aprs;
    }
}

export interface AprHandler {
    group: string | undefined;
    getAprs(): Promise<{ [tokenAddress: string]: number }>;
}

export type TokenApr = {
    val: number;
    address: string;
    group?: string;
};
