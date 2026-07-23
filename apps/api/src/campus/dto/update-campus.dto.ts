import {ApiProperty,PartialType} from '@nestjs/swagger';
import {IsBoolean,IsOptional} from 'class-validator';
import { CreateCampusDto } from '@/campus/dto/create-campus.dto';

export class UpdateCampusDto extends PartialType(CreateCampusDto) {
    @ApiProperty({
        description: 'Indicates if the campus is primary',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    readonly isPrimary?: boolean;
}