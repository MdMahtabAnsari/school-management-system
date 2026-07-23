import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches} from 'class-validator';

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class CreatePeriodDto {
  @ApiProperty({
    description: 'Name of the period',
    example: 'Period 1',
  })
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @ApiProperty({
    description: 'Start time in HH:mm (24-hour) format',
    example: '08:00',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(TIME_REGEX, {
    message: 'startTime must be in HH:mm 24-hour format',
  })
  readonly startTime!: string;

  @ApiProperty({
    description: 'End time in HH:mm (24-hour) format',
    example: '09:00',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(TIME_REGEX, {
    message: 'endTime must be in HH:mm 24-hour format',
  })
  readonly endTime!: string;
}