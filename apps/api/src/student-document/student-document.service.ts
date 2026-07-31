import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import {StudentDocumentRepository} from '@/student-document/student-document.repository';
import {CreateStudentDocumentDto} from '@/student-document/dto/create-student-document.dto';
import {StudentProfileService} from '@/student-profile/student-profile.service';
import {DocumentRecordRepository} from '@/document-record/document-record.repository';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class StudentDocumentService {
    constructor(
        private readonly studentDocumentRepository: StudentDocumentRepository,
        private readonly studentProfileService: StudentProfileService,
        private readonly documentRecordRepository: DocumentRecordRepository
    ) {}

    @Transactional()
    async createStudentDocument(orgId:string,uploadedById:string, createStudentDocumentDto: CreateStudentDocumentDto) {
        const { studentId, category, type, name, fileUrl } = createStudentDocumentDto;
        await this.studentProfileService.getStudentProfileById(orgId, studentId);
        const documentRecord = await this.documentRecordRepository.createDocumentRecord({
            organizationId: orgId,
            category,
            type,
            name,
            fileUrl,
            uploadedById
        });

        return this.studentDocumentRepository.createStudentDocument({
            organizationId: orgId,
            studentId,
            documentId: documentRecord.id
        });
    }

    async getStudentDocumentsById(id: string, orgId:string) {
        const studentDocument = await this.studentDocumentRepository.getStudentDocumentsById(id);
        if (!studentDocument) {
            throw new NotFoundException(`Student document with id ${id} not found`);
        }
        if(studentDocument.organizationId !== orgId){
            throw new ForbiddenException(`You do not have access to this student document`);
        }
        return studentDocument;
    }
}
