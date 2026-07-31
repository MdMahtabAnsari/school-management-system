import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { GuardianRepository } from '@/guardian/guardian.repository';
import { CreateGuardianDto } from '@/guardian/dto/create-guardian.dto';
import { UpdateGuardianDto } from '@/guardian/dto/update-guardian.dto';

@Injectable()
export class GuardianService {
    constructor(private readonly guardianRepository: GuardianRepository) {}

    async createGuardian(orgId:string,createGuardianDto: CreateGuardianDto) {
        return this.guardianRepository.createGuardian(orgId,createGuardianDto);
    }

    async updateGuardian(id: string,orgId: string, updateGuardianDto: UpdateGuardianDto) {
        const isGuardianExist = await this.guardianRepository.getGuardianById(id);
        if (!isGuardianExist || isGuardianExist.deletedAt) {
            throw new NotFoundException(`Guardian with id ${id} not found`);
        }
        if(isGuardianExist.organizationId !== orgId){
            throw new ForbiddenException(`You are not allowed to update this guardian`);
        }
        return this.guardianRepository.updateGuardian(id, updateGuardianDto);
    }

    async deleteGuardian(id: string,orgId: string) {
        const isGuardianExist = await this.guardianRepository.getGuardianById(id);
        if (!isGuardianExist || isGuardianExist.deletedAt) {
            throw new NotFoundException(`Guardian with id ${id} not found`);
        }
        if(isGuardianExist.organizationId !== orgId){
            throw new ForbiddenException(`You are not allowed to delete this guardian`);
        }
        return this.guardianRepository.deleteGuardian(id);
    }

    async getGuardianById(id: string,orgId: string) {
        const isGuardianExist = await this.guardianRepository.getGuardianById(id);
        if (!isGuardianExist || isGuardianExist.deletedAt) {
            throw new NotFoundException(`Guardian with id ${id} not found`);
        }
        if(isGuardianExist.organizationId !== orgId){
            throw new ForbiddenException(`You are not allowed to view this guardian`);
        }
        return isGuardianExist;
    }
}
