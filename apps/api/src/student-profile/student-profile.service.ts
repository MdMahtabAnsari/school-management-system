import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import {StudentProfileRepository} from "@/student-profile/student-profile.repository";
import {CreateStudentProfileDto} from "@/student-profile/dto/create-student-profile.dto";
import {UpdateStudentProfileDto} from "@/student-profile/dto/update-student-profile.dto";

@Injectable()
export class StudentProfileService {
  constructor(private readonly studentProfileRepository: StudentProfileRepository) {}

    async createStudentProfile(orgId: string, createdById: string, createStudentProfileDto: CreateStudentProfileDto) {
        return this.studentProfileRepository.createStudentProfile(orgId, createdById, createStudentProfileDto);
    }

    async updateStudentProfile(id: string, orgId:string, updatedById: string, updateStudentProfileDto: UpdateStudentProfileDto) {
        const existingProfile = await this.studentProfileRepository.getStudentProfileById(id);
        if (!existingProfile) {
            throw new NotFoundException('Student profile not found');
        }
        if (existingProfile.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to update this student profile');
        }
        return this.studentProfileRepository.updateStudentProfile(id, updatedById, updateStudentProfileDto);
    }

    async getStudentProfileById(id: string, orgId:string) {
        const existingProfile = await this.studentProfileRepository.getStudentProfileById(id);
        if (!existingProfile || existingProfile.deletedAt) {
            throw new NotFoundException('Student profile not found');
        }
        if (existingProfile.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to view this student profile');
        }
        return existingProfile;
    }
}
