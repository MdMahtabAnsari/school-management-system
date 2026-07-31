import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { StudentDocumentService } from '@/student-document/student-document.service';
import { CreateStudentDocumentDto } from '@/student-document/dto/create-student-document.dto';
import { IdDto } from '@/student-document/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('student-documents')
export class StudentDocumentController {
    constructor(private readonly studentDocumentService: StudentDocumentService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{studentDocument:['create']}})
    async createStudentDocument(
        @Session() session: UserSession,
        @Body() createStudentDocumentDto: CreateStudentDocumentDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a student document.');
        }
        return this.studentDocumentService.createStudentDocument(session.session.activeOrganizationId, session.session.userId, createStudentDocumentDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{studentDocument:['read']}})
    async getStudentDocumentsById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a student document.');
        }
        return this.studentDocumentService.getStudentDocumentsById(id.id, session.session.activeOrganizationId);
    }
}
