import { Injectable,NotFoundException } from '@nestjs/common';
import { StudentGuardianRepository } from '@/student-guardian/student-guardian.repository';
import { CreateStudentGuardianDto } from '@/student-guardian/dto/create-student-guardian.dto';
import {StudentProfileService} from '@/student-profile/student-profile.service';
import {GuardianService} from '@/guardian/guardian.service';

@Injectable()
export class StudentGuardianService {
    constructor(
        private readonly studentGuardianRepository: StudentGuardianRepository,
        private readonly studentProfileService: StudentProfileService,
        private readonly guardianService: GuardianService
    ) {}

    async createStudentGuardian(orgId: string, createStudentGuardianDto: CreateStudentGuardianDto) {
        const { studentId, guardianId } = createStudentGuardianDto;
        await this.studentProfileService.getStudentProfileById(studentId, orgId);
        await this.guardianService.getGuardianById(guardianId, orgId);
        return this.studentGuardianRepository.createStudentGuardian(createStudentGuardianDto);
    }

    async getStudentGuardianById(id: string,orgId: string) {
        const studentGuardian = await this.studentGuardianRepository.getStudentGuardianById(id);
        if (!studentGuardian) {
            throw new NotFoundException(`Student Guardian with id ${id} not found`);
        }
        await this.studentProfileService.getStudentProfileById(id, orgId);
        return studentGuardian;
    }
}
