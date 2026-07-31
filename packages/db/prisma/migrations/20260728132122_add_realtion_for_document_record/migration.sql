/*
  Warnings:

  - You are about to drop the column `uploadedBy` on the `documentRecord` table. All the data in the column will be lost.
  - Added the required column `uploadedById` to the `documentRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documentRecord" DROP COLUMN "uploadedBy",
ADD COLUMN     "uploadedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "documentRecord" ADD CONSTRAINT "documentRecord_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
