import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID} from 'class-validator';



export class CreateClubMembershipDto {
    @ApiProperty({
        description:'Id of the student',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly studentId!: string

    @ApiProperty({
        description:'Id of the club',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly clubId!: string
}