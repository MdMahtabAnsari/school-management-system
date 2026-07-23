import { Controller,Post,Get,Put,Delete,BadRequestException,Body,Param } from '@nestjs/common';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';
import { ClassSectionService } from '@/class-section/class-section.service';
import { CreateClassSectionDto } from '@/class-section/dto/create-class-section.dto';
import { UpdateClassSectionDto } from '@/class-section/dto/update-class-section.dto';
import { IdDto } from '@/class-section/dto/id.dto';

@Controller('class-sections')
export class ClassSectionController {
    constructor(private readonly classSectionService: ClassSectionService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['create']}})
    async createClassSection(
        @Session() session: UserSession,
        @Body() createClassSectionDto: CreateClassSectionDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a class section.');
        }
        return this.classSectionService.createClassSection(session.session.activeOrganizationId, createClassSectionDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['update']}})
    async updateClassSection(
        @Session() session: UserSession,
        @Body() updateClassSectionDto: UpdateClassSectionDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a class section.');
        }
        return this.classSectionService.updateClassSection(id.id, session.session.activeOrganizationId, updateClassSectionDto);
    }
    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['read']}})
    async getClassSectionById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a class section.');
        }
        return this.classSectionService.getClassSectionById(id.id, session.session.activeOrganizationId);
    }
    @Delete(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['delete']}})
    async deleteClassSection(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to delete a class section.');
        }
        return this.classSectionService.deleteClassSection(id.id, session.session.activeOrganizationId);
    }

}
