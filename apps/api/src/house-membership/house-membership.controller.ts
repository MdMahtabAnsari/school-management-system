import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { HouseMembershipService } from '@/house-membership/house-membership.service';
import { CreateHouseMembershipDto } from '@/house-membership/dto/create-house-membership.dto';
import { IdDto } from '@/house-membership/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('house-memberships')
export class HouseMembershipController {
    constructor(private readonly houseMembershipService: HouseMembershipService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{houseMembership:['manageActivities']}})
    async createHouseMembership(
        @Session() session: UserSession,
        @Body() createHouseMembershipDto: CreateHouseMembershipDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a house membership.');
        }
        return this.houseMembershipService.createHouseMembership(session.session.activeOrganizationId, createHouseMembershipDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{houseMembership:['manageActivities']}})
    async getHouseMembershipById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a house membership.');
        }
        return this.houseMembershipService.getHouseMembershipById(id.id, session.session.activeOrganizationId);
    }
}
