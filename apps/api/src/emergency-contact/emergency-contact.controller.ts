import { Controller,Get,Post,Put,Body,Param,BadRequestException } from '@nestjs/common';
import { EmergencyContactService } from '@/emergency-contact/emergency-contact.service';
import { CreateEmergencyContactDto } from '@/emergency-contact/dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from '@/emergency-contact/dto/update-emergency-contact.dto';
import { IdDto } from '@/emergency-contact/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('emergency-contacts')
export class EmergencyContactController {
    constructor(private readonly emergencyContactService: EmergencyContactService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['create']}})
    async createEmergencyContact(
        @Session() session: UserSession,
        @Body() createEmergencyContactDto: CreateEmergencyContactDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create an emergency contact.');
        }
        return this.emergencyContactService.createEmergencyContact(session.session.activeOrganizationId, createEmergencyContactDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['read']}})
    async getEmergencyContactById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get an emergency contact.');
        }
        return this.emergencyContactService.getEmergencyContactById(id.id, session.session.activeOrganizationId);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['update']}})
    async updateEmergencyContact(
        @Session() session: UserSession,
        @Body() updateEmergencyContactDto: UpdateEmergencyContactDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update an emergency contact.');
        }
        return this.emergencyContactService.updateEmergencyContact(id.id, session.session.activeOrganizationId, updateEmergencyContactDto);
    }
}
