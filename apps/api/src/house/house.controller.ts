import { Controller,Get,Post,Body,Param,BadRequestException } from '@nestjs/common';
import { HouseService } from '@/house/house.service';
import { CreateHouseDto } from '@/house/dto/create-house.dto';
import { IdDto } from '@/house/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('houses')
export class HouseController {
    constructor(private readonly houseService: HouseService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['manageActivities']}})
    async createHouse(
        @Session() session: UserSession,
        @Body() createHouseDto: CreateHouseDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a house.');
        }
        return this.houseService.createHouse(session.session.activeOrganizationId, createHouseDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['manageActivities']}})
    async getHouseById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a house.');
        }
        return this.houseService.getHouseById(id.id, session.session.activeOrganizationId);
    }
}
