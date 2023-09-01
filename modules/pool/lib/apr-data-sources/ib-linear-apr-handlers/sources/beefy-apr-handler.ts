import { BeefyAprConfig } from '../../../../../network/apr-config-types';
import { AprHandler } from '../ib-linear-apr-handlers';
import axios from 'axios';

export class BeefyAprHandler implements AprHandler {
    tokens: {
        [tokenName: string]: {
            address: string;
            vaultId: string;
        };
    };
    sourceUrl: string;
    group: string | undefined = 'BEEFY';

    constructor(aprConfig: BeefyAprConfig) {
        this.tokens = aprConfig.tokens;
        this.sourceUrl = aprConfig.sourceUrl;
    }

    async getAprs(): Promise<{ [p: string]: number }> {
        const { data: aprData } = await axios.get<VaultApr>(this.sourceUrl);
        const aprs: { [tokenAddress: string]: number } = {};
        for (const { address, vaultId } of Object.values(this.tokens)) {
            aprs[address] = aprData[vaultId].vaultApr;
        }
        return aprs;
    }
}

type VaultApr = Record<
    string,
    {
        vaultApr: number;
        compoundingsPerYear: number;
        beefyPerformanceFee: number;
        vaultApy: number;
        lpFee: number;
        tradingApr: number;
        totalApy: number;
    }
>;
