import { Injectable,NotFoundException } from '@nestjs/common';
import { EmployeeRecordRepository } from '@/employee-record/employee-record.repository';
import { CreateEmployeeRecordDto } from '@/employee-record/dto/create-employee-record.dto';
import { UpdateEmployeeRecordDto } from '@/employee-record/dto/update-employee-record.dto';
import {StaffProfileService} from '@/staff-profile/staff-profile.service';

@Injectable()
export class EmployeeRecordService {
    constructor(
        private readonly employeeRecordRepository: EmployeeRecordRepository,
        private readonly staffProfileService: StaffProfileService
    ) {}

    async createEmployeeRecord(orgId: string, createEmployeeRecordDto: CreateEmployeeRecordDto) {
        await this.staffProfileService.getStaffProfileById(createEmployeeRecordDto.staffId, orgId);
        return this.employeeRecordRepository.createEmployeeRecord(orgId, createEmployeeRecordDto);
    }

    async updateEmployeeRecord(id: string, orgId: string, updateEmployeeRecordDto: UpdateEmployeeRecordDto) {
        const employeeRecord = await this.employeeRecordRepository.getEmployeeRecordById(id);
        if (!employeeRecord) {
            throw new NotFoundException('Employee record not found');
        }
        if (employeeRecord.organizationId !== orgId) {
            throw new NotFoundException('Employee record not found in your organization');
        }

        await this.staffProfileService.getStaffProfileById(employeeRecord.staffId, orgId);
        return this.employeeRecordRepository.updateEmployeeRecord(id, updateEmployeeRecordDto);
    }

    async getEmployeeRecordById(id: string, orgId: string) {
        const employeeRecord = await this.employeeRecordRepository.getEmployeeRecordById(id);
        if (!employeeRecord) {
            throw new NotFoundException('Employee record not found');
        }
        if (employeeRecord.organizationId !== orgId) {
            throw new NotFoundException('Employee record not found in your organization');
        }
        return employeeRecord;
    }


}