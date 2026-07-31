import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID,IsEnum,IsString,IsUrl} from 'class-validator';
import {DocumentCategory, DocumentType} from '@workspace/db/generated/prisma/cjs/enums';

export class CreateStudentDocumentDto {

    @ApiProperty({
        description:'Id of the student profile',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly studentId!: string;

    @ApiProperty({
        description:'Category of the document',
        example:DocumentCategory.ADMISSION,
        enum:DocumentCategory
    })
    @IsNotEmpty()
    @IsEnum(DocumentCategory)
    readonly category!: DocumentCategory;

    @ApiProperty({
        description:'Type of the document',
        example:DocumentType.PDF,
        enum:DocumentType
    })
    @IsNotEmpty()
    @IsEnum(DocumentType)
    readonly type!: DocumentType;

    @ApiProperty({
        description:'Name of the document',
        example:'Admission Form'
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    @ApiProperty({
        description:'URL of the document file',
        example:'https://example.com/documents/admission-form.pdf'
    })
    @IsNotEmpty()
    @IsUrl()
    readonly fileUrl!: string;
}

export class CreateStudentDocumentRepositoryDto{
    readonly organizationId!: string;
    readonly studentId!: string;
    readonly documentId!: string;
}