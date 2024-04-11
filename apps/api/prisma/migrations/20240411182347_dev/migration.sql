/*
  Warnings:

  - Added the required column `nftAddress` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nftTokenId` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "nftAddress" TEXT NOT NULL,
ADD COLUMN     "nftTokenId" TEXT NOT NULL;
