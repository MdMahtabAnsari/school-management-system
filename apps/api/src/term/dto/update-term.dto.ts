import {ApiProperty,PartialType} from '@nestjs/swagger';
import {CreateTermDto} from '@/term/dto/create-term.dto';

export class UpdateTermDto extends PartialType(CreateTermDto) {}