/*
  Warnings:

  - You are about to drop the column `ovlasti` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ovlasti",
ADD COLUMN     "authority" TEXT;
