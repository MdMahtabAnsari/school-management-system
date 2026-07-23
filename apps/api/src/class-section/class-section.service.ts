import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import {ClassSectionRepository} from '@/class-section/class-section.repository';
import {CreateClassSectionDto} from '@/class-section/dto/create-class-section.dto';
import {UpdateClassSectionDto} from '@/class-section/dto/update-class-section.dto';

@Injectable()
export class ClassSectionService {
  constructor(private readonly classSectionRepository: ClassSectionRepository) {}

    async createClassSection(orgId: string, createClassSectionDto: CreateClassSectionDto) {
        return this.classSectionRepository.createClassSection(orgId, createClassSectionDto);
    }

    async updateClassSection(id: string, orgId: string, updateClassSectionDto: UpdateClassSectionDto) {
        const isClassSectionExists = await this.classSectionRepository.getClassSectionById(id);
        if (!isClassSectionExists || isClassSectionExists.deletedAt) {
            throw new NotFoundException(`Class section with ID ${id} not found`);
        }
        if (isClassSectionExists.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have permission to update this class section`);
        }
        return this.classSectionRepository.updateClassSection(id, updateClassSectionDto);
    }

    async getClassSectionById(id: string, orgId: string) {
        const classSection = await this.classSectionRepository.getClassSectionById(id);
        if (!classSection || classSection.deletedAt) {
            throw new NotFoundException(`Class section with ID ${id} not found`);
        }
        if (classSection.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have permission to access this class section`);
        }

        return classSection;
    }

    async deleteClassSection(id: string, orgId: string) {
        const isClassSectionExists = await this.classSectionRepository.getClassSectionById(id);
        if (!isClassSectionExists || isClassSectionExists.deletedAt) {
            throw new NotFoundException(`Class section with ID ${id} not found`);
        }
        if (isClassSectionExists.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have permission to delete this class section`);
        }
        return this.classSectionRepository.deleteClassSection(id);
    }
}
