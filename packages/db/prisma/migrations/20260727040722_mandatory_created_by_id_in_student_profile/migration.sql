/*
  Warnings:

  - Made the column `createdById` on table `studentProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "studentProfile" DROP CONSTRAINT "studentProfile_createdById_fkey";

-- AlterTable
ALTER TABLE "studentProfile" ALTER COLUMN "createdById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "studentProfile" ADD CONSTRAINT "studentProfile_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
