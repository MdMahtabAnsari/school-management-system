import {PartialType} from '@nestjs/swagger';
import { CreateSubjectGroupDto } from '@/subject-group/dto/create-subject-group.dto';



export class UpdateSubjectGroupDto extends PartialType(CreateSubjectGroupDto) {}