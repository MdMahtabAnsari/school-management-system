import {CreateEmployeeRecordDto} from '@/employee-record/dto/create-employee-record.dto';
import {PartialType} from '@nestjs/swagger';

export class UpdateEmployeeRecordDto extends PartialType(CreateEmployeeRecordDto) {}