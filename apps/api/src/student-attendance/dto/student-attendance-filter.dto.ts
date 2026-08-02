import {ApiProperty,OmitType} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsOptional, IsString, IsUUID,IsDateString,IsEnum,IsNotEmpty, Min, IsInt, Max,IsBoolean} from 'class-validator';
import {AttendanceStatus} from "@workspace/db/generated/prisma/cjs/enums";


export class StudentAttendanceFilterDto {
    @ApiProperty({
        description: 'The ID of the student',
        example: '550e8400-e29b-41d4-a716-446655440001',
     })
    @IsOptional()
    @IsUUID()
    readonly studentId?: string;

    @ApiProperty({
        description: 'The date of attendance in YYYY-MM-DD format',
        example: '2023-09-15',
     })
    @IsOptional()
    @IsDateString()
    readonly date?: string;

    @ApiProperty({
        description: 'The attendance status (e.g., PRESENT, ABSENT, LATE)',
        example: AttendanceStatus.PRESENT,
        enum: AttendanceStatus,
     })
    @IsOptional()
    @IsEnum(AttendanceStatus)
    readonly status?: AttendanceStatus;

    @ApiProperty({
        description: 'The ID of the period (optional, for period-level attendance)',
        example: '550e8400-e29b-41d4-a716-446655440002',
     })
    @IsOptional()
    @IsUUID()
    readonly periodId?: string;

    @ApiProperty({
        description: 'The ID of the organization',
        example: '550e8400-e29b-41d4-a716-446655440000',
        required:true
     })
    @IsNotEmpty()
    @IsString()
    readonly organizationId!: string;

    @ApiProperty({
        description: 'markedById',
        example: '550e8400-e29b-41d4-a716-446655440003',
        
    })
    @IsOptional()
    @IsString()
    readonly markedById?: string;


    @ApiProperty({
        description: 'Page number',
        default: 1,
        minimum: 1,
      })
      @IsOptional()
      @Type(() => Number)
      @IsInt()
      @Min(1)
      readonly page?: number = 1;
    
      @ApiProperty({
        description: 'Number of records per page',
        default: 10,
        minimum: 1,
        maximum: 100,
      })
      @IsOptional()
      @Type(() => Number)
      @IsInt()
      @Min(1)
      @Max(100)
      readonly limit?: number = 10;
}

export class StudentAttendanceFilterControllerDto extends OmitType(
  StudentAttendanceFilterDto,
  ['organizationId'] as const,
) {}