import { Controller,Get,Post,Put,BadRequestException,Body,Param } from '@nestjs/common';
import { TimetableSlotService } from '@/timetable-slot/timetable-slot.service';
import { CreateTimetableSlotDto } from '@/timetable-slot/dto/create-timetable-slot.dto';
import { UpdateTimetableSlotDto } from '@/timetable-slot/dto/update-timetable-slot.dto';
import { IdDto } from '@/timetable-slot/dto/id.dto';
import {
    RequireActiveOrg,
    Session,
    type UserSession,
    MemberHasPermission
} from "@thallesp/nestjs-better-auth";

@Controller('timetable-slots')
export class TimetableSlotController {
    constructor(private readonly timetableSlotService: TimetableSlotService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['create']}})
    async createTimetableSlot(
        @Session() session: UserSession,
        @Body() createTimetableSlotDto: CreateTimetableSlotDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a timetable slot.');
        }
        return this.timetableSlotService.createTimetableSlot(createTimetableSlotDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['update']}})
    async updateTimetableSlot(
        @Session() session: UserSession,
        @Body() updateTimetableSlotDto: UpdateTimetableSlotDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a timetable slot.');
        }
        return this.timetableSlotService.updateTimetableSlot(id.id, updateTimetableSlotDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['read']}})
    async getTimetableSlotById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a timetable slot.');
        }
        return this.timetableSlotService.getTimetableSlotById(id.id);
    }
}
