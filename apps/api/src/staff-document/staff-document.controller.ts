import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';
import { StaffDocumentService } from '@/staff-document/staff-document.service';
import { CreateStaffDocumentDto } from '@/staff-document/dto/create-staff-document.dto';
import { IdDto } from '@/staff-document/dto/id.dto';


@Controller('staff-documents')
export class StaffDocumentController {
    constructor(private readonly staffDocumentService: StaffDocumentService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{staffDocument:['create']}})
    async createStaffDocument(
        @Session() session: UserSession,
        @Body() createStaffDocumentDto: CreateStaffDocumentDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a staff document.');
        }
        return this.staffDocumentService.createStaffDocument(session.session.activeOrganizationId, session.session.userId, createStaffDocumentDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{staffDocument:['read']}})
    async getStaffDocumentById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a staff document.');
        }
        return this.staffDocumentService.getStaffDocumentsById(id.id, session.session.activeOrganizationId);
    }
}
