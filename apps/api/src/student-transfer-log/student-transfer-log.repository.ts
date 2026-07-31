import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStudentTransferLogDto } from '@/student-transfer-log/dto/create-student-transfer-log.dto';
import { UpdateStudentTransferLogDto } from '@/student-transfer-log/dto/update-student-transfer-log.dto';

@Injectable()
export class StudentTransferLogRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStudentTransferLog(transferredById: string, createStudentTransferLogDto: CreateStudentTransferLogDto) {
        const { enrollmentId, fromClassSectionId, toClassSectionId, fromRollNumber, toRollNumber, reason } = createStudentTransferLogDto;
        return this.prisma.tx.sectionTransferLog.create({
            data: {
                enrollmentId,
                fromClassSectionId,
                toClassSectionId,
                fromRollNumber,
                toRollNumber,
                reason,
                 transferredById,
            },
        });
    }

    async updateStudentTransferLog(id: string, updateStudentTransferLogDto: UpdateStudentTransferLogDto) {
        const { enrollmentId, fromClassSectionId, toClassSectionId, fromRollNumber, toRollNumber, reason } = updateStudentTransferLogDto;
        return this.prisma.tx.sectionTransferLog.update({
            where: { id },
            data: {
                enrollmentId,
                fromClassSectionId,
                toClassSectionId,
                fromRollNumber,
                toRollNumber,
                reason,
            },
        });
    }

    async getStudentTransferLogById(id: string) {
        return this.prisma.tx.sectionTransferLog.findUnique({
            where: { id },
        });
    }
}
