/*
  Warnings:

  - The values [FG] on the enum `DealTags` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DealTags_new" AS ENUM ('RF', 'ZC');
ALTER TABLE "Deal" ALTER COLUMN "tags" TYPE "DealTags_new"[] USING ("tags"::text::"DealTags_new"[]);
ALTER TYPE "DealTags" RENAME TO "DealTags_old";
ALTER TYPE "DealTags_new" RENAME TO "DealTags";
DROP TYPE "DealTags_old";
COMMIT;
