/*
  Warnings:

  - You are about to drop the column `tokenId` on the `Claim` table. All the data in the column will be lost.
  - Added the required column `txHash` to the `Claim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "tokenId",
ADD COLUMN     "txHash" TEXT NOT NULL;