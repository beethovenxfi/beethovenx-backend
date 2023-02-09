-- CreateTable
CREATE TABLE "PrismaTokenHistoricalPrice" (
    "tokenAddress" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "coingecko" BOOLEAN,
    "oldestPrice" BOOLEAN NOT NULL,

    CONSTRAINT "PrismaTokenHistoricalPrice_pkey" PRIMARY KEY ("tokenAddress","timestamp")
);

-- AddForeignKey
ALTER TABLE "PrismaTokenHistoricalPrice" ADD CONSTRAINT "PrismaTokenHistoricalPrice_tokenAddress_fkey" FOREIGN KEY ("tokenAddress") REFERENCES "PrismaToken"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
