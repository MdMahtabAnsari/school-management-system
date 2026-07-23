import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import {SubjectGroupRepository} from '@/subject-group/subject-group.repository';
import { CreateSubjectGroupDto } from '@/subject-group/dto/create-subject-group.dto';
import { UpdateSubjectGroupDto } from '@/subject-group/dto/update-subject-group.dto';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class SubjectGroupService {
  constructor(private readonly subjectGroupRepository: SubjectGroupRepository) {}

    @Transactional()
    async createSubjectGroup(orgId: string, createSubjectGroupDto: CreateSubjectGroupDto) {
        const subjectGroup = await this.subjectGroupRepository.createSubjectGroup(orgId, createSubjectGroupDto);
        if(createSubjectGroupDto.subjectIds && createSubjectGroupDto.subjectIds.length > 0) {
            await this.subjectGroupRepository.addSubjects(subjectGroup.id, createSubjectGroupDto.subjectIds);
        }
        return subjectGroup;
    }

   @Transactional()
   async updateSubjectGroup(id: string,orgId: string, updateSubjectGroupDto: UpdateSubjectGroupDto) {
    const subjectGroup = await this.subjectGroupRepository.getSubjectGroupById(id);
    if (!subjectGroup) {
        throw new NotFoundException(`Subject group with ID ${id} not found`);
    }
    if (subjectGroup.organizationId !== orgId) {
        throw new ForbiddenException(`You do not have permission to update this subject group`);
    }
    if(updateSubjectGroupDto.subjectIds && updateSubjectGroupDto.subjectIds.length > 0) {
        await this.subjectGroupRepository.removeAllSubjects(id);
        await this.subjectGroupRepository.addSubjects(id, updateSubjectGroupDto.subjectIds);

   }
   return this.subjectGroupRepository.updateSubjectGroup(id, updateSubjectGroupDto);
   }

   async getSubjectGroupById(id: string, orgId: string) {
    const subjectGroup = await this.subjectGroupRepository.getSubjectGroupById(id);
    if (!subjectGroup) {
        throw new NotFoundException(`Subject group with ID ${id} not found`);
    }
    if (subjectGroup.organizationId !== orgId) {
        throw new ForbiddenException(`You do not have permission to access this subject group`);
    }
    return subjectGroup;
   }



}
