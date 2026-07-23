import { Controller,Get,Post,Put,BadRequestException,Body,Param } from '@nestjs/common';
import { TimetableService } from '@/timetable/timetable.service';
import { CreateTimetableDto } from '@/timetable/dto/create-timetable.dto';
import { UpdateTimetableDto } from '@/timetable/dto/update-timetable.dto';
import { IdDto } from '@/timetable/dto/id.dto';
import {
    RequireActiveOrg,
    Session,
    type UserSession,
    MemberHasPermission
} from "@thallesp/nestjs-better-auth";


@Controller('timetables')
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['create']}})
    async createTimetable(
        @Session() session: UserSession,
        @Body() createTimetableDto: CreateTimetableDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a timetable.');
        }
        return this.timetableService.createTimetable(session.session.activeOrganizationId, createTimetableDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['update']}})
    async updateTimetable(
        @Session() session: UserSession,
        @Body() updateTimetableDto: UpdateTimetableDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a timetable.');
        }
        return this.timetableService.updateTimetable(id.id, session.session.activeOrganizationId, updateTimetableDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['read']}})
    async getTimetableById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a timetable.');
        }
        return this.timetableService.getTimetableById(id.id, session.session.activeOrganizationId);
    }
}
