-- CreateEnum
CREATE TYPE "CertificateFileType" AS ENUM ('PDF', 'JPG', 'PNG', 'DOC', 'DOCX');

-- AlterTable
ALTER TABLE "certificate" ADD COLUMN     "fileType" "CertificateFileType";
