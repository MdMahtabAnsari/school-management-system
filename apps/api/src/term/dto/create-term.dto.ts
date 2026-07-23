import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsString,IsDateString,IsUUID} from 'class-validator';

export class CreateTermDto {
    @ApiProperty({
        description: 'Name of the term',
        example: 'Term 1, Semester 1, etc.'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description: 'Start date of the term',
        example: '2023-06-01'
    })
    @IsNotEmpty()
    @IsDateString()
    readonly startDate!: string;

    @ApiProperty({
        description: 'End date of the term',
        example: '2023-12-31'
    })
    @IsNotEmpty()
    @IsDateString()
    readonly endDate!: string;

    @ApiProperty({
        description: 'Academic year ID associated with the term',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly academicYearId!: string;
}