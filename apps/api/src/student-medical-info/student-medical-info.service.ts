import { Injectable,NotFoundException } from '@nestjs/common';
import {StudentMedicalInfoRepository} from '@/student-medical-info/student-medical-info.repository';
import { CreateStudentMedicalInfoDto } from '@/student-medical-info/dto/create-student-medical-info.dto';
import { UpdateStudentMedicalInfoDto } from '@/student-medical-info/dto/update-student-medical-info.dto';
import {StudentProfileService} from '@/student-profile/student-profile.service';

@Injectable()
export class StudentMedicalInfoService {
    constructor(
        private readonly studentMedicalInfoRepository: StudentMedicalInfoRepository,
        private readonly studentProfileService: StudentProfileService
    ) {}

    async createStudentMedicalInfo(orgId: string, createStudentMedicalInfoDto: CreateStudentMedicalInfoDto) {
        await this.studentProfileService.getStudentProfileById(orgId, createStudentMedicalInfoDto.studentId);
        return this.studentMedicalInfoRepository.createStudentMedicalInfo(createStudentMedicalInfoDto);
    }

    async updateStudentMedicalInfo(id: string, orgId: string, updateStudentMedicalInfoDto: UpdateStudentMedicalInfoDto) {
        const existingMedicalInfo = await this.studentMedicalInfoRepository.getStudentMedicalInfoById(id);
        if (!existingMedicalInfo) {
            throw new NotFoundException('Student medical info not found');
        }
        await this.studentProfileService.getStudentProfileById(orgId, existingMedicalInfo.studentId);
        return this.studentMedicalInfoRepository.updateStudentMedicalInfo(id, updateStudentMedicalInfoDto);
    }

    async getStudentMedicalInfoById(id: string, orgId: string) {
        const existingMedicalInfo = await this.studentMedicalInfoRepository.getStudentMedicalInfoById(id);
        if (!existingMedicalInfo) {
            throw new NotFoundException('Student medical info not found');
        }
        await this.studentProfileService.getStudentProfileById(orgId, existingMedicalInfo.studentId);
        return existingMedicalInfo;
    }
}