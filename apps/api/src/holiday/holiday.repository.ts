import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateHolidayDto } from '@/holiday/dto/create-holiday.dto';
import { UpdateHolidayDto } from '@/holiday/dto/update-holiday.dto';


@Injectable()
export class HolidayRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createHoliday(orgId: string, createHolidayDto: CreateHolidayDto) {
        const { name, date, academicYearId, isWorkingDay } = createHolidayDto;
        return this.prisma.tx.holiday.create({
            data: {
                organizationId: orgId,
                name,
                date,
                academicYearId,
                isWorkingDay
            },
        });
    }

    async updateHoliday(id: string, updateHolidayDto: UpdateHolidayDto) {
        const { name, date, academicYearId, isWorkingDay } = updateHolidayDto;
        return this.prisma.tx.holiday.update({
            where: { id },
            data: {
                name,
                date,
                academicYearId,
                isWorkingDay
            },
        });
    }

    async getHolidayById(id: string) {
        return this.prisma.tx.holiday.findUnique({
            where: { id },
        });
    }
}

