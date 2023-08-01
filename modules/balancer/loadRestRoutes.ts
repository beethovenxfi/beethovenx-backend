import { Express } from 'express';
import { IbTokensAprService } from "../pool/lib/apr-data-sources/ib-tokens-apr.service";
import { networkContext } from "../network/network-context.service";
import { prismaPoolWithExpandedNesting } from "../../prisma/prisma-types";
import { prisma } from "../../prisma/prisma-client";

export function loadRestRoutesBalancer(app: Express) {
    app.use('/health', (req, res) => res.sendStatus(200));
    app.use('/test', async (req, res) => {
        const pools = await prisma.prismaPool.findMany({
            ...prismaPoolWithExpandedNesting,
            where: { chain: networkContext.chain },
        });
        const ibTokensAprService = new IbTokensAprService(1);
        await ibTokensAprService.updateAprForPools(pools);

        return res.sendStatus(200)
    });

}
