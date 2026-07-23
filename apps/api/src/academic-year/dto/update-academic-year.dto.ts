import {ApiProperty,PartialType} from '@nestjs/swagger';
import {IsOptional,IsBoolean} from 'class-validator';
import { CreateAcademicYearDto } from './create-academic-year.dto';

export class UpdateAcademicYearDto extends PartialType(CreateAcademicYearDto) {
    @ApiProperty({
        description: 'Indicates if the academic year is current',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    readonly isCurrent?: boolean;
}