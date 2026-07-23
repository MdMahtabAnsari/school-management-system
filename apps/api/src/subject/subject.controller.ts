import { Controller,Get,Post,Put,Delete,Body,Param,BadRequestException } from '@nestjs/common';
import { SubjectService } from '@/subject/subject.service';
import { CreateSubjectDto } from '@/subject/dto/create-subject.dto';
import { UpdateSubjectDto } from '@/subject/dto/update-subject.dto';
import { RequireActiveOrg, Session, type UserSession,  MemberHasPermission } from '@thallesp/nestjs-better-auth';
import {IdDto} from '@/subject/dto/id.dto';

@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['create']}})
    async createSubject(
        @Session() session: UserSession,
        @Body() createSubjectDto: CreateSubjectDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a subject.');
        }
        return this.subjectService.createSubject(session.session.activeOrganizationId, createSubjectDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['update']}})
    async updateSubject(
        @Session() session: UserSession,
        @Body() updateSubjectDto: UpdateSubjectDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a subject.');
        }
        return this.subjectService.updateSubject(id.id, session.session.activeOrganizationId, updateSubjectDto);
    }

    @Delete(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['delete']}})
    async deleteSubject(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to delete a subject.');
        }
        return this.subjectService.deleteSubject(id.id, session.session.activeOrganizationId);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['read']}})
    async getSubjectById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a subject.');
        }
        return this.subjectService.getSubjectById(id.id, session.session.activeOrganizationId);
    }
}
