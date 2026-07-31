import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsPhoneNumber, IsUrl, IsDateString, IsEnum, IsInt, IsUUID, Min } from "class-validator";
import { SchoolRole, Gender, EmploymentStatus } from '@workspace/db/generated/prisma/cjs/enums';
import { Type } from "class-transformer";



export class CreateStaffProfileDto {


    @ApiProperty({
        description: 'The ID of the user associated with the staff profile',
        example: '550e8400-e29b-41d4-a716-446655440001'
    })
    @IsNotEmpty()
    @IsString()
    userId!: string;

    @ApiProperty({
        description: 'The role of the staff member in the school',
        enum: SchoolRole,
        example: SchoolRole.TEACHER
    })
    @IsNotEmpty()
    @IsEnum(SchoolRole)
    role!: SchoolRole;

    @ApiProperty({
        description: 'The employee ID assigned to the staff member',
        example: 'EMP12345'
    })
    @IsNotEmpty()
    @IsString()
    employeeId!: string;

    @ApiProperty({
        description: 'The first name of the staff member',
        example: 'John'
    })
    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @ApiProperty({
        description: 'The last name of the staff member',
        example: 'Doe'
    })
    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @ApiProperty({
        description: 'The department the staff member belongs to',
        example: 'Academics',
        required: false
    })
    @IsOptional()
    @IsString()
    department?: string;

    @ApiProperty({
        description: 'The designation of the staff member',
        example: 'Senior Teacher',
        required: false
    })
    @IsOptional()
    @IsString()
    designation?: string;

    @ApiProperty({
        description: 'The phone number of the staff member',
        example: '+1234567890'
    })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone!: string;

    @ApiProperty({
        description: 'The email address of the staff member',
        example: 'john.doe@example.com',
        required: false
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'The URL of the staff member\'s photo',
        example: 'https://example.com/photos/john_doe.jpg',
        required: false
    })
    @IsOptional()
    @IsUrl()
    photoUrl?: string;

    @ApiProperty({
        description: 'The date of birth of the staff member',
        example: '1980-01-01',
        required: false
    })
    @IsOptional()
    @IsDateString()
    dateOfBirth?: string;

    @ApiProperty({
        description: 'The gender of the staff member',
        enum: Gender,
        example: Gender.MALE,
        required: false
    })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @ApiProperty({
        description: 'The qualification of the staff member',
        example: 'M.Sc. in Mathematics',
        required: false
    })
    @IsOptional()
    @IsString()
    qualification?: string;

    @ApiProperty({
        description: 'The number of years of experience the staff member has',
        example: 10,
        required: false
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    experienceYears?: number;

    @ApiProperty({
        description: 'The employment status of the staff member',
        enum: EmploymentStatus,
        example: EmploymentStatus.ACTIVE
    })
    @IsEnum(EmploymentStatus)
    @IsNotEmpty()
    status!: EmploymentStatus;
}