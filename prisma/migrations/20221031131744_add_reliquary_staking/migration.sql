-- AlterEnum
ALTER TYPE "PrismaPoolStakingType" ADD VALUE 'RELIQUARY';

-- CreateTable
CREATE TABLE "PrismaPoolStakingReliquaryFarm" (
    "id" TEXT NOT NULL,
    "stakingId" TEXT NOT NULL,
    "beetsPerSecond" TEXT NOT NULL,

    CONSTRAINT "PrismaPoolStakingReliquaryFarm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrismaPoolStakingReliquaryFarmRewarder" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "rewardPerSecond" TEXT NOT NULL,

    CONSTRAINT "PrismaPoolStakingReliquaryFarmRewarder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrismaPoolStakingReliquaryFarm_stakingId_key" ON "PrismaPoolStakingReliquaryFarm"("stakingId");

-- AddForeignKey
ALTER TABLE "PrismaPoolStakingReliquaryFarm" ADD CONSTRAINT "PrismaPoolStakingReliquaryFarm_stakingId_fkey" FOREIGN KEY ("stakingId") REFERENCES "PrismaPoolStaking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrismaPoolStakingReliquaryFarmRewarder" ADD CONSTRAINT "PrismaPoolStakingReliquaryFarmRewarder_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "PrismaPoolStakingReliquaryFarm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
