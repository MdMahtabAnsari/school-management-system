import { Controller,Get,Post,Body,Param,BadRequestException } from '@nestjs/common';
import { StudentTransferLogService } from '@/student-transfer-log/student-transfer-log.service';
import { CreateStudentTransferLogDto } from '@/student-transfer-log/dto/create-student-transfer-log.dto';
import { IdDto } from '@/student-transfer-log/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('student-transfer-logs')
export class StudentTransferLogController {
  constructor(private readonly studentTransferLogService: StudentTransferLogService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['transfer']}})
    async createStudentTransferLog(
        @Session() session: UserSession,
        @Body() createStudentTransferLogDto: CreateStudentTransferLogDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a student transfer log.');
        }
        return this.studentTransferLogService.createStudentTransferLog(session.session.activeOrganizationId, session.session.userId, createStudentTransferLogDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['read']}})
    async getStudentTransferLogById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a student transfer log.');
        }
        return this.studentTransferLogService.getStudentTransferLogById(id.id, session.session.activeOrganizationId);
    }
}
