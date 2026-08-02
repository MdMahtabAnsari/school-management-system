/*
  Warnings:

  - You are about to drop the column `markedBy` on the `studentAttendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "studentAttendance" DROP COLUMN "markedBy",
ADD COLUMN     "markedById" TEXT;

-- AddForeignKey
ALTER TABLE "studentAttendance" ADD CONSTRAINT "studentAttendance_markedById_fkey" FOREIGN KEY ("markedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
