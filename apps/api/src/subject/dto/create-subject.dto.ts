import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsBoolean } from 'class-validator';



export class CreateSubjectDto {
    @ApiProperty({
        description: 'Name of the subject',
        example: 'Mathematics'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description: 'Code of the subject',
        example: 'MATH101'
    })
    @IsNotEmpty()
    @IsString()
    readonly code!: string;

    @ApiProperty({
        description: 'Indicates if the subject is elective',
        example: false
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly isElective!: boolean;
}