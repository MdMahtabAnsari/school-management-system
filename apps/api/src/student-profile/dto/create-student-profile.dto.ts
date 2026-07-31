import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator'
import { Gender, BloodGroup, StudentStatus } from '@workspace/db/generated/prisma/cjs/enums';




export class CreateStudentProfileDto {

    @ApiProperty({
        description: 'User ID associated with the student profile',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsNotEmpty()
    @IsString()
    readonly userId!: string;

    @ApiProperty({
        description: 'Admission number of the student',
        example: 'A12345',
    })
    @IsNotEmpty()
    @IsString()
    readonly admissionNumber!: string;

    @ApiProperty({
        description: 'First name of the student',
        example: 'John',
    })
    @IsNotEmpty()
    @IsString()
    readonly firstName!: string;

    @ApiProperty({
        description: 'Last name of the student',
        example: 'Doe',
    })
    @IsNotEmpty()
    @IsString()
    readonly lastName!: string;

    @ApiProperty({
        description: 'Date of birth of the student',
        example: '2005-06-15',
    })
    @IsNotEmpty()
    @IsDateString()
    readonly dateOfBirth!: string;

    @ApiProperty({
        description: 'Gender of the student',
        example: Gender.MALE,
        enum: Gender,
    })
    @IsNotEmpty()
    @IsEnum(Gender)
    readonly gender!: Gender;

    @ApiProperty({
        description: 'Blood group of the student',
        example: BloodGroup.A_POS,
        enum: BloodGroup,
        required: false,
    })
    @IsOptional()
    @IsEnum(BloodGroup)
    readonly bloodGroup?: BloodGroup;

    @ApiProperty({
        description: 'National ID (masked) of the student',
        example: 'XXXX-XXXX-1234',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly nationalIdMasked?: string;

    @ApiProperty({
        description: 'Category of the student (e.g., General, OBC, SC, ST, EWS)',
        example: 'General',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly category?: string;

    @ApiProperty({
        description: 'Religion of the student',
        example: 'Christianity',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly religion?: string;

    @ApiProperty({
        description: 'Caste of the student',
        example: 'N/A',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly caste?: string;

    @ApiProperty({
        description: 'Photo URL of the student',
        example: 'https://example.com/photos/john_doe.jpg',
        required: false,
    })
    @IsOptional()
    @IsUrl()
    readonly photoUrl?: string;

    @ApiProperty({
        description: 'Previous school attended by the student',
        example: 'Springfield High School',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly previousSchool?: string;

    @ApiProperty({
        description: 'Status of the student',
        example: StudentStatus.ACTIVE,
        enum: StudentStatus,
    })
    @IsNotEmpty()
    @IsEnum(StudentStatus)
    readonly status!: StudentStatus;

}


