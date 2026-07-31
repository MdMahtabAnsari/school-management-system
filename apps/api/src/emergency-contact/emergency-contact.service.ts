import { Injectable, NotFoundException } from '@nestjs/common';
import { EmergencyContactRepository } from '@/emergency-contact/emergency-contact.repository';
import { CreateEmergencyContactDto } from '@/emergency-contact/dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from '@/emergency-contact/dto/update-emergency-contact.dto';
import { StudentProfileService } from "@/student-profile/student-profile.service";
import { Transactional } from "@nestjs-cls/transactional";

@Injectable()
export class EmergencyContactService {
    constructor(private readonly emergencyContactRepository: EmergencyContactRepository, private readonly studentProfileService: StudentProfileService) { }

    async createEmergencyContact(orgId: string, createEmergencyContactDto: CreateEmergencyContactDto) {
        await this.studentProfileService.getStudentProfileById(createEmergencyContactDto.studentId, orgId);
        const lastPriority = await this.emergencyContactRepository.getLastPriorityByStudentId(createEmergencyContactDto.studentId);
        const newPriority = lastPriority + 1;

        return this.emergencyContactRepository.createEmergencyContact(newPriority, createEmergencyContactDto);
    }

    @Transactional()
    async updateEmergencyContact(id: string, orgId: string, updateEmergencyContactDto: UpdateEmergencyContactDto) {
        const existingContact = await this.emergencyContactRepository.getEmergencyContactById(id);
        if (!existingContact) {
            throw new NotFoundException('Emergency contact not found');
        }
        await this.studentProfileService.getStudentProfileById(existingContact.studentId, orgId);
        if (updateEmergencyContactDto.priority !== undefined && updateEmergencyContactDto.priority !== existingContact.priority) {
            const target = await this.emergencyContactRepository.getEmergencyContactByStudentIdAndPriority(existingContact.studentId, updateEmergencyContactDto.priority);
            if (target) {
                await this.emergencyContactRepository.updateEmergencyContact(target.id, {
                    priority: existingContact.priority
                });
            }
        }
        return this.emergencyContactRepository.updateEmergencyContact(id, updateEmergencyContactDto);
    }

    async getEmergencyContactById(id: string, orgId: string) {
        const contact = await this.emergencyContactRepository.getEmergencyContactById(id);
        if (!contact) {
            throw new NotFoundException('Emergency contact not found');
        }
        await this.studentProfileService.getStudentProfileById(contact.studentId, orgId);
        return contact;
    }
}
