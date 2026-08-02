import { ApiProperty,OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class TimetableSlotFilterDto {
  @ApiProperty({ 
    description: 'Timetable ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
 })
  @IsOptional()
  @IsUUID()
  readonly timetableId?: string;

  @ApiProperty({ 
    description: 'Class Section ID' ,
    example: '550e8400-e29b-41d4-a716-446655440001'
})
  @IsOptional()
  @IsUUID()
  readonly classSectionId?: string;

  @ApiProperty({ 
    description: 'Period ID',
    example: '550e8400-e29b-41d4-a716-446655440002'
  })
  @IsOptional()
  @IsUUID()
  readonly periodId?: string;

  @ApiProperty({ 
    description: 'Subject ID',
    example: '550e8400-e29b-41d4-a716-446655440003'
  })
  @IsOptional()
  @IsUUID()
  readonly subjectId?: string;

  @ApiProperty({ 
    description: 'Teacher ID',
    example: '550e8400-e29b-41d4-a716-446655440004'
  })
  @IsOptional()
  @IsUUID()
  readonly teacherId?: string;

  @ApiProperty({
    description: 'Weekday (0 = Sunday, 6 = Saturday)',
    minimum: 0,
    maximum: 6,
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(6)
  readonly weekday?: number;

  @ApiProperty({
    description: 'Organization ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsString()
  readonly organizationId!: string;

  @ApiProperty({
    description: 'Academic Year ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  readonly academicYearId?: string;

  @ApiProperty({
    description: 'Page number',
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page?: number;

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
  readonly limit?: number;
}

export class TimetableSlotFilterControllerDto extends OmitType(
  TimetableSlotFilterDto,
  ['organizationId'] as const,
) {}