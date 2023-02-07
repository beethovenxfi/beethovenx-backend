/*
  Warnings:

  - The primary key for the `PrismaReliquaryFarmSnapshot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PrismaReliquaryFarmSnapshot` table. All the data in the column will be lost.
  - The primary key for the `PrismaReliquaryLevelSnapshot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `farmSnapshotId` on the `PrismaReliquaryLevelSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `PrismaReliquaryLevelSnapshot` table. All the data in the column will be lost.
  - The primary key for the `PrismaReliquaryTokenBalanceSnapshot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `farmSnapshotId` on the `PrismaReliquaryTokenBalanceSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `PrismaReliquaryTokenBalanceSnapshot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrismaReliquaryLevelSnapshot" DROP CONSTRAINT "PrismaReliquaryLevelSnapshot_farmSnapshotId_fkey";

-- DropForeignKey
ALTER TABLE "PrismaReliquaryTokenBalanceSnapshot" DROP CONSTRAINT "PrismaReliquaryTokenBalanceSnapshot_farmSnapshotId_fkey";

-- AlterTable
ALTER TABLE "PrismaReliquaryFarmSnapshot" DROP CONSTRAINT "PrismaReliquaryFarmSnapshot_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PrismaReliquaryFarmSnapshot_pkey" PRIMARY KEY ("farmId", "timestamp");

-- AlterTable
ALTER TABLE "PrismaReliquaryLevelSnapshot" DROP CONSTRAINT "PrismaReliquaryLevelSnapshot_pkey",
DROP COLUMN "farmSnapshotId",
DROP COLUMN "id",
ADD COLUMN     "farmId" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "timestamp" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "PrismaReliquaryLevelSnapshot_pkey" PRIMARY KEY ("farmId", "timestamp", "level");

-- AlterTable
ALTER TABLE "PrismaReliquaryTokenBalanceSnapshot" DROP CONSTRAINT "PrismaReliquaryTokenBalanceSnapshot_pkey",
DROP COLUMN "farmSnapshotId",
DROP COLUMN "id",
ADD COLUMN     "farmId" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "timestamp" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "PrismaReliquaryTokenBalanceSnapshot_pkey" PRIMARY KEY ("farmId", "timestamp", "address");

-- AddForeignKey
ALTER TABLE "PrismaReliquaryLevelSnapshot" ADD CONSTRAINT "PrismaReliquaryLevelSnapshot_farmId_timestamp_fkey" FOREIGN KEY ("farmId", "timestamp") REFERENCES "PrismaReliquaryFarmSnapshot"("farmId", "timestamp") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrismaReliquaryTokenBalanceSnapshot" ADD CONSTRAINT "PrismaReliquaryTokenBalanceSnapshot_farmId_timestamp_fkey" FOREIGN KEY ("farmId", "timestamp") REFERENCES "PrismaReliquaryFarmSnapshot"("farmId", "timestamp") ON DELETE RESTRICT ON UPDATE CASCADE;
