import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStudentProfileDto } from '@/student-profile/dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from '@/student-profile/dto/update-student-profile.dto';


@Injectable()
export class StudentProfileRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStudentProfile(orgId: string,createdById:string, createStudentProfileDto: CreateStudentProfileDto) {
        const { userId, admissionNumber, firstName, lastName, dateOfBirth, gender, bloodGroup, nationalIdMasked, category, religion, caste, photoUrl, previousSchool, status } = createStudentProfileDto;

        return this.prisma.tx.studentProfile.create({
            data: {
                organizationId: orgId,
                userId,
                admissionNumber,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                bloodGroup,
                nationalIdMasked,
                category,
                religion,
                caste,
                photoUrl,
                previousSchool,
                status,
                createdById,
            },
        });
    }

    async updateStudentProfile(id: string,updatedById:string, updateStudentProfileDto: UpdateStudentProfileDto) {
        const { userId, admissionNumber, firstName, lastName, dateOfBirth, gender, bloodGroup, nationalIdMasked, category, religion, caste, photoUrl, previousSchool, status } = updateStudentProfileDto;

        return this.prisma.tx.studentProfile.update({
            where: { id },
            data: {
                userId,
                admissionNumber,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                bloodGroup,
                nationalIdMasked,
                category,
                religion,
                caste,
                photoUrl,
                previousSchool,
                status,
                updatedById,
            },
        });
    }

    async getStudentProfileById(id: string) {
        return this.prisma.tx.studentProfile.findUnique({
            where: { id },
        });
    }
}
