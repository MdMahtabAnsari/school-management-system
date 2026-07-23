import { Injectable } from '@nestjs/common';
import { AcademicYearRepository } from '@/academic-year/academic-year.repository';
import { CreateAcademicYearDto } from '@/academic-year/dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from '@/academic-year/dto/update-academic-year.dto';
import { Transactional } from '@nestjs-cls/transactional';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AcademicYearService {
    constructor(private readonly academicYearRepository: AcademicYearRepository) { }

    async createAcademicYear(orgId: string, createAcademicYearDto: CreateAcademicYearDto) {
        return this.academicYearRepository.createAcademicYear(orgId, createAcademicYearDto);
    }

    @Transactional()
    async updateAcademicYear(id: string, orgId: string, updateAcademicYearDto: UpdateAcademicYearDto) {
        const isAcademicYearExists = await this.academicYearRepository.getAcademicYearById(id);
        if (!isAcademicYearExists || isAcademicYearExists.deletedAt) {
            throw new NotFoundException('Academic year not found.');
        }
        if (isAcademicYearExists.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to update this academic year.');
        }
        if (updateAcademicYearDto.isCurrent === undefined) {
            return this.academicYearRepository.updateAcademicYear(id, updateAcademicYearDto);
        }
        else if (updateAcademicYearDto.isCurrent === true) {
            await this.academicYearRepository.pastAcademicYears(orgId);
            return this.academicYearRepository.updateAcademicYear(id, updateAcademicYearDto);
        }
        else {
            return this.academicYearRepository.updateAcademicYear(id, updateAcademicYearDto);
        }
    }

    async deleteAcademicYear(id: string, orgId: string) {
        const isAcademicYearExists = await this.academicYearRepository.getAcademicYearById(id);
        if (!isAcademicYearExists || isAcademicYearExists.deletedAt) {
            throw new NotFoundException('Academic year not found.');
        }
        if (isAcademicYearExists.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to delete this academic year.');
        }
        return this.academicYearRepository.deleteAcademicYear(id);
    }

    async getAcademicYearById(id: string, orgId: string) {
        const isAcademicYearExists = await this.academicYearRepository.getAcademicYearById(id);
        if (!isAcademicYearExists || isAcademicYearExists.deletedAt) {
            throw new NotFoundException('Academic year not found.');
        }
        if (isAcademicYearExists.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to view this academic year.');
        }
        return isAcademicYearExists;
    }
}
