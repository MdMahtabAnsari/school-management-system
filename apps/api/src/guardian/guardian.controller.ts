import { Controller,Get,Post,Delete,Put,Body,Param,BadRequestException } from '@nestjs/common';
import { GuardianService } from '@/guardian/guardian.service';
import { CreateGuardianDto } from '@/guardian/dto/create-guardian.dto';
import { UpdateGuardianDto } from '@/guardian/dto/update-guardian.dto';
import { IdDto } from '@/guardian/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('guardians')
export class GuardianController {
    constructor(private readonly guardianService: GuardianService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{guardian:['create']}})
    async createGuardian(
        @Session() session: UserSession,
        @Body() createGuardianDto: CreateGuardianDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a guardian.');
        }
        return this.guardianService.createGuardian(session.session.activeOrganizationId, createGuardianDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{guardian:['update']}})
    async updateGuardian(
        @Session() session: UserSession,
        @Body() updateGuardianDto: UpdateGuardianDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a guardian.');
        }
        return this.guardianService.updateGuardian(id.id, session.session.activeOrganizationId, updateGuardianDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{guardian:['read']}})
    async getGuardianById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a guardian.');
        }
        return this.guardianService.getGuardianById(id.id, session.session.activeOrganizationId);
    }

    @Delete(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{guardian:['delete']}})
    async deleteGuardian(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to delete a guardian.');
        }
        return this.guardianService.deleteGuardian(id.id, session.session.activeOrganizationId);
    }
}
