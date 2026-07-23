import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTimetableDto } from '@/timetable/dto/create-timetable.dto';
import { UpdateTimetableDto } from '@/timetable/dto/update-timetable.dto';

@Injectable()
export class TimetableRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createTimetable(orgId: string, createTimetableDto: CreateTimetableDto) {
        const { name, academicYearId } = createTimetableDto;
        return this.prisma.tx.timetable.create({
            data: {
                organizationId: orgId,
                name,
                academicYearId,
            },
        });
    }

    async updateTimetable(id: string, updateTimetableDto: UpdateTimetableDto) {
        const { name, academicYearId } = updateTimetableDto;
        return this.prisma.tx.timetable.update({
            where: { id },
            data: {
                name,
                academicYearId,
            },
        });
    }

    async getTimetableById(id: string) {
        return this.prisma.tx.timetable.findUnique({
            where: { id },
        });
    }
}


