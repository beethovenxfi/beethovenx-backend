export interface IbAprConfig {
    aave?: AaveAprConfig;
    ankr?: AnkrAprConfig;
    beefy?: BeefyAprConfig;
    euler?: EulerAprConfig;
    gearbox?: GearBoxAprConfig;
    idle?: IdleAprConfig;
    ovix?: OvixAprConfig;
    reaper?: ReaperAprConfig;
    tessera?: TesseraAprConfig;
    tetu?: TetuAprConfig;
    tranchess?: TranchessAprConfig;
    yearn?: YearnAprConfig;
    defaultHandlers?: DefaultHandlerAprConfig;
    fixed?: FixedAprConfig;
}

export interface AaveAprConfig {
    [version: string]: {
        subgraphUrl: string;
        tokens: {
            [underlyingAssetName: string]: {
                underlyingAssetAddress: string;
                aTokenAddress: string;
                wrappedTokens: {
                    [wrappedTokenName: string]: string;
                };
            };
        };
    };
}

export interface AnkrAprConfig {
    sourceUrl: string;
    tokens: {
        [underlyingAssetName: string]: {
            address: string;
            serviceName: string;
        };
    };
}

export interface BeefyAprConfig {
    sourceUrl: string;
    tokens: {
        [tokenName: string]: {
            address: string;
            // To get the vaultId, get the vault address from the token contract(token.vault()),
            // and search for the vault address in the link: https://api.beefy.finance/vaults
            vaultId: string;
        };
    };
}

export interface EulerAprConfig {
    subgraphUrl: string;
    tokens: {
        [tokenName: string]: string;
    };
}

export interface GearBoxAprConfig {
    sourceUrl: string;
    tokens: {
        [tokenName: string]: string;
    };
}

export interface IdleAprConfig {
    sourceUrl: string;
    authorizationHeader: string;
    tokens: {
        [tokenName: string]: {
            address: string;
            wrapped4626Address: string;
        };
    };
}

export interface OvixAprConfig {
    rpcUrl: string;
    tokens: {
        [tokenName: string]: {
            yieldAddress: string;
            wrappedAddress: string;
        };
    };
}

export interface ReaperAprConfig {
    subgraphSource?: {
        subgraphUrl: string;
        tokens: {
            [tokenName: string]: {
                address: string;
                isSftmX?: boolean;
                isWstETH?: boolean;
            };
        };
    };
    onchainSource?: {
        averageAPRAcrossLastNHarvests: number;
        tokens: {
            [tokenName: string]: {
                address: string;
                isSftmX?: boolean;
                isWstETH?: boolean;
            };
        };
    };
}

export interface TesseraAprConfig {
    rpcUrl: string;
    tokens: {
        [tokenName: string]: {
            tesseraPoolAddress: string;
            tokenAddress: string;
        };
    };
}

export interface TetuAprConfig {
    sourceUrl: string;
    tokens: {
        [tokenName: string]: string;
    };
}

export interface TranchessAprConfig {
    sourceUrl: string;
    tokens: {
        [tokenName: string]: {
            address: string;
            underlyingAssetName: string;
        };
    };
}

export interface YearnAprConfig {
    sourceUrl: string;
}

export interface DefaultHandlerAprConfig {
    [tokenName: string]: {
        sourceUrl: string;
        tokens: {
            [tokenName: string]: string;
        };
        path?: string;
        scale?: number;
        group?: string;
    };
}

export interface FixedAprConfig {
    [tokenName: string]: {
        address: string;
        value: number;
        group?: string;
    };
}
