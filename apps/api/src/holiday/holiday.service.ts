import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { HolidayRepository } from '@/holiday/holiday.repository';
import { CreateHolidayDto } from '@/holiday/dto/create-holiday.dto';
import { UpdateHolidayDto } from '@/holiday/dto/update-holiday.dto';

@Injectable()
export class HolidayService {
    constructor(private readonly holidayRepository: HolidayRepository) { }

    async createHoliday(orgId: string, createHolidayDto: CreateHolidayDto) {
        return this.holidayRepository.createHoliday(orgId, createHolidayDto);
    }

    async updateHoliday(id: string, orgId: string, updateHolidayDto: UpdateHolidayDto) {
        const holiday = await this.holidayRepository.getHolidayById(id);
        if (!holiday) {
            throw new NotFoundException('Holiday not found');
        }
        if (holiday.organizationId !== orgId) {
            throw new ForbiddenException('You are not the owner of this holiday');
        }
        return this.holidayRepository.updateHoliday(id, updateHolidayDto);
    }

    async getHolidayById(id: string, orgId: string) {
        const holiday = await this.holidayRepository.getHolidayById(id);
        if (!holiday) {
            throw new NotFoundException('Holiday not found');
        }
        if (holiday.organizationId !== orgId) {
            throw new ForbiddenException('You are not the owner of this holiday');
        }
        return holiday;
    }

    async getHolidayByDate(orgId: string, date: string) {
        const holiday = await this.holidayRepository.getHolidayByOrgIdAndDate(orgId, date);
        if (!holiday) {
            throw new NotFoundException('Holiday not found');
        }
        return holiday;
    }

    async getHolidayByAcademicYearAndDate(orgId: string, date: string, academicYearId?: string) {
        const holiday = await this.holidayRepository.getHolidayByOrgIdAndAcademicYearAndDate(orgId, date, academicYearId);
        if (!holiday) {
            throw new NotFoundException('Holiday not found');
        }
        return holiday;
    }
}
