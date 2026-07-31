import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { ClubMembershipService } from '@/club-membership/club-membership.service';
import { CreateClubMembershipDto } from '@/club-membership/dto/create-club-membership.dto';
import { IdDto } from '@/club-membership/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('club-memberships')
export class ClubMembershipController {
    constructor(private readonly clubMembershipService: ClubMembershipService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['manageActivities']}})
    async createClubMembership(
        @Session() session: UserSession,
        @Body() createClubMembershipDto: CreateClubMembershipDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a club membership.');
        }
        return this.clubMembershipService.createClubMembership(session.session.activeOrganizationId, createClubMembershipDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['manageActivities']}})
    async getClubMembershipById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a club membership.');
        }
        return this.clubMembershipService.getClubMembershipById(id.id, session.session.activeOrganizationId);
    }
}
