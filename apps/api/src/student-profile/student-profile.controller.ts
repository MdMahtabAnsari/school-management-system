import { Controller,Get,Post,Put,Body,Param,BadRequestException } from '@nestjs/common';
import { StudentProfileService } from '@/student-profile/student-profile.service';
import { CreateStudentProfileDto } from '@/student-profile/dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from '@/student-profile/dto/update-student-profile.dto';
import { IdDto } from '@/student-profile/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('student-profiles')
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['create']}})
    async createStudentProfile(
        @Session() session: UserSession,
        @Body() createStudentProfileDto: CreateStudentProfileDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a student profile.');
        }
        return this.studentProfileService.createStudentProfile(session.session.activeOrganizationId, session.session.userId, createStudentProfileDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['update']}})
    async updateStudentProfile(
        @Session() session: UserSession,
        @Body() updateStudentProfileDto: UpdateStudentProfileDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a student profile.');
        }
        return this.studentProfileService.updateStudentProfile(id.id, session.session.activeOrganizationId, session.session.userId, updateStudentProfileDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['read']}})
    async getStudentProfileById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a student profile.');
        }
        return this.studentProfileService.getStudentProfileById(id.id, session.session.activeOrganizationId);
    }
}
