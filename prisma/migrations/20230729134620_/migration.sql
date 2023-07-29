/*
  Warnings:

  - Changed the type of `iat` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `exp` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
DROP COLUMN "iat",
ADD COLUMN     "iat" INTEGER NOT NULL,
DROP COLUMN "exp",
ADD COLUMN     "exp" INTEGER NOT NULL;
