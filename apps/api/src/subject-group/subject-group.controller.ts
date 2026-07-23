import { Controller, Get, Post, Put, Body, Param, BadRequestException } from '@nestjs/common';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';
import { SubjectGroupService } from '@/subject-group/subject-group.service';
import { CreateSubjectGroupDto } from '@/subject-group/dto/create-subject-group.dto';
import { UpdateSubjectGroupDto } from '@/subject-group/dto/update-subject-group.dto';
import { IdDto } from '@/subject-group/dto/id.dto';

@Controller('subject-groups')
export class SubjectGroupController {
    constructor(private readonly subjectGroupService: SubjectGroupService) { }

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({ permissions: { academicStructure: ['create'] } })
    async createSubjectGroup(
        @Session() session: UserSession,
        @Body() createSubjectGroupDto: CreateSubjectGroupDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a subject group.');
        }
        return this.subjectGroupService.createSubjectGroup(session.session.activeOrganizationId, createSubjectGroupDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({ permissions: { academicStructure: ['update'] } })
    async updateSubjectGroup(
        @Session() session: UserSession,
        @Body() updateSubjectGroupDto: UpdateSubjectGroupDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a subject group.');
        }
        return this.subjectGroupService.updateSubjectGroup(id.id, session.session.activeOrganizationId, updateSubjectGroupDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({ permissions: { academicStructure: ['read'] } })
    async getSubjectGroupById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a subject group.');
        }
        return this.subjectGroupService.getSubjectGroupById(id.id, session.session.activeOrganizationId);
    }
}
