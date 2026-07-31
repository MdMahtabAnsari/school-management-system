/*
  Warnings:

  - Added the required column `role` to the `staffProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staffProfile" ADD COLUMN     "role" "SchoolRole" NOT NULL;
