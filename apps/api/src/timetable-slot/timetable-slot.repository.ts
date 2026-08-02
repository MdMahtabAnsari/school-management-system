import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTimetableSlotDto } from '@/timetable-slot/dto/create-timetable-slot.dto';
import { UpdateTimetableSlotDto } from '@/timetable-slot/dto/update-timetable-slot.dto';
import { TimetableSlotFilterDto } from '@/timetable-slot/dto/timetable-slot-filter.dto';

@Injectable()
export class TimetableSlotRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createTimetableSlot(createTimetableSlotDto: CreateTimetableSlotDto) {
        const { timetableId, classSectionId, periodId,subjectId,teacherId, weekday } = createTimetableSlotDto;
        return this.prisma.tx.timetableSlot.create({
            data: {
                timetableId,
                classSectionId,
                periodId,
                subjectId,
                teacherId,
                weekday
            },
        });
    }

    async updateTimetableSlot(id: string, updateTimetableSlotDto: UpdateTimetableSlotDto) {
        const { timetableId, classSectionId, periodId,subjectId,teacherId, weekday } = updateTimetableSlotDto;
        return this.prisma.tx.timetableSlot.update({
            where: { id },
            data: {
                timetableId,
                classSectionId,
                periodId,
                subjectId,
                teacherId,
                weekday
            },
        });
    }

    async getTimetableSlotById(id: string) {
        return this.prisma.tx.timetableSlot.findUnique({
            where: { id },
        });
    }

    async getTimetableSlotsByFilter(filter: TimetableSlotFilterDto) {
        const { timetableId, classSectionId, periodId, subjectId, teacherId, weekday, page, limit, organizationId, academicYearId} = filter;
        
        const skip = ((page || 1) - 1) * (limit || 10);
        return this.prisma.tx.timetableSlot.findMany({
            where: {
                timetableId,
                classSectionId,
                periodId,
                subjectId,
                teacherId,
                weekday,
                timetable: {
                    organizationId,
                    academicYearId
                }
            },
            skip,
            take: limit|| 10,
        });
    }
}
