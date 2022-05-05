import { Contract, ethers } from 'ethers';
import { env } from '../../app/env';
import { getOperaSdk } from '@dethcrypto/eth-sdk-client';

const jsonRpcProvider = new ethers.providers.JsonRpcProvider(env.RPC_URL);

export function getContractAt(address: string, abi: any): Contract {
    return new Contract(address, abi, jsonRpcProvider);
}
