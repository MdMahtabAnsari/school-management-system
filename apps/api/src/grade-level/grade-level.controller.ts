import { BadRequestException, Controller,Post,Body,Put,Param,Delete,Get } from '@nestjs/common';
import { GradeLevelService } from '@/grade-level/grade-level.service';
import {
  RequireActiveOrg,
  Session,
  type UserSession,
  MemberHasPermission
} from "@thallesp/nestjs-better-auth";
import { CreateGradeLevelDto } from '@/grade-level/dto/create-grade-level.dto';
import { UpdateGradeLevelDto } from '@/grade-level/dto/update-grade-level.dto';
import {IdDto} from '@/grade-level/dto/id.dto';


@Controller('grade-levels')
export class GradeLevelController {
    constructor(private readonly gradeLevelService: GradeLevelService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['create']}})
    async createGradeLevel(
        @Session() session: UserSession,
        @Body() createGradeLevelDto: CreateGradeLevelDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a grade level.');
        }
        return this.gradeLevelService.createGradeLevel(session.session.activeOrganizationId, createGradeLevelDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['update']}})
    async updateGradeLevel(
        @Param() id:IdDto,
        @Session() session: UserSession,
        @Body() updateGradeLevelDto: UpdateGradeLevelDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a grade level.');
        }
        return this.gradeLevelService.updateGradeLevel(id.id, session.session.activeOrganizationId, updateGradeLevelDto);
    }

    @Delete(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['delete']}})
    async deleteGradeLevel(
        @Param() id:IdDto,
        @Session() session: UserSession
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to delete a grade level.');
        }
        return this.gradeLevelService.deleteGradeLevel(id.id, session.session.activeOrganizationId);
    }
    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['read']}})
    async getGradeLevelById(
        @Param() id:IdDto,
        @Session() session: UserSession
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a grade level.');
        }
        return this.gradeLevelService.getGradeLevelById(id.id, session.session.activeOrganizationId);
    }
}
