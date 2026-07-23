import {ApiProperty} from '@nestjs/swagger';
import {IsString,IsNotEmpty,IsOptional,IsDateString,IsUUID,IsBoolean} from 'class-validator';



export class CreateHolidayDto {
    

    @ApiProperty({
        description:'Id of your academic year',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28',
        required:false
    })
    @IsOptional()
    @IsUUID()
    readonly academicYearId?: string

    @ApiProperty({
        description:'Name of your holiday',
        example:'New Year'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string

    @ApiProperty({
        description:'Date of your holiday',
        example:'2023-01-01'
    })
    @IsNotEmpty()
    @IsDateString()
    readonly date!: string

    @ApiProperty({
        description:'Is this holiday a working day?',
        example:false,
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly isWorkingDay!: boolean
}