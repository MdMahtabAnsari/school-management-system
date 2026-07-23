import {ApiProperty} from '@nestjs/swagger';
import {IsUUID,IsNotEmpty} from 'class-validator';

export class IdDto {
    @ApiProperty({
        description:'Id of your subject',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly id!: string
}