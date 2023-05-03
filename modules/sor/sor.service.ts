import { GqlSorGetSwapsResponse, GqlSorGetSwapsResponseNew, GqlSorSwapOptionsInput, GqlSorSwapType } from '../../schema';
import { formatFixed, parseFixed } from '@ethersproject/bignumber';
import { PrismaToken } from '@prisma/client';
import { poolService } from '../pool/pool.service';
import { oldBnum } from '../big-number/old-big-number';
import axios from 'axios';
import { FundManagement, SwapInfo, SwapTypes, SwapV2 } from '@balancer-labs/sdk';
import { replaceEthWithZeroAddress, replaceZeroAddressWithEth } from '../web3/addresses';
import { BigNumber } from 'ethers';
import { TokenAmountHumanReadable } from '../common/global-types';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import VaultAbi from '../pool/abi/Vault.json';
import { env } from '../../app/env';
import { networkContext } from '../network/network-context.service';
import { DeploymentEnv } from '../network/network-config-types';
import * as Sentry from '@sentry/node';
import _ from 'lodash';
import { Logger } from '@ethersproject/logger';
import { sorV2Service } from './sorV2/sorV2.service';

export interface GetSwapsInput {
    tokenIn: string;
    tokenOut: string;
    swapType: GqlSorSwapType;
    swapAmount: string;
}

export class SorService {
    public async getSwaps({
        tokenIn,
        tokenOut,
        swapType,
        swapAmount,
    }: GetSwapsInput): Promise<GqlSorGetSwapsResponseNew> {
        console.log(`!!!!!!! getSwaps`);
        const result = await sorV2Service.getSwaps({
            tokenIn,
            tokenOut,
            swapType,
            swapAmount,
        });
        return {
            tokenIn,
            tokenOut,
            result: result.result
        }
        
    }
}

export const sorService = new SorService();
