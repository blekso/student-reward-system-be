-- CreateTable
CREATE TABLE "Claim" (
    "id" SERIAL NOT NULL,
    "userAai" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_userAai_fkey" FOREIGN KEY ("userAai") REFERENCES "User"("aai") ON DELETE CASCADE ON UPDATE CASCADE;
