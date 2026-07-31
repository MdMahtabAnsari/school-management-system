import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateEmergencyContactDto } from '@/emergency-contact/dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from '@/emergency-contact/dto/update-emergency-contact.dto';

@Injectable()
export class EmergencyContactRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createEmergencyContact(priority: number, createEmergencyContactDto: CreateEmergencyContactDto) {
        const { name, relation, phone, altPhone,studentId } = createEmergencyContactDto;

        return this.prisma.tx.emergencyContact.create({
            data: {
                name,
                relation,
                phone,
                altPhone,
                studentId,
                priority
            },
        });
    }

    async updateEmergencyContact(id: string, updateEmergencyContactDto: UpdateEmergencyContactDto) {
        const { name, relation, phone, altPhone,priority } = updateEmergencyContactDto;

        return this.prisma.tx.emergencyContact.update({
            where: { id },
            data: {
                name,
                relation,
                phone,
                altPhone,
                priority
            },
        });
    }

    async getEmergencyContactById(id: string) {
        return this.prisma.tx.emergencyContact.findUnique({
            where: { id },
        });
    }

    async getLastPriorityByStudentId(studentId: string) {
        const lastPriorityContact = await this.prisma.tx.emergencyContact.findFirst({
            where: { studentId },
            orderBy: { priority: 'desc' },
        });

        return lastPriorityContact ? lastPriorityContact.priority : 0;
    }

    async getEmergencyContactByStudentIdAndPriority(studentId: string, priority: number) {
        return this.prisma.tx.emergencyContact.findFirst({
            where: { studentId, priority },
        });
    }
}