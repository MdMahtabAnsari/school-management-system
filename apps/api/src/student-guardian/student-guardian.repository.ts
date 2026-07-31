import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import {CreateStudentGuardianDto} from '@/student-guardian/dto/create-student-guardian.dto';

@Injectable()
export class StudentGuardianRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStudentGuardian(createStudentGuardianDto: CreateStudentGuardianDto) {
        const { studentId, guardianId, relation,isPrimaryContact,hasPortalAccess,hasLegalCustody } = createStudentGuardianDto;
        return this.prisma.tx.studentGuardian.create({
            data: {
                studentId,
                guardianId,
                relation,
                isPrimaryContact,
                hasPortalAccess,
                hasLegalCustody
            },
        });
    }

    async getStudentGuardianById(id: string) {
        return this.prisma.tx.studentGuardian.findUnique({
            where: { id },
        });
    }
}
