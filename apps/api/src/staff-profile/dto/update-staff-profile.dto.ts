import {CreateStaffProfileDto} from '@/staff-profile/dto/create-staff-profile.dto';
import {PartialType} from '@nestjs/swagger';

export class UpdateStaffProfileDto extends PartialType(CreateStaffProfileDto) {}