-- CreateTable
CREATE TABLE "PrismaTradeResult" (
    "id" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "chain" "Chain" NOT NULL,
    "tokenIn" TEXT NOT NULL,
    "tokenOut" TEXT NOT NULL,
    "swapAmount" TEXT NOT NULL,
    "swapType" TEXT NOT NULL,
    "sorV1Result" TEXT NOT NULL,
    "sorV2Result" TEXT NOT NULL,
    "isSorV1" BOOLEAN NOT NULL,

    CONSTRAINT "PrismaTradeResult_pkey" PRIMARY KEY ("id","chain")
);
