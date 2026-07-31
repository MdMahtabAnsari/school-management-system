import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateGuardianDto } from '@/guardian/dto/create-guardian.dto';
import { UpdateGuardianDto } from '@/guardian/dto/update-guardian.dto';

@Injectable()
export class GuardianRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createGuardian(orgId:string,createGuardianDto: CreateGuardianDto) {
        const { userId, firstName, lastName, phone, altPhone, email, occupation,annualIncome,address,city,state,pincode,photoUrl,preferredChannel } = createGuardianDto;
        return this.prisma.tx.guardian.create({
            data: {
                userId,
                firstName,
                lastName,
                phone,
                altPhone,
                email,
                occupation,
                annualIncome,
                address,
                city,
                state,
                pincode,
                photoUrl,
                preferredChannel,
                organizationId: orgId
            },
        });
    }

    async updateGuardian(id: string, updateGuardianDto: UpdateGuardianDto) {
        const { firstName, lastName, phone, altPhone, email, occupation,annualIncome,address,city,state,pincode,photoUrl,preferredChannel } = updateGuardianDto;
        return this.prisma.tx.guardian.update({
            where: { id },
            data: {
                firstName,
                lastName,
                phone,
                altPhone,
                email,
                occupation,
                annualIncome,
                address,
                city,
                state,
                pincode,
                photoUrl,
                preferredChannel
            }
        });
    }
    

    async deleteGuardian(id: string) {
        const deletedAt = new Date()
        return this.prisma.tx.guardian.update({
            where: { id },
            data: { deletedAt }
        });
    }

    async getGuardianById(id: string) {
        return this.prisma.tx.guardian.findUnique({
            where: { id },
        });
    }
}
