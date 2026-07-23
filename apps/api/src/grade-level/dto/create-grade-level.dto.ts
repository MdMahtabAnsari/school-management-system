import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, IsNotEmpty, IsInt, Min,IsOptional } from 'class-validator';

export class CreateGradeLevelDto {
    @ApiProperty({
        description: 'Board ID associated with the grade',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false
    })
    @IsUUID()
    @IsOptional()
    readonly boardId?: string;

    @ApiProperty({
        description: 'Name of the grade',
        example: 'Nursery, LKG, UKG, 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description: 'Stage of the grade',
        example: 'Primary, Secondary, Higher Secondary',
        required: false
    })
    @IsString()
    @IsOptional()
    readonly stageLabel?: string;
}