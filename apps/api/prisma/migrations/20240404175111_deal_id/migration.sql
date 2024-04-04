/*
  Warnings:

  - A unique constraint covering the columns `[dealSecondId]` on the table `Deal` will be added. If there are existing duplicate values, this will fail.
  - The required column `dealSecondId` was added to the `Deal` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "dealSecondId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Deal_dealSecondId_key" ON "Deal"("dealSecondId");
