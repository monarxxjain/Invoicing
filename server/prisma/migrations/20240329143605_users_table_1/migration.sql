-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'INVESTOR', 'SELLER', 'PARTNER');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "panCardNumber" VARCHAR(20) NOT NULL,
    "aadhaarNumber" VARCHAR(20) NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "panCardLink" TEXT NOT NULL,
    "aadhaarCardLink" TEXT NOT NULL,
    "refCode" TEXT,
    "profile" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_panCardNumber_key" ON "Users"("panCardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Users_aadhaarNumber_key" ON "Users"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Users_mobileNumber_key" ON "Users"("mobileNumber");
