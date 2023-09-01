import axios from 'axios';

import { AprHandler } from '../ib-linear-apr-handlers';

export class DefaultAprHandler implements AprHandler {
    tokens: {
        [tokenName: string]: string;
    };
    url: string;
    path: string;
    scale: number;
    group: string | undefined = undefined;

    constructor(aprHandlerConfig: {
        sourceUrl: string;
        tokens: {
            [tokenName: string]: string;
        };
        path?: string;
        scale?: number;
        group?: string;
    }) {
        this.tokens = aprHandlerConfig.tokens;
        this.url = aprHandlerConfig.sourceUrl;
        this.path = aprHandlerConfig.path ?? '';
        this.scale = aprHandlerConfig.scale ?? 100;
        this.group = aprHandlerConfig.group;
    }

    async getAprs() {
        try {
            const { data } = await axios.get(this.url, { headers: { 'User-Agent': 'cf' } });
            const value = this.path === '' ? data : this.getValueFromPath(data, this.path);
            const scaledValue = parseFloat(value) / this.scale;

            return Object.values(this.tokens).reduce((acc, token) => {
                acc[token] = scaledValue;
                return acc;
            }, {} as { [key: string]: number });
        } catch (error) {
            console.error(`Failed to fetch APRs in url ${this.url}:`, error);
            return {};
        }
    }

    getValueFromPath(obj: any, path: string) {
        if (path === '') {
            return obj;
        }
        const parts = path.split('.');
        let value = obj;
        for (const part of parts) {
            value = value[part];
        }
        return value;
    }
}
