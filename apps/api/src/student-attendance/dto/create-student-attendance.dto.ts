import {ApiProperty} from "@nestjs/swagger";
import {IsUUID, IsDateString, IsEnum, IsOptional,IsString,IsNotEmpty,IsTimeZone} from "class-validator";
import {AttendanceStatus} from "@workspace/db/generated/prisma/cjs/enums";




export class CreateStudentAttendanceDto {
   
    @ApiProperty({
        description: 'The ID of the student',
        example: '550e8400-e29b-41d4-a716-446655440001',
     })
    @IsNotEmpty()
    @IsUUID()
    readonly studentId!: string;

    @ApiProperty({
        description: 'The date of attendance in YYYY-MM-DD format',
        example: '2023-09-15',
     })
    @IsNotEmpty()
    @IsDateString()
    readonly date!: string;

    @ApiProperty({
        description: 'The attendance status (e.g., PRESENT, ABSENT, LATE)',
        example: AttendanceStatus.PRESENT,
        enum: AttendanceStatus,
     })
    @IsNotEmpty()
    @IsEnum(AttendanceStatus)
    readonly status!: AttendanceStatus;

    @ApiProperty({
        description: 'The ID of the period (optional, for period-level attendance)',
        example: '550e8400-e29b-41d4-a716-446655440002',
        required: false,
     })
    @IsOptional()
    @IsUUID()
    readonly periodId?: string;



    @ApiProperty({
        description: 'Additional remarks or comments about the attendance (optional)',
        example: 'Student was late due to traffic.',
        required: false,
     })
    @IsOptional()
    @IsString()
    readonly remarks?: string;

    @ApiProperty({
        description: 'The time zone of the attendance record',
        example: 'America/New_York',
        required: false,
     })
    @IsNotEmpty()
    @IsTimeZone()
    readonly timeZone!: string;
}