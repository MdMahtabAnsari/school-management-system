import { Controller,Get,Post,Delete,Put,Param,Body,BadRequestException } from '@nestjs/common';
import { StaffProfileService } from '@/staff-profile/staff-profile.service';
import { CreateStaffProfileDto } from '@/staff-profile/dto/create-staff-profile.dto';
import { UpdateStaffProfileDto } from '@/staff-profile/dto/update-staff-profile.dto';
import { IdDto } from '@/staff-profile/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('staff-profiles')
export class StaffProfileController {
    constructor(private readonly staffProfileService: StaffProfileService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{staff:['create']}})
    async createStaffProfile(
        @Session() session: UserSession,
        @Body() createStaffProfileDto: CreateStaffProfileDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a staff profile.');
        }
        return this.staffProfileService.createStaffProfile(session.session.activeOrganizationId, createStaffProfileDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{staff:['read']}})
    async getStaffProfileById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a staff profile.');
        }
        return this.staffProfileService.getStaffProfileById(id.id, session.session.activeOrganizationId);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{staff:['update']}})
    async updateStaffProfile(
        @Session() session: UserSession,
        @Param() id: IdDto,
        @Body() updateStaffProfileDto: UpdateStaffProfileDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a staff profile.');
        }
        return this.staffProfileService.updateStaffProfile(id.id, session.session.activeOrganizationId, updateStaffProfileDto);
    }

    @Delete(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{staff:['delete']}})
    async deleteStaffProfile(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to delete a staff profile.');
        }
        return this.staffProfileService.deleteStaffProfile(id.id, session.session.activeOrganizationId);
    }


}
