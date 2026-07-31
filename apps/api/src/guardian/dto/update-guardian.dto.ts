import {PartialType} from '@nestjs/swagger';
import { CreateGuardianDto } from '@/guardian/dto/create-guardian.dto';

export class UpdateGuardianDto extends PartialType(CreateGuardianDto) {}