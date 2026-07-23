import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsUUID,IsBoolean } from 'class-validator';



export class CreateSubjectGroupDto {
    @ApiProperty({
        description: 'Name of the subject group',
        example: 'Science Group, Arts Group, etc.'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description: 'List of subject IDs associated with the subject group',
        example: ['d8c36158-1182-42a4-817d-74cfc5d7bc28', 'e9c36158-1182-42a4-817d-74cfc5d7bc29'],
        required: false
    })
    @IsOptional()
    @IsArray()
    readonly subjectIds?: string[];


    @ApiProperty({
        description: 'ID of the class section associated with the subject group',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly classSectionId!: string;

    @ApiProperty({
        description: 'Indicates if the subject group is elective',
        example: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly isElectiveGroup!: boolean;
}