/*
  Warnings:

  - You are about to drop the column `issuedBy` on the `certificate` table. All the data in the column will be lost.
  - Added the required column `issuedById` to the `certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certificate" DROP COLUMN "issuedBy",
ADD COLUMN     "issuedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
