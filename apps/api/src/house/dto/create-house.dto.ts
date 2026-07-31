import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsString,IsOptional,IsHexColor} from 'class-validator';


export class CreateHouseDto {
    @ApiProperty({
        description:'Name of the house',
        example:'Red House'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description:'Color code of the house',
        example:'#FF0000'
    })
    @IsOptional()
    @IsHexColor()
    readonly colorCode?: string;
}