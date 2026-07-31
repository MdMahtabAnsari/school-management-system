import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, IsEnum, IsOptional,IsUrl} from "class-validator";
import {CertificateFileType} from "@workspace/db/generated/prisma/cjs/enums";

// model Certificate {
//   id             String         @id @default(uuid())
//   organizationId String
//   studentId      String
//   student        StudentProfile @relation(fields: [studentId], references: [id], onDelete: Cascade)
//   type           String // "TRANSFER_CERTIFICATE" | "LEAVING_CERTIFICATE" | "BONAFIDE" | etc
//   serialNumber   String
//   issuedAt       DateTime       @default(now())
//   issuedBy       String?
//   fileUrl        String?
//   fileType       CertificateFileType?

//   @@unique([organizationId, type, serialNumber])
//   @@index([studentId])
//   @@map("certificate")
// }

export class CreateCertificateDto {


    @ApiProperty({
        description: 'Id of the student profile',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsString()
    readonly studentId!: string;

    @ApiProperty({
        description: 'Type of the certificate',
        example: 'TRANSFER_CERTIFICATE'
    })
    @IsNotEmpty()
    @IsString()
    readonly type!: string;

    @ApiProperty({
        description: 'Serial number of the certificate',
        example: 'TC-2023-001'
    })
    @IsNotEmpty()
    @IsString()
    readonly serialNumber!: string;


    @ApiProperty({
        description: 'URL of the certificate file',
        example: 'https://example.com/certificates/tc-2023-001.pdf',
        required: false
    })
    @IsOptional()
    @IsUrl()
    readonly fileUrl?: string;

    @ApiProperty({
        description: 'Type of the certificate file',
        example: CertificateFileType.PDF,
        enum: CertificateFileType
    })
    @IsOptional()
    @IsEnum(CertificateFileType)
    readonly fileType?: CertificateFileType;
}