import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider } from '@ethersproject/providers';
import { mainnetNetworkData } from '../network/data/mainnet';
import abi from './abi/balancerTokenAdmin.json';

const { balancer: { tokenAdmin: address }, rpcUrl } = mainnetNetworkData;

export const getInflationRate = async (): Promise<BigNumber> => {
    const provider = new JsonRpcProvider(rpcUrl);
    const tokenAdmin = new Contract(address!, abi, provider);
    const inflationRate = await tokenAdmin.getInflationRate();
    return inflationRate;
}
