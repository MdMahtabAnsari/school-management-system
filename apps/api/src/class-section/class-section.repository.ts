import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateClassSectionDto } from '@/class-section/dto/create-class-section.dto';
import { UpdateClassSectionDto } from '@/class-section/dto/update-class-section.dto';

@Injectable()
export class ClassSectionRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createClassSection(orgId: string, createClassSectionDto: CreateClassSectionDto) {
        const { academicYearId, gradeLevelId, campusId, name, stream, capacity, currentCount, classTeacherId } = createClassSectionDto;
        return this.prisma.tx.classSection.create({
            data: {
                organizationId: orgId,
                academicYearId,
                gradeLevelId,
                campusId,
                name,
                stream,
                capacity,
                currentCount,
                classTeacherId,
            },
        });
    }

    async updateClassSection(id: string, updateClassSectionDto: UpdateClassSectionDto) {
        const { academicYearId, gradeLevelId, campusId, name, stream, capacity, currentCount, classTeacherId } = updateClassSectionDto;
        return this.prisma.tx.classSection.update({
            where: { id },
            data: {
                academicYearId,
                gradeLevelId,
                campusId,
                name,
                stream,
                capacity,
                currentCount,
                classTeacherId,
            },
        });
    }

    async getClassSectionById(id: string) {
        return this.prisma.tx.classSection.findUnique({
            where: { id },
        });
    }

    async deleteClassSection(id: string) {
        const deletedAt = new Date();
        return this.prisma.tx.classSection.update({
            where: { id },
            data: { deletedAt },
        });
    }
}
