import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsString,IsOptional} from 'class-validator';

export class CreateCampusDto {
    @ApiProperty({
        description: 'Name of the campus',
        example: 'Main Campus, Downtown Campus, etc.'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description: 'Address of the campus',
        example: '123 Main Street, City, State, ZIP',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly address?: string;
}
