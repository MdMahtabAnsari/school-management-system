/*
  Warnings:

  - You are about to drop the column `transferredBy` on the `sectionTransferLog` table. All the data in the column will be lost.
  - Added the required column `transferredById` to the `sectionTransferLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sectionTransferLog" DROP COLUMN "transferredBy",
ADD COLUMN     "transferredById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sectionTransferLog" ADD CONSTRAINT "sectionTransferLog_transferredById_fkey" FOREIGN KEY ("transferredById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
