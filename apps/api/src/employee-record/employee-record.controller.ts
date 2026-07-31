import { Controller,Get,Post,Put,Param,Body,BadRequestException } from '@nestjs/common';
import { EmployeeRecordService } from '@/employee-record/employee-record.service';
import { CreateEmployeeRecordDto } from '@/employee-record/dto/create-employee-record.dto';
import { UpdateEmployeeRecordDto } from '@/employee-record/dto/update-employee-record.dto';
import { IdDto } from '@/employee-record/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('employee-records')
export class EmployeeRecordController {
    constructor(private readonly employeeRecordService: EmployeeRecordService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{employeeRecord:['create']}})
    async createEmployeeRecord(
        @Session() session: UserSession,
        @Body() createEmployeeRecordDto: CreateEmployeeRecordDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create an employee record.');
        }
        return this.employeeRecordService.createEmployeeRecord(session.session.activeOrganizationId, createEmployeeRecordDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{employeeRecord:['update']}})
    async updateEmployeeRecord(
        @Session() session: UserSession,
        @Param() id: IdDto,
        @Body() updateEmployeeRecordDto: UpdateEmployeeRecordDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update an employee record.');
        }
        return this.employeeRecordService.updateEmployeeRecord(id.id, session.session.activeOrganizationId, updateEmployeeRecordDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{employeeRecord:['read']}})
    async getEmployeeRecordById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get an employee record.');
        }
        return this.employeeRecordService.getEmployeeRecordById(id.id, session.session.activeOrganizationId);
    }
}
