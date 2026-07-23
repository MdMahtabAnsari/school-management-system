import { Controller,BadRequestException,Get,Post,Put,Body,Param } from '@nestjs/common';
import { HolidayService } from '@/holiday/holiday.service';
import { CreateHolidayDto } from '@/holiday/dto/create-holiday.dto';
import { UpdateHolidayDto } from '@/holiday/dto/update-holiday.dto';
import { IdDto } from '@/holiday/dto/id.dto';
import {
    RequireActiveOrg,
    Session,
    type UserSession,
    MemberHasPermission
} from "@thallesp/nestjs-better-auth";

@Controller('holidays')
export class HolidayController {
    constructor(private readonly holidayService: HolidayService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['create']}})
    async createHoliday(
        @Session() session: UserSession,
        @Body() createHolidayDto: CreateHolidayDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a holiday.');
        }
        return this.holidayService.createHoliday(session.session.activeOrganizationId, createHolidayDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['update']}})
    async updateHoliday(
        @Session() session: UserSession,
        @Body() updateHolidayDto: UpdateHolidayDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a holiday.');
        }
        return this.holidayService.updateHoliday(id.id, session.session.activeOrganizationId, updateHolidayDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['read']}})
    async getHolidayById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a holiday.');
        }
        return this.holidayService.getHolidayById(id.id, session.session.activeOrganizationId);
    }
}
