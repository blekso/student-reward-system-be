-- DropForeignKey
ALTER TABLE "UserStatistics" DROP CONSTRAINT "UserStatistics_userAai_fkey";

-- AddForeignKey
ALTER TABLE "UserStatistics" ADD CONSTRAINT "UserStatistics_userAai_fkey" FOREIGN KEY ("userAai") REFERENCES "User"("aai") ON DELETE CASCADE ON UPDATE CASCADE;
