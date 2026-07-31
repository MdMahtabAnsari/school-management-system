import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
    IsEnum
} from 'class-validator';
import { CreateStudentEnrollmentDto } from '@/student-enrollment/dto/create-student-enrollment.dto';
import { EnrollmentStatus } from '@workspace/db/generated/prisma/cjs/enums';

export class CreateStudentPromotionDto {
    @ApiProperty({
        description: 'Id of the student enrollment from which the student is being promoted',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28',
    })
    @IsNotEmpty()
    @IsUUID()
    readonly fromEnrollmentId!: string;

    @ApiProperty({
        description: 'Enrollment details for the promoted student',
        type: CreateStudentEnrollmentDto,
        required: false,
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateStudentEnrollmentDto)
    readonly toEnrollment?: CreateStudentEnrollmentDto;

    @ApiProperty({
        description: 'Outcome of the promotion',
        example: EnrollmentStatus.PROMOTED,
        enum: EnrollmentStatus
    })
    @IsNotEmpty()
    @IsEnum(EnrollmentStatus)
    readonly outcome!: EnrollmentStatus;

    @ApiProperty({
        description: 'Remarks regarding the promotion',
        example: 'Student has shown excellent performance and is promoted to the next class.',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly remarks?: string;
}

export class CreateStudentPromotionRepositoryDto extends OmitType(
    CreateStudentPromotionDto,
    ['toEnrollment'],
) {
    @ApiProperty({
        description: 'Id of the student enrollment to which the student is being promoted',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    readonly toEnrollmentId?: string;
}