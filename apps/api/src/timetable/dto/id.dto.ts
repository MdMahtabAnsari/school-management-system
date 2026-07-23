import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class IdDto {
    @ApiProperty({
        description: 'The ID of the timetable',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly id!: string;
}