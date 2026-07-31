import { Controller,Get,Post,Body,Param,BadRequestException } from '@nestjs/common';
import { StudentGuardianService } from '@/student-guardian/student-guardian.service';
import { CreateStudentGuardianDto } from '@/student-guardian/dto/create-student-guardian.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';
import { IdDto } from '@/student-guardian/dto/id.dto';

@Controller('student-guardians')
export class StudentGuardianController {
    constructor(private readonly studentGuardianService: StudentGuardianService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{guardian:['linkStudent']}})
    async createStudentGuardian(
        @Session() session: UserSession,
        @Body() createStudentGuardianDto: CreateStudentGuardianDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a student guardian.');
        }
        return this.studentGuardianService.createStudentGuardian(session.session.activeOrganizationId, createStudentGuardianDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{guardian:['linkStudent']}})
    async getStudentGuardianById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a student guardian.');
        }
        return this.studentGuardianService.getStudentGuardianById(id.id, session.session.activeOrganizationId);
    }
}
