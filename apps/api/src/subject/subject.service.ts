import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { SubjectRepository } from '@/subject/subject.repository';
import { CreateSubjectDto } from '@/subject/dto/create-subject.dto';
import { UpdateSubjectDto } from '@/subject/dto/update-subject.dto';

@Injectable()
export class SubjectService {
    constructor(private readonly subjectRepository: SubjectRepository) {}

    async createSubject(orgId: string, createSubjectDto: CreateSubjectDto) {
        return this.subjectRepository.createSubject(orgId, createSubjectDto);
    }

    async updateSubject(id: string, orgId: string, updateSubjectDto: UpdateSubjectDto) {
        const isSubjectExists = await this.subjectRepository.getSubjectById(id);
        if (!isSubjectExists || isSubjectExists.deletedAt) {
            throw new NotFoundException(`Subject with ID ${id} not found`);
        }
        if (isSubjectExists.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have permission to update this subject`);
        }

        return this.subjectRepository.updateSubject(id, updateSubjectDto);
    }

    async getSubjectById(id: string, orgId: string) {
        const subject = await this.subjectRepository.getSubjectById(id);
        if (!subject || subject.deletedAt) {
            throw new NotFoundException(`Subject with ID ${id} not found`);
        }
        if (subject.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have permission to access this subject`);
        }
        return subject;
    }

    async deleteSubject(id: string, orgId: string) {
        const isSubjectExists = await this.subjectRepository.getSubjectById(id);
        if (!isSubjectExists || isSubjectExists.deletedAt) {
            throw new NotFoundException(`Subject with ID ${id} not found`);
        }
        if (isSubjectExists.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have permission to delete this subject`);
        }
        return this.subjectRepository.deleteSubject(id);
    }
}
