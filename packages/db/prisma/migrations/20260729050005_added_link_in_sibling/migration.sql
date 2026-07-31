/*
  Warnings:

  - You are about to drop the column `confirmedBy` on the `siblingLink` table. All the data in the column will be lost.
  - Added the required column `confirmedById` to the `siblingLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "siblingLink" DROP COLUMN "confirmedBy",
ADD COLUMN     "confirmedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "siblingLink" ADD CONSTRAINT "siblingLink_confirmedById_fkey" FOREIGN KEY ("confirmedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
