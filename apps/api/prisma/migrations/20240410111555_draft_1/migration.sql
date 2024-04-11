-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'INVESTOR', 'SELLER', 'PARTNER');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('PENDING', 'DRAFT', 'OPEN', 'FREEZED', 'CANCELLED', 'FINAL', 'CLOSED');

-- CreateEnum
CREATE TYPE "SellerStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "LiquidStatus" AS ENUM ('LIQUIDABLE', 'BREAKED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DealTags" AS ENUM ('RF', 'ZC', 'FG');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "wolleteAddr" TEXT NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "password" TEXT NOT NULL,
    "gstNumber" VARCHAR(20) NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "status" "SellerStatus" NOT NULL,
    "refCode" TEXT,
    "logo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" BIGSERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "targetAmount" INTEGER NOT NULL,
    "minInvestmentAmount" INTEGER NOT NULL DEFAULT 0,
    "currentAmount" INTEGER NOT NULL DEFAULT 0,
    "bill" TEXT NOT NULL DEFAULT '',
    "status" "DealStatus" NOT NULL,
    "tags" "DealTags"[],
    "dealAim" TEXT NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "freezingDate" TIMESTAMP(3) NOT NULL,
    "profitPercent" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "wolleteAddr" TEXT NOT NULL,
    "accessString" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorDeals" (
    "dealId" BIGINT NOT NULL,
    "investorId" INTEGER NOT NULL,
    "investmentAmount" INTEGER NOT NULL,
    "break" BOOLEAN NOT NULL DEFAULT false,
    "status" "LiquidStatus" NOT NULL DEFAULT 'LIQUIDABLE',

    CONSTRAINT "InvestorDeals_pkey" PRIMARY KEY ("dealId","investorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_wolleteAddr_key" ON "Seller"("wolleteAddr");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_email_key" ON "Seller"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_gstNumber_key" ON "Seller"("gstNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_contactNumber_key" ON "Seller"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_wolleteAddr_key" ON "Investor"("wolleteAddr");

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorDeals" ADD CONSTRAINT "InvestorDeals_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorDeals" ADD CONSTRAINT "InvestorDeals_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
