/*
  Warnings:

  - You are about to drop the column `reviewedBy` on the `performanceReview` table. All the data in the column will be lost.
  - Added the required column `reviewedById` to the `performanceReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "performanceReview" DROP COLUMN "reviewedBy",
ADD COLUMN     "reviewedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "performanceReview" ADD CONSTRAINT "performanceReview_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
