import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStudentAttendanceDto } from '@/student-attendance/dto/create-student-attendance.dto';
import { StudentAttendanceFilterDto } from '@/student-attendance/dto/student-attendance-filter.dto';

@Injectable()
export class StudentAttendanceRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStudentAttendance(orgId: string, markedById: string, createStudentAttendanceDto: CreateStudentAttendanceDto) {
        const { studentId, date, status, periodId, remarks } = createStudentAttendanceDto;
        return this.prisma.tx.studentAttendance.create({
            data: {
                organizationId: orgId,
                studentId,
                date,
                status,
                periodId,
                remarks,
                markedById
            },
        });
    }

    async getStudentAttendanceById(id: string) {
        return this.prisma.tx.studentAttendance.findUnique({
            where: { id },
        });
    }

    async getStudentAttendanceByFilter(filter: StudentAttendanceFilterDto) {
        const { organizationId, studentId, date, status, periodId, page, limit, markedById } = filter;

        const skip = ((page || 1) - 1) * (limit || 10);
        return this.prisma.tx.studentAttendance.findMany({
            where: {
                organizationId,
                studentId,
                date,
                status,
                periodId,
                markedById
            },
            skip: skip,
            take: limit || 10,
        });

    }
    async getConflictAttendance(studentId: string, date: string, isPeriodNull: boolean, periodId?: string) {
        return this.prisma.tx.studentAttendance.findFirst({
            where: {
                studentId,
                date,
                ...(periodId
                    ? {
                        periodId: periodId,
                    }
                    : isPeriodNull
                        ? {
                            periodId: null,
                        }
                        : {}),
            },
        });
    }
}
