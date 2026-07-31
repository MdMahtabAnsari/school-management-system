import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStudentDocumentRepositoryDto } from '@/student-document/dto/create-student-document.dto';

@Injectable()
export class StudentDocumentRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStudentDocument(createStudentDocumentRepositoryDto: CreateStudentDocumentRepositoryDto) {
        const { organizationId, studentId, documentId } = createStudentDocumentRepositoryDto;

        return this.prisma.tx.studentDocument.create({
            data: {
                organizationId,
                studentId,
                documentId,
            },
        });
    }

    getStudentDocumentsById(id: string) {
        return this.prisma.tx.studentDocument.findUnique({
            where: {
                id,
            },
            include: {
                document: true,
            },
        });
    }

}
