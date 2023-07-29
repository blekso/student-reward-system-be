-- CreateTable
CREATE TABLE "User" (
    "aai" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "iat" TEXT NOT NULL,
    "exp" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("aai")
);

-- CreateTable
CREATE TABLE "UserStatistics" (
    "userAai" TEXT NOT NULL,
    "solvedCourses" INTEGER NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserStatistics_pkey" PRIMARY KEY ("userAai")
);

-- AddForeignKey
ALTER TABLE "UserStatistics" ADD CONSTRAINT "UserStatistics_userAai_fkey" FOREIGN KEY ("userAai") REFERENCES "User"("aai") ON DELETE RESTRICT ON UPDATE CASCADE;
