import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { CampusRepository } from '@/campus/campus.repository';
import {CreateCampusDto} from '@/campus/dto/create-campus.dto';
import {UpdateCampusDto} from '@/campus/dto/update-campus.dto';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class CampusService {
    constructor(
        private readonly campusRepository: CampusRepository
    ) { }

    async createCampus(orgId: string, createCampusDto: CreateCampusDto) {
        return this.campusRepository.createCampus(orgId, createCampusDto);
    }
    
    @Transactional()
    async updateCampus(id: string, orgId: string, updateCampusDto: UpdateCampusDto) {
        const campus = await this.campusRepository.getCampusById(id);
        if (!campus || campus.deletedAt) {
            throw new NotFoundException('Campus not found.');
        }
        if (campus.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to update this campus.');
        }
        if(updateCampusDto.isPrimary === true) {
            await this.campusRepository.nonPrimaryCampuses(orgId);
        }
        return this.campusRepository.updateCampus(id, updateCampusDto);
    }

    async getCampusById(id: string, orgId: string) {
        const campus = await this.campusRepository.getCampusById(id);
        if (!campus || campus.deletedAt) {
            throw new NotFoundException('Campus not found.');
        }
        if (campus.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to view this campus.');
        }
        return campus;
    }

    async deleteCampus(id: string, orgId: string) {
        const campus = await this.campusRepository.getCampusById(id);
        if (!campus || campus.deletedAt) {
            throw new NotFoundException('Campus not found.');
        }
        if (campus.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to delete this campus.');
        }
        return this.campusRepository.deleteCampus(id);
    }
}
