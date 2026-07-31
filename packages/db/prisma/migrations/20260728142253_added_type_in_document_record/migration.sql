/*
  Warnings:

  - Added the required column `type` to the `documentRecord` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PDF', 'IMAGE', 'WORD', 'EXCEL', 'OTHER');

-- AlterTable
ALTER TABLE "documentRecord" ADD COLUMN     "type" "DocumentType" NOT NULL;
