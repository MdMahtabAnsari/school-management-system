import { Injectable,NotFoundException,ForbiddenException,BadRequestException } from '@nestjs/common';
import {StudentEnrollmentRepository} from "@/student-enrollment/student-enrollment.repository";
import {CreateStudentEnrollmentDto} from "@/student-enrollment/dto/create-student-enrollment.dto";
import {UpdateStudentEnrollmentDto} from "@/student-enrollment/dto/update-student-enrollment.dto";
import { ClassSectionRepository } from '@/class-section/class-section.repository';
import {Transactional} from "@nestjs-cls/transactional";

@Injectable()
export class StudentEnrollmentService {
    constructor(private readonly studentEnrollmentRepository: StudentEnrollmentRepository, private readonly classSectionRepository: ClassSectionRepository) {}

    @Transactional()
    async createStudentEnrollment(orgId: string, createStudentEnrollmentDto: CreateStudentEnrollmentDto) {
        const classSection = await this.classSectionRepository.getClassSectionById(createStudentEnrollmentDto.classSectionId);
        if (!classSection || classSection.deletedAt) {
            throw new NotFoundException('Class section not found');
        }
        if (classSection.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to enroll a student in this class section');
        }
        if(classSection.currentCount >= classSection.capacity) {
            throw new BadRequestException('Class section is full');
        }

        await this.classSectionRepository.updateClassSection(classSection.id, {
            currentCount: classSection.currentCount + 1
        });

        return this.studentEnrollmentRepository.createStudentEnrollment(orgId, createStudentEnrollmentDto);
    }

    async updateStudentEnrollment(id: string, orgId:string, updateStudentEnrollmentDto: UpdateStudentEnrollmentDto) {
        const existingEnrollment = await this.studentEnrollmentRepository.getStudentEnrollmentById(id);
        if (!existingEnrollment) {
            throw new NotFoundException('Student enrollment not found');
        }
        if (existingEnrollment.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to update this student enrollment');
        }
        return this.studentEnrollmentRepository.updateStudentEnrollment(id, updateStudentEnrollmentDto);
    }

    async getStudentEnrollmentById(id: string, orgId:string) {
        const existingEnrollment = await this.studentEnrollmentRepository.getStudentEnrollmentById(id);
        if (!existingEnrollment) {
            throw new NotFoundException('Student enrollment not found');
        }
        if (existingEnrollment.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to view this student enrollment');
        }
        return existingEnrollment;
    }
}
