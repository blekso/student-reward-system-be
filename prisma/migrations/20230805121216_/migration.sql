-- CreateTable
CREATE TABLE "ClaimCondition" (
    "id" SERIAL NOT NULL,
    "rewardId" INTEGER NOT NULL,
    "solvedCourses" INTEGER NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ClaimCondition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClaimCondition_rewardId_key" ON "ClaimCondition"("rewardId");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimCondition_solvedCourses_gpa_key" ON "ClaimCondition"("solvedCourses", "gpa");

-- AddForeignKey
ALTER TABLE "ClaimCondition" ADD CONSTRAINT "ClaimCondition_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
