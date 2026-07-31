import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateHouseMembershipDto } from '@/house-membership/dto/create-house-membership.dto';

@Injectable()
export class HouseMembershipRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createHouseMembership(createHouseMembershipDto: CreateHouseMembershipDto) {
        const { studentId, houseId } = createHouseMembershipDto;
        return this.prisma.tx.houseMembership.create({
            data: {
                studentId,
                houseId,
            },
        });
    }

    async getHouseMembershipById(id: string) {
        return this.prisma.tx.houseMembership.findUnique({
            where: {
                id,
            },
        });
    }
}
