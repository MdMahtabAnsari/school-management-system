import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { StaffDocumentRepository } from '@/staff-document/staff-document.repository';
import { CreateStaffDocumentDto } from '@/staff-document/dto/create-staff-document.dto';
import { StaffProfileService } from '@/staff-profile/staff-profile.service';
import { Transactional } from '@nestjs-cls/transactional';
import {DocumentRecordRepository} from '@/document-record/document-record.repository';

@Injectable()
export class StaffDocumentService {
    constructor(
        private readonly staffDocumentRepository: StaffDocumentRepository,
        private readonly staffProfileService: StaffProfileService,
        private readonly documentRecordRepository: DocumentRecordRepository
    ) { }

    @Transactional()
    async createStaffDocument(orgId: string,uploadedById: string, createStaffDocumentDto: CreateStaffDocumentDto) {
        const { staffId, category, type, name, fileUrl } = createStaffDocumentDto;
        await this.staffProfileService.getStaffProfileById(staffId, orgId);
        const documentRecord = await this.documentRecordRepository.createDocumentRecord({
            organizationId: orgId,
            category,
            type,
            name,
            fileUrl,
            uploadedById
        });

        return this.staffDocumentRepository.createStaffDocument({
            organizationId: orgId,
            staffId,
            documentId: documentRecord.id
        });
    }

    async getStaffDocumentsById(id: string, orgId: string) {
        const staffDocument = await this.staffDocumentRepository.getStaffDocumentById(id);
        if (!staffDocument) {
            throw new NotFoundException(`Staff document with id ${id} not found`);
        }
        if(staffDocument.organizationId !== orgId){
            throw new ForbiddenException(`You do not have access to this staff document`);
        }
        return staffDocument;
    }
}
