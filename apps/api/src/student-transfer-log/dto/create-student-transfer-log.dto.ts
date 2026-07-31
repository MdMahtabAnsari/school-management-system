import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString,IsUUID,IsOptional} from "class-validator";




export class CreateStudentTransferLogDto {
    @ApiProperty({
        description: 'Id of student enrollment',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly enrollmentId!: string;

    @ApiProperty({
        description: 'Id of the class section from which the student is being transferred',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly fromClassSectionId!: string;

    @ApiProperty({
        description: 'Id of the class section to which the student is being transferred',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly toClassSectionId!: string;

    @ApiProperty({
        description: 'Roll number of the student in the class section from which they are being transferred',
        example: 'A123'
    })
    @IsNotEmpty()
    @IsString()
    readonly fromRollNumber!: string;

    @ApiProperty({
        description: 'Roll number of the student in the class section to which they are being transferred',
        example: 'B456'
    })
    @IsNotEmpty()
    @IsString()
    readonly toRollNumber!: string;

    @ApiProperty({
        description: 'Reason for transferring the student',
        example: 'Change of residence',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly reason?: string;
}