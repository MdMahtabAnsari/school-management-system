import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsOptional,IsString} from 'class-validator';


export class CreateClubDto {
    
    @ApiProperty({
        description:'Name of your club',
        example:'Chess Club'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string

    @ApiProperty({
        description:'Description of your club',
        example:'A club for chess enthusiasts',
        required:false
    })
    @IsOptional()
    @IsString()
    readonly description?: string
}