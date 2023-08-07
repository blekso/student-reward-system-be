-- DropForeignKey
ALTER TABLE "ClaimCondition" DROP CONSTRAINT "ClaimCondition_rewardId_fkey";

-- AddForeignKey
ALTER TABLE "ClaimCondition" ADD CONSTRAINT "ClaimCondition_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE;
