import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID,IsString} from 'class-validator';




export class CreateTimetableDto {
    @ApiProperty({
        description:'Name of your timetable',
        example:'Default Timetable'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string

    @ApiProperty({
        description:'Id of your academic year',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly academicYearId!: string
}