import {DocumentCategory,DocumentType} from '@workspace/db/generated/prisma/cjs/enums';


export class CreateDocumentRecordDto {
    readonly organizationId!: string;
    readonly category!: DocumentCategory;
    readonly type!: DocumentType;
    readonly name!: string;
    readonly fileUrl!: string;
    readonly uploadedById!: string;
}