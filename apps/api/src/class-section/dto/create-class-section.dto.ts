import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt,
  Min,
} from 'class-validator';

export class CreateClassSectionDto {
  @ApiProperty({
    description: 'Academic year ID associated with the class section',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly academicYearId!: string;

  @ApiProperty({
    description: 'Grade level ID associated with the class section',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly gradeLevelId!: string;

  @ApiProperty({
    description: 'Campus ID associated with the class section',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  readonly campusId?: string;

  @ApiProperty({
    description: 'Name of the class section',
    example: 'Section A',
  })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @ApiProperty({
    description: 'Stream of the class section',
    example: 'Science',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly stream?: string;

  @ApiProperty({
    description: 'Maximum student capacity of the class section',
    example: 30,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly capacity!: number;

  @ApiProperty({
    description: 'Current number of students in the class section',
    example: 0
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly currentCount!: number;

  @ApiProperty({
    description: 'Class teacher ID associated with the class section',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  readonly classTeacherId?: string;
}