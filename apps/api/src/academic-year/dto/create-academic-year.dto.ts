import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsOptional, IsUUID,IsDateString} from 'class-validator';

export class CreateAcademicYearDto {
    @ApiProperty({
        description: 'Name of the academic year',
        example: '2023-2024'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description: 'Start date of the academic year',
        example: '2023-06-01'
    })
    @IsNotEmpty()
    @IsDateString()
    readonly startDate!: string;

    @ApiProperty({
        description: 'End date of the academic year',
        example: '2024-05-31'
    })
    @IsNotEmpty()
    @IsDateString()
    readonly endDate!: string;
}