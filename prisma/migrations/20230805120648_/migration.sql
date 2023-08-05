/*
  Warnings:

  - You are about to drop the column `contractAddress` on the `Claim` table. All the data in the column will be lost.
  - Added the required column `rewardId` to the `Claim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "contractAddress",
ADD COLUMN     "rewardId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;
