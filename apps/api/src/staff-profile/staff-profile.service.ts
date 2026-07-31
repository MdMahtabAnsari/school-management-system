import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import {StaffProfileRepository} from '@/staff-profile/staff-profile.repository';
import {CreateStaffProfileDto} from '@/staff-profile/dto/create-staff-profile.dto';
import {UpdateStaffProfileDto} from '@/staff-profile/dto/update-staff-profile.dto';
    

@Injectable()
export class StaffProfileService {
    constructor(private readonly staffProfileRepository: StaffProfileRepository) {}

    async createStaffProfile(orgId: string, createStaffProfileDto: CreateStaffProfileDto) {
        return this.staffProfileRepository.createStaffProfile(orgId, createStaffProfileDto);
    }

    async getStaffProfileById(id: string, orgId: string) {
        const staffProfile = await this.staffProfileRepository.getStaffProfileById(id);
        if(!staffProfile || staffProfile.deletedAt) {
            throw new NotFoundException('Staff profile not found');
        }
        if(staffProfile.organizationId !== orgId) {
            throw new ForbiddenException('You do not have access to this staff profile');
        }
        return staffProfile;
    }

    async deleteStaffProfile(id: string, orgId: string) {
        const staffProfile = await this.staffProfileRepository.getStaffProfileById(id);
        if(!staffProfile || staffProfile.deletedAt) {
            throw new NotFoundException('Staff profile not found');
        }
        if(staffProfile.organizationId !== orgId) {
            throw new ForbiddenException('You do not have access to this staff profile');
        }
        return this.staffProfileRepository.deleteStaffProfile(id);
    }

    async updateStaffProfile(id: string, orgId: string, updateStaffProfileDto: UpdateStaffProfileDto) {
        const staffProfile = await this.staffProfileRepository.getStaffProfileById(id);
        if(!staffProfile || staffProfile.deletedAt) {
            throw new NotFoundException('Staff profile not found');
        }
        if(staffProfile.organizationId !== orgId) {
            throw new ForbiddenException('You do not have access to this staff profile');
        }
        return this.staffProfileRepository.updateStaffProfile(id, updateStaffProfileDto);
    }
}
