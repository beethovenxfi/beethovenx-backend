-- CreateTable
CREATE TABLE "PrismaTokenHistoricalPrice" (
    "tokenAddress" TEXT NOT NULL,
    "chain" "Chain" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "coingecko" BOOLEAN,

    CONSTRAINT "PrismaTokenHistoricalPrice_pkey" PRIMARY KEY ("tokenAddress","timestamp","chain")
);

-- AddForeignKey
ALTER TABLE "PrismaTokenHistoricalPrice" ADD CONSTRAINT "PrismaTokenHistoricalPrice_tokenAddress_chain_fkey" FOREIGN KEY ("tokenAddress", "chain") REFERENCES "PrismaToken"("address", "chain") ON DELETE RESTRICT ON UPDATE CASCADE;
