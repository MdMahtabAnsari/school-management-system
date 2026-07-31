import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { ClubService } from '@/club/club.service';
import { CreateClubDto } from '@/club/dto/create-club.dto';
import { IdDto } from '@/club/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('clubs')
export class ClubController {
    constructor(private readonly clubService: ClubService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['manageActivities']}})
    async createClub(
        @Session() session: UserSession,
        @Body() createClubDto: CreateClubDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a club.');
        }
        return this.clubService.createClub(session.session.activeOrganizationId, createClubDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['manageActivities']}})
    async getClubById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a club.');
        }
        return this.clubService.getClubById(id.id, session.session.activeOrganizationId);
    }
}
