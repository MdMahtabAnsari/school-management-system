import { Controller,Get,Post,Param,Body,BadRequestException,Query } from '@nestjs/common';
import { StudentAttendanceService } from '@/student-attendance/student-attendance.service';
import { CreateStudentAttendanceDto } from '@/student-attendance/dto/create-student-attendance.dto';
import { StudentAttendanceFilterControllerDto } from '@/student-attendance/dto/student-attendance-filter.dto';
import {IdDto} from '@/student-attendance/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('student-attendances')
export class StudentAttendanceController {
    constructor(private readonly studentAttendanceService: StudentAttendanceService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{studentAttendance:['create']}})
    async markStudentAttendance(
        @Session() session: UserSession,
        @Body() createStudentAttendanceDto: CreateStudentAttendanceDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create student attendance.');
        }
        return this.studentAttendanceService.markStudentAttendance(session.session.activeOrganizationId, session.session.userId, createStudentAttendanceDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{studentAttendance:['read']}})
    async getStudentAttendanceById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get student attendance.');
        }
        return this.studentAttendanceService.getStudentAttendanceById(id.id, session.session.activeOrganizationId);
    }

    @Get('/filters')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{studentAttendance:['read']}})
    async getStudentAttendances(
        @Session() session: UserSession,
        @Query() filter: StudentAttendanceFilterControllerDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get student attendances.');
        }
        return this.studentAttendanceService.getStudentAttendanceByFilter({
            ...filter,
            organizationId: session.session.activeOrganizationId,
        });
    }

}
