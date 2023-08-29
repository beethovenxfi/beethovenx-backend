import { Express } from 'express';
import { prisma } from '../../prisma/prisma-client';
import { prismaPoolWithExpandedNesting } from '../../prisma/prisma-types';
import { networkContext } from '../network/network-context.service';
import { IbTokensAprService } from '../pool/lib/apr-data-sources/ib-tokens-apr.service';
import { tokenService } from '../token/token.service';
import { mainnetNetworkData } from '../network/mainnet';

export function loadRestRoutesBalancer(app: Express) {
    app.use('/health', (req, res) => res.sendStatus(200));
    app.use('/test', async (req, res) => {
        const pools = await prisma.prismaPool.findMany({
            ...prismaPoolWithExpandedNesting,
            where: { chain: networkContext.chain },
        });
        const ibTokensAprService = new IbTokensAprService(
            mainnetNetworkData.ibAprConfig,
            mainnetNetworkData.chain.prismaId,
            mainnetNetworkData.chain.id,
            tokenService,
        );
        await ibTokensAprService.updateAprForPools(pools);

        return res.sendStatus(200);
    });
}
