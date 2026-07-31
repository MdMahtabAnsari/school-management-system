import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsString,IsUUID,IsEnum,IsPhoneNumber,IsOptional} from 'class-validator';
import {RelationType} from '@workspace/db/generated/prisma/cjs/enums';

// model EmergencyContact {
//   id        String         @id @default(uuid())
//   studentId String
//   student   StudentProfile @relation(fields: [studentId], references: [id], onDelete: Cascade)
//   name      String
//   relation  RelationType
//   phone     String
//   altPhone  String?
//   priority  Int            @default(1)

//   @@index([studentId])
//   @@map("emergencyContact")
// }


export class CreateEmergencyContactDto {
    @ApiProperty({
        description: 'Id of the student profile',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly studentId!: string;

    @ApiProperty({
        description: 'Name of the emergency contact',
        example: 'John Doe'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description: 'Relation of the emergency contact to the student',
        example: RelationType.FATHER,
        enum: RelationType
    })
    @IsNotEmpty()
    @IsEnum(RelationType)
    readonly relation!: RelationType;

    @ApiProperty({
        description: 'Phone number of the emergency contact',
        example: '+1234567890'
    })
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone!: string;

    @ApiProperty({
        description: 'Alternate phone number of the emergency contact',
        example: '+0987654321',
        required: false
    })
    @IsOptional()
    @IsPhoneNumber()
    readonly altPhone?: string;
}