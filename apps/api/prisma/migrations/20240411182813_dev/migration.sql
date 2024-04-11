/*
  Warnings:

  - You are about to drop the column `nftAddress` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `nftTokenId` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `nftAddress` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nftTokenId` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "nftAddress" TEXT NOT NULL,
ADD COLUMN     "nftTokenId" TEXT NOT NULL,
ALTER COLUMN "targetAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "minInvestmentAmount" SET DEFAULT 0,
ALTER COLUMN "minInvestmentAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "currentAmount" SET DEFAULT 0,
ALTER COLUMN "currentAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "profitPercent" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "nftAddress",
DROP COLUMN "nftTokenId";
