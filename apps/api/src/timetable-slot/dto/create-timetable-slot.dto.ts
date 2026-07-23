import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';



export class CreateTimetableSlotDto {
    @ApiProperty({
        description: 'The ID of the timetable',
        example: '3f6d2e6f-c022-49a0-ad09-9d94c84cdfb4'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly timetableId!: string;

    @ApiProperty({
        description: 'The ID of the class section',
        example: '3f6d2e6f-c022-49a0-ad09-9d94c84cdfb4'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly classSectionId!: string;

    @ApiProperty({
        description: 'The ID of the period',
        example: '3f6d2e6f-c022-49a0-ad09-9d94c84cdfb4'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly periodId!: string;

    @ApiProperty({
        description: 'The ID of the subject (optional)',
        example: '3f6d2e6f-c022-49a0-ad09-9d94c84cdfb4',
        required: false
    })
    @IsOptional()
    @IsUUID()
    readonly subjectId?: string;

    @ApiProperty({
        description: 'The ID of the teacher (optional)',
        example: '3f6d2e6f-c022-49a0-ad09-9d94c84cdfb4',
        required: false
    })
    @IsOptional()
    @IsUUID()
    readonly teacherId?: string;

    @ApiProperty({
        description: 'The weekday for the timetable slot (0=Sunday, 1=Monday, ..., 6=Saturday)',
        example: 1
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    readonly weekday!: number;
}