import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCampusDto } from '@/campus/dto/create-campus.dto';
import { UpdateCampusDto } from '@/campus/dto/update-campus.dto';

@Injectable()
export class CampusRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createCampus(orgId: string, createCampusDto: CreateCampusDto) {
        const { name, address } = createCampusDto;
        return this.prisma.tx.campus.create({
            data: {
                organizationId: orgId,
                name,
                address,
            },
        });
    }

    async updateCampus(id: string, updateCampusDto: UpdateCampusDto) {
        const { name, address,isPrimary } = updateCampusDto;
        return this.prisma.tx.campus.update({
            where: { id },
            data: {
                name,
                address,
                isPrimary,
            },
        });
    }

    async getCampusById(id: string) {
        return this.prisma.tx.campus.findUnique({
            where: { id },
        });
    }

    async deleteCampus(id: string) {
        const deletedAt = new Date();
        return this.prisma.tx.campus.update({
            where: { id },
            data: { deletedAt },
        });
    }

    async nonPrimaryCampuses(orgId: string) {
        return this.prisma.tx.campus.updateMany({
            where: { organizationId: orgId },
            data: { isPrimary: false },
        });
    }
    
}
