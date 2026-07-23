import {CreateGradeLevelDto} from "@/grade-level/dto/create-grade-level.dto";
import { PartialType,ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer';
import {IsInt,IsOptional,Min} from 'class-validator'

export class UpdateGradeLevelDto extends PartialType(CreateGradeLevelDto) {
// sequence is optional and should be an integer if provided
  @ApiProperty({ description: 'The sequence of the grade level', required: false, example: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  sequence?: number;
}