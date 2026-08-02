import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStudentEnrollmentDto } from '@/student-enrollment/dto/create-student-enrollment.dto';
import { UpdateStudentEnrollmentDto } from '@/student-enrollment/dto/update-student-enrollment.dto';
import { EnrollmentStatus } from '@workspace/db/generated/prisma/cjs/enums';

@Injectable()
export class StudentEnrollmentRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStudentEnrollment(orgId: string, createStudentEnrollmentDto: CreateStudentEnrollmentDto) {
        const { studentId, classSectionId, academicYearId, rollNumber, status } = createStudentEnrollmentDto;

        return this.prisma.tx.studentEnrollment.create({
            data: {
                organizationId: orgId,
                studentId,
                classSectionId,
                academicYearId,
                rollNumber,
                status,
            },
        });
    }

    async updateStudentEnrollment(id: string, updateStudentEnrollmentDto: UpdateStudentEnrollmentDto) {
        const { studentId, classSectionId, academicYearId, rollNumber, status } = updateStudentEnrollmentDto;

        return this.prisma.tx.studentEnrollment.update({
            where: { id },
            data: {
                studentId,
                classSectionId,
                academicYearId,
                rollNumber,
                status,
            },
        });
    }

    async getStudentEnrollmentById(id: string) {
        return this.prisma.tx.studentEnrollment.findUnique({
            where: { id },
        });
    }

    async getStudentEnrollmentByStudentIdAndStatus(studentId: string, status: EnrollmentStatus) {
        return this.prisma.tx.studentEnrollment.findFirst({
            where: {
                studentId,
                status,
            },
        });
    }
}
