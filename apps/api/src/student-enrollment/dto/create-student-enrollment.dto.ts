import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID,IsEnum } from "class-validator";
import { EnrollmentStatus } from '@workspace/db/generated/prisma/cjs/enums';


export class CreateStudentEnrollmentDto {
    @ApiProperty({
        description: 'ID of the student profile',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID()
    @IsNotEmpty()
    readonly studentId!: string;

    @ApiProperty({
        description: 'ID of the academic year',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID()
    @IsNotEmpty()
    readonly academicYearId!: string;

    @ApiProperty({
        description: 'ID of the class section',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID()
    @IsNotEmpty()
    readonly classSectionId!: string;

    @ApiProperty({
        description: 'Roll number of the student',
        example: 'S001'
    })
    @IsString()
    @IsNotEmpty()
    readonly rollNumber!: string;

    @ApiProperty({
        description: 'Status of the enrollment',
        example: EnrollmentStatus.ACTIVE,
        enum: EnrollmentStatus
    })
    @IsEnum(EnrollmentStatus)
    @IsNotEmpty()
    readonly status!: EnrollmentStatus;
}
