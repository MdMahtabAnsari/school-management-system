import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStaffProfileDto } from '@/staff-profile/dto/create-staff-profile.dto';
import { UpdateStaffProfileDto } from '@/staff-profile/dto/update-staff-profile.dto';

@Injectable()
export class StaffProfileRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStaffProfile(orgId: string, createStaffProfileDto: CreateStaffProfileDto) {
        const { userId, role, employeeId, firstName, lastName, department, designation, phone, email, photoUrl, dateOfBirth, gender, qualification, experienceYears, status } = createStaffProfileDto;
        return this.prisma.tx.staffProfile.create({
            data: {
                organizationId: orgId,
                userId,
                role,
                employeeId,
                firstName,
                lastName,
                department,
                designation,
                phone,
                email,
                photoUrl,
                dateOfBirth,
                gender,
                qualification,
                experienceYears,
                status,
            },
        });
    }

    async getStaffProfileById(id: string) {
        return this.prisma.tx.staffProfile.findUnique({
            where: { id },
        });
    }

    async deleteStaffProfile(id: string) {
        const deletedAt = new Date();
        return this.prisma.tx.staffProfile.update({
            where: { id },
            data: { deletedAt },
        });
    }

    async updateStaffProfile(id: string, updateStaffProfileDto: UpdateStaffProfileDto) {
        const { role, employeeId, firstName, lastName, department, designation, phone, email, photoUrl, dateOfBirth, gender, qualification, experienceYears, status } = updateStaffProfileDto;
        return this.prisma.tx.staffProfile.update({
            where: { id },
            data: {
                role,
                employeeId,
                firstName,
                lastName,
                department,
                designation,
                phone,
                email,
                photoUrl,
                dateOfBirth,
                gender,
                qualification,
                experienceYears,
                status,
            },
        });
    }

    async getStaffProfileByOrgIdAndUserId(orgId: string, userId: string) {
        return this.prisma.tx.staffProfile.findFirst({
            where: {
                organizationId: orgId,
                userId: userId,
            },
        });
    }

}
