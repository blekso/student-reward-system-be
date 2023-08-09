/*
  Warnings:

  - A unique constraint covering the columns `[userAai,rewardId]` on the table `Claim` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "shortDescription" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Claim_userAai_rewardId_key" ON "Claim"("userAai", "rewardId");
