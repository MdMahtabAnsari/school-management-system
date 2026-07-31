import { Module } from '@nestjs/common';
import { EmployeeRecordController } from '@/employee-record/employee-record.controller';
import { EmployeeRecordService } from '@/employee-record/employee-record.service';
import { EmployeeRecordRepository } from '@/employee-record/employee-record.repository';
import {PrismaModule} from '@/prisma/prisma.module';
import {StaffProfileModule} from '@/staff-profile/staff-profile.module';

@Module({
  controllers: [EmployeeRecordController],
  providers: [EmployeeRecordService, EmployeeRecordRepository],
  imports: [PrismaModule, StaffProfileModule],
})
export class EmployeeRecordModule {}
