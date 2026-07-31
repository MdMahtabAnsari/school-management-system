import { Controller,Get,Post,Put,Body,Param,BadRequestException } from '@nestjs/common';
import { StudentEnrollmentService } from '@/student-enrollment/student-enrollment.service';
import { CreateStudentEnrollmentDto } from '@/student-enrollment/dto/create-student-enrollment.dto';
import { UpdateStudentEnrollmentDto } from '@/student-enrollment/dto/update-student-enrollment.dto';
import { IdDto } from '@/student-enrollment/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('student-enrollments')
export class StudentEnrollmentController {
    constructor(private readonly studentEnrollmentService: StudentEnrollmentService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['create']}})
    async createStudentEnrollment(
        @Session() session: UserSession,
        @Body() createStudentEnrollmentDto: CreateStudentEnrollmentDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a student enrollment.');
        }
        return this.studentEnrollmentService.createStudentEnrollment(session.session.activeOrganizationId, createStudentEnrollmentDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['read']}})
    async getStudentEnrollmentById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a student enrollment.');
        }
        return this.studentEnrollmentService.getStudentEnrollmentById(id.id, session.session.activeOrganizationId);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['update']}})
    async updateStudentEnrollment(
        @Session() session: UserSession,
        @Body() updateStudentEnrollmentDto: UpdateStudentEnrollmentDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a student enrollment.');
        }
        return this.studentEnrollmentService.updateStudentEnrollment(id.id, session.session.activeOrganizationId, updateStudentEnrollmentDto);
    }
}
