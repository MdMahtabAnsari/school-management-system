import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TermRepository } from '@/term/term.repository';
import { CreateTermDto } from '@/term/dto/create-term.dto';
import { UpdateTermDto } from '@/term/dto/update-term.dto';

@Injectable()
export class TermService {
    constructor(
        private readonly termRepository: TermRepository
    ) { }

    async createTerm(orgId: string, createTermDto: CreateTermDto) {
        return this.termRepository.createTerm(orgId, createTermDto);
    }

    async updateTerm(id: string, orgId: string, updateTermDto: UpdateTermDto) {
        const isTermExists = await this.termRepository.getTermById(id);
        if (!isTermExists) {
            throw new NotFoundException(`Term with ID ${id} not found`);
        }
        if (isTermExists.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have permission to update this term`);
        }

        return this.termRepository.updateTerm(id, updateTermDto);
    }

    async getTermById(id: string, orgId: string) {
        const term = await this.termRepository.getTermById(id);
        if (!term) {
            throw new NotFoundException(`Term with ID ${id} not found`);
        }
        if (term.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have permission to access this term`);
        }

        return term;
    }



}
