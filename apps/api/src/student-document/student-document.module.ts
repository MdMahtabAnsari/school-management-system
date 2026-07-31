import { Module } from '@nestjs/common';
import { StudentDocumentController } from '@/student-document/student-document.controller';
import { StudentDocumentService } from '@/student-document/student-document.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { StudentDocumentRepository } from '@/student-document/student-document.repository';
import { StudentProfileModule } from '@/student-profile/student-profile.module';
import { DocumentRecordModule } from '@/document-record/document-record.module';

@Module({
  controllers: [StudentDocumentController],
  providers: [StudentDocumentService, StudentDocumentRepository],
  imports: [PrismaModule, StudentProfileModule, DocumentRecordModule]
})
export class StudentDocumentModule {}
