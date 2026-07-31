import { Controller,Get,Post,Put,BadRequestException,Body,Param } from '@nestjs/common';
import { StudentMedicalInfoService } from '@/student-medical-info/student-medical-info.service';
import { CreateStudentMedicalInfoDto } from '@/student-medical-info/dto/create-student-medical-info.dto';
import { UpdateStudentMedicalInfoDto } from '@/student-medical-info/dto/update-student-medical-info.dto';
import { IdDto } from '@/student-medical-info/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('student-medical-infos')
export class StudentMedicalInfoController {
    constructor(private readonly studentMedicalInfoService: StudentMedicalInfoService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{healthRecord:['create']}})
    async createStudentMedicalInfo(
        @Session() session: UserSession,
        @Body() createStudentMedicalInfoDto: CreateStudentMedicalInfoDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create student medical info.');
        }
        return this.studentMedicalInfoService.createStudentMedicalInfo(session.session.activeOrganizationId, createStudentMedicalInfoDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{healthRecord:['read']}})
    async getStudentMedicalInfoById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get student medical info.');
        }
        return this.studentMedicalInfoService.getStudentMedicalInfoById(id.id, session.session.activeOrganizationId);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{healthRecord:['update']}})
    async updateStudentMedicalInfo(
        @Session() session: UserSession,
        @Body() updateStudentMedicalInfoDto: UpdateStudentMedicalInfoDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update student medical info.');
        }
        return this.studentMedicalInfoService.updateStudentMedicalInfo(id.id, session.session.activeOrganizationId, updateStudentMedicalInfoDto);
    }
}
