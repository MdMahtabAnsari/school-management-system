import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID,IsOptional,IsString,IsPhoneNumber} from 'class-validator';

// model StudentMedicalInfo {
//   id                String         @id @default(uuid())
//   studentId         String         @unique
//   student           StudentProfile @relation(fields: [studentId], references: [id], onDelete: Cascade)
//   allergies         String?
//   chronicConditions String?
//   medications       String?
//   doctorName        String?
//   doctorPhone       String?
//   insuranceInfo     String?
//   updatedAt         DateTime       @updatedAt

//   @@map("studentMedicalInfo")
// }

export class CreateStudentMedicalInfoDto {
    @ApiProperty({
        description: 'Id of the student profile',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly studentId!: string;

    @ApiProperty({
        description: 'Allergies of the student',
        example: 'Peanuts, Shellfish',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly allergies?: string;

    @ApiProperty({
        description: 'Chronic conditions of the student',
        example: 'Asthma, Diabetes',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly chronicConditions?: string;

    @ApiProperty({
        description: 'Medications of the student',
        example: 'Albuterol, Insulin',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly medications?: string;

    @ApiProperty({
        description: 'Name of the student\'s doctor',
        example: 'Dr. John Smith',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly doctorName?: string;

    @ApiProperty({
        description: 'Phone number of the student\'s doctor',
        example: '+1234567890',
        required: false
    })
    @IsOptional()
    @IsPhoneNumber()
    readonly doctorPhone?: string;

    @ApiProperty({
        description: 'Insurance information of the student',
        example: 'Blue Cross Blue Shield, Policy #123456789',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly insuranceInfo?: string;
}   