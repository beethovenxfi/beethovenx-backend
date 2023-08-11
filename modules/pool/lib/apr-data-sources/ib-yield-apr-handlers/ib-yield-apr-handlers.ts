import { aaveHandlers } from './sources/aave-apr-handler';
import { ankrHandlers } from './sources/ankr-apr-handler';
import { defaultHandlers } from './sources/default-apr-handler';
import { eulerHandlers } from './sources/euler-apr-handler';
import { gearboxHandlers } from './sources/gearbox-apr-handler';
import { idleAprHandlers } from './sources/idle-apr-handler';
import { overnightHandlers } from './sources/overnight-apr-handler';
import { ovixHandlers } from './sources/ovix-apr-handler';
import { reaperHandlers } from './sources/reaper-apr-handler';
import { tesseraHandlers } from './sources/tessera-apr-handler';
import { tetuHandlers } from './sources/tetu-apr-handler';

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
