-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'INVESTOR', 'SELLER', 'PARTNER');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('OPEN', 'FULL', 'CLOSED');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" INTEGER NOT NULL,
    "metaMaskId" TEXT NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "password" TEXT NOT NULL,
    "panCardNumber" VARCHAR(20) NOT NULL,
    "gstNumber" VARCHAR(20) NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "panCardLink" TEXT NOT NULL,
    "refCode" TEXT,
    "logo" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "targetAmount" INTEGER NOT NULL,
    "status" "DealStatus" NOT NULL,
    "dealAim" TEXT NOT NULL,
    "tentativeDuration" INTEGER NOT NULL,
    "profitPercent" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" INTEGER NOT NULL,
    "metaMaskId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorDeals" (
    "dealId" INTEGER NOT NULL,
    "investorId" INTEGER NOT NULL,

    CONSTRAINT "InvestorDeals_pkey" PRIMARY KEY ("dealId","investorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_id_key" ON "Seller"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_metaMaskId_key" ON "Seller"("metaMaskId");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_email_key" ON "Seller"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_panCardNumber_key" ON "Seller"("panCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_gstNumber_key" ON "Seller"("gstNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_contactNumber_key" ON "Seller"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_id_key" ON "Investor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_metaMaskId_key" ON "Investor"("metaMaskId");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_id_fkey" FOREIGN KEY ("id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_id_fkey" FOREIGN KEY ("id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorDeals" ADD CONSTRAINT "InvestorDeals_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorDeals" ADD CONSTRAINT "InvestorDeals_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
