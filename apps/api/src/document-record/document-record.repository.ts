import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateDocumentRecordDto } from '@/document-record/dto/create-document-record.dto';

@Injectable()
export class DocumentRecordRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createDocumentRecord( createDocumentRecordDto: CreateDocumentRecordDto) {
        const { organizationId, category, type, name, fileUrl, uploadedById } = createDocumentRecordDto;

        return this.prisma.tx.documentRecord.create({
            data: {
                organizationId,
                category,
                type,
                name,
                fileUrl,
                uploadedById,
            },
        });
    }
}
