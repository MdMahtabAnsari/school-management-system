import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAcademicYearDto } from '@/academic-year/dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from '@/academic-year/dto/update-academic-year.dto';

@Injectable()
export class AcademicYearRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async getAcademicYearById(id: string) {
        return this.prisma.tx.academicYear.findUnique({
            where: { id },
        });
    }
    async createAcademicYear(orgId: string, createAcademicYearDto: CreateAcademicYearDto) {
        const { name, startDate, endDate } = createAcademicYearDto;
        return this.prisma.tx.academicYear.create({
            data: {
                name,
                startDate,
                endDate,
                organizationId: orgId
            }
        });
    }
    async updateAcademicYear(id: string, updateAcademicYearDto: UpdateAcademicYearDto) {
        const { name, startDate, endDate, isCurrent } = updateAcademicYearDto;
        return this.prisma.tx.academicYear.update({
            where: { id },
            data: {
                name,
                startDate,
                endDate,
                isCurrent
            }
        });
    }

    async deleteAcademicYear(id: string) {
        const deletedAt = new Date();
        return this.prisma.tx.academicYear.update({
            where: { id },
            data: { deletedAt },
        });
    }

    async pastAcademicYears(orgId: string) {
        return this.prisma.tx.academicYear.updateMany({
            where: { organizationId: orgId, isCurrent: true },
            data: { isCurrent: false },
        });
    }

}