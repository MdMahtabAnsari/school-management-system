import { Injectable,NotFoundException } from '@nestjs/common';
import { SiblingLinkRepository } from '@/sibling-link/sibling-link.repository';
import { CreateSiblingLinkDto } from '@/sibling-link/dto/create-sibling-link.dto';
import { StudentProfileService } from '@/student-profile/student-profile.service';

@Injectable()
export class SiblingLinkService {
    constructor(
        private readonly siblingLinkRepository: SiblingLinkRepository,
        private readonly studentProfileService: StudentProfileService
    ) { }

    async createSiblingLink(orgId:string, confirmedById: string, createSiblingLinkDto: CreateSiblingLinkDto) {
        const { primaryId, siblingId } = createSiblingLinkDto;
        await this.studentProfileService.getStudentProfileById(orgId, primaryId);
        await this.studentProfileService.getStudentProfileById(orgId, siblingId);
        return this.siblingLinkRepository.createSiblingLink(confirmedById, createSiblingLinkDto);
    }

    async getSiblingLinkById(id: string, orgId:string) {
        const siblingLink = await this.siblingLinkRepository.getSiblingLinkById(id);
        if (!siblingLink) {
            throw new NotFoundException(`Sibling link with id ${id} not found`);
        }
        await this.studentProfileService.getStudentProfileById(orgId, siblingLink.primaryId);
        await this.studentProfileService.getStudentProfileById(orgId, siblingLink.siblingId);
        return siblingLink;
    }
}
