import { Module } from '@nestjs/common';
import { DocumentRecordService } from '@/document-record/document-record.service';
import { DocumentRecordRepository } from '@/document-record/document-record.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DocumentRecordService, DocumentRecordRepository],
  exports: [DocumentRecordService, DocumentRecordRepository],
})
export class DocumentRecordModule {}
