import {ApiProperty} from '@nestjs/swagger';
import {IsString,IsOptional} from 'class-validator';


export class SignedUploadUrlOptionsDto {
    @ApiProperty({
        description: 'The folder in which the file will be uploaded',
        example: 'my-folder',
        required: false,
    })
    @IsOptional()
    @IsString()
    folder?: string;

    @ApiProperty({
        description: 'The eager transformations to be applied to the file',
        example: 'c_scale,w_200',
        required: false,
    })
    @IsOptional()
    @IsString()
    eager?: string;
}