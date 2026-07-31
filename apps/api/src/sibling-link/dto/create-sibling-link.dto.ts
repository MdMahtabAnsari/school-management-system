import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID} from 'class-validator';


export class CreateSiblingLinkDto {
    @ApiProperty({
        description:'Id of the primary student profile',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly primaryId!: string;

    @ApiProperty({
        description:'Id of the sibling student profile',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly siblingId!: string;
}