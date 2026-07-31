import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID} from 'class-validator';


export class CreateHouseMembershipDto {
    @ApiProperty({
        description:'Id of the student profile',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly studentId!: string;

    @ApiProperty({
        description:'Id of the house',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly houseId!: string;
}