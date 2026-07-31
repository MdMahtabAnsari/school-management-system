import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { StudentTransferLogRepository } from '@/student-transfer-log/student-transfer-log.repository';
import { CreateStudentTransferLogDto } from '@/student-transfer-log/dto/create-student-transfer-log.dto';
import { UpdateStudentTransferLogDto } from '@/student-transfer-log/dto/update-student-transfer-log.dto';
import { Transactional } from '@nestjs-cls/transactional';
import { StudentEnrollmentRepository } from '@/student-enrollment/student-enrollment.repository';
import { ClassSectionRepository } from '@/class-section/class-section.repository';

@Injectable()
export class StudentTransferLogService {
    constructor(private readonly studentTransferLogRepository: StudentTransferLogRepository, private readonly studentEnrollmentRepository: StudentEnrollmentRepository, private readonly classSectionRepository: ClassSectionRepository) { }

    @Transactional()
    async createStudentTransferLog(orgId: string,transferById: string,  createStudentTransferLogDto: CreateStudentTransferLogDto) {
        if (createStudentTransferLogDto.fromClassSectionId === createStudentTransferLogDto.toClassSectionId) {
            throw new BadRequestException('Cannot transfer to the same class section');
        }

        const fromClassSection = await this.classSectionRepository.getClassSectionById(createStudentTransferLogDto.fromClassSectionId);
        const toClassSection = await this.classSectionRepository.getClassSectionById(createStudentTransferLogDto.toClassSectionId);
        const enrollment = await this.studentEnrollmentRepository.getStudentEnrollmentById(createStudentTransferLogDto.enrollmentId);

        if (!fromClassSection || !toClassSection || !enrollment) {
            throw new NotFoundException('Class section or enrollment not found');
        }
        if (enrollment.classSectionId !== createStudentTransferLogDto.fromClassSectionId) {
            throw new BadRequestException(
                'Student is not enrolled in the source class section'
            );
        }
        if (fromClassSection.organizationId !== toClassSection.organizationId || fromClassSection.organizationId !== enrollment.organizationId || enrollment.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to transfer this student');
        }
        if (toClassSection.currentCount >= toClassSection.capacity) {
            throw new BadRequestException('Target class section is full');
        }

        const studentTransferLog = await this.studentTransferLogRepository.createStudentTransferLog(transferById, createStudentTransferLogDto);

        await this.studentEnrollmentRepository.updateStudentEnrollment(createStudentTransferLogDto.enrollmentId, {
            classSectionId: createStudentTransferLogDto.toClassSectionId,
            rollNumber: createStudentTransferLogDto.toRollNumber,
        });

        await this.classSectionRepository.updateClassSection(fromClassSection.id, {
            currentCount: fromClassSection.currentCount - 1
        });

        await this.classSectionRepository.updateClassSection(toClassSection.id, {
            currentCount: toClassSection.currentCount + 1
        });

        return studentTransferLog;
    }

    async getStudentTransferLogById(id: string, orgId: string) {
        const studentTransferLog = await this.studentTransferLogRepository.getStudentTransferLogById(id);
        if (!studentTransferLog) {
            throw new NotFoundException('Student transfer log not found');
        }
        const enrollment = await this.studentEnrollmentRepository.getStudentEnrollmentById(studentTransferLog.enrollmentId);
        if (!enrollment) {
            throw new NotFoundException('Student enrollment not found');
        }
        if (enrollment.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to view this student transfer log');
        }
        return studentTransferLog;
    }
}
