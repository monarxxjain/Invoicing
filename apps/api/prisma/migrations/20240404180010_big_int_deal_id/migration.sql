/*
  Warnings:

  - The primary key for the `Deal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `InvestorDeals` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "InvestorDeals" DROP CONSTRAINT "InvestorDeals_dealId_fkey";

-- AlterTable
ALTER TABLE "Deal" DROP CONSTRAINT "Deal_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Deal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "InvestorDeals" DROP CONSTRAINT "InvestorDeals_pkey",
ALTER COLUMN "dealId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "InvestorDeals_pkey" PRIMARY KEY ("dealId", "investorId");

-- AddForeignKey
ALTER TABLE "InvestorDeals" ADD CONSTRAINT "InvestorDeals_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
