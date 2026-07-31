import { Module } from '@nestjs/common';
import { StaffDocumentController } from '@/staff-document/staff-document.controller';
import { StaffDocumentService } from '@/staff-document/staff-document.service';
import { StaffDocumentRepository } from '@/staff-document/staff-document.repository';
import {PrismaModule} from '@/prisma/prisma.module';
import {StaffProfileModule} from '@/staff-profile/staff-profile.module';
import {DocumentRecordModule} from '@/document-record/document-record.module';

@Module({
  controllers: [StaffDocumentController],
  providers: [StaffDocumentService, StaffDocumentRepository],
  imports: [PrismaModule, StaffProfileModule, DocumentRecordModule]
})
export class StaffDocumentModule {}
