-- CreateTable
CREATE TABLE "PrismaPoolGyroDynamicData" (
    "id" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "chain" "Chain" NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tokenRates" TEXT[],

    CONSTRAINT "PrismaPoolGyroDynamicData_pkey" PRIMARY KEY ("id","chain")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrismaPoolGyroDynamicData_poolId_chain_key" ON "PrismaPoolGyroDynamicData"("poolId", "chain");

-- AddForeignKey
ALTER TABLE "PrismaPoolGyroDynamicData" ADD CONSTRAINT "PrismaPoolGyroDynamicData_poolId_chain_fkey" FOREIGN KEY ("poolId", "chain") REFERENCES "PrismaPool"("id", "chain") ON DELETE RESTRICT ON UPDATE CASCADE;
