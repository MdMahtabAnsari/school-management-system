import { Controller,Put,Get,Post,BadRequestException,Body,Param } from '@nestjs/common';
import { PeriodService } from '@/period/period.service';
import { CreatePeriodDto } from '@/period/dto/create-period.dto';
import { UpdatePeriodDto } from '@/period/dto/update-period.dto';
import {IdDto} from '@/period/dto/id.dto';
import {
  RequireActiveOrg,
  Session,
  type UserSession,
  MemberHasPermission
} from "@thallesp/nestjs-better-auth";



@Controller('periods')
export class PeriodController {
    constructor(private readonly periodService: PeriodService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['create']}})
    async createPeriod(
        @Body() createPeriodDto: CreatePeriodDto,
        @Session() session: UserSession,
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a period.');
        }
        return this.periodService.createPeriod(session.session.activeOrganizationId, createPeriodDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['update']}})
    async updatePeriod(
        @Param() id: IdDto,
        @Body() updatePeriodDto: UpdatePeriodDto,
        @Session() session: UserSession,
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a period.');
        }
        return this.periodService.updatePeriod(id.id, session.session.activeOrganizationId, updatePeriodDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{timetable:['read']}})
    async getPeriodById(
        @Param() id: IdDto,
        @Session() session: UserSession,
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a period.');
        }
        return this.periodService.getPeriodById(id.id, session.session.activeOrganizationId);
    }
}
