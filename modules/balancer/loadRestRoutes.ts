import { Express } from 'express';
import { IbTokensAprService } from "../pool/lib/apr-data-sources/ib-tokens-apr.service";
import { networkContext } from "../network/network-context.service";
import { prismaPoolWithExpandedNesting } from "../../prisma/prisma-types";
import { prisma } from "../../prisma/prisma-client";

export function loadRestRoutesBalancer(app: Express) {
    app.use('/health', (req, res) => res.sendStatus(200));
}
