import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import {CreateStaffDocumentRepositoryDto} from '@/staff-document/dto/create-staff-document.dto';

@Injectable()
export class StaffDocumentRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }
    async createStaffDocument(createStaffDocumentRepositoryDto: CreateStaffDocumentRepositoryDto) {
        const { organizationId, staffId, documentId } = createStaffDocumentRepositoryDto;
        return this.prisma.tx.staffDocument.create({
            data: {
                organizationId,
                staffId,
                documentId,
            },
        });
    }

    async getStaffDocumentById(id: string) {
        return this.prisma.tx.staffDocument.findUnique({
            where: { id },
        });
    }
}
