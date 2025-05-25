/*
  Warnings:

  - You are about to drop the column `completionDate` on the `Deal` table. All the data in the column will be lost.
  - You are about to drop the column `freezingDate` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Deal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "completionDate",
DROP COLUMN "freezingDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
