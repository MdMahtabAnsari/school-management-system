import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateClubDto } from '@/club/dto/create-club.dto';

@Injectable()
export class ClubRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createClub(orgId: string, createClubDto: CreateClubDto) {
        const { name, description } = createClubDto;
        return this.prisma.tx.club.create({
            data: {
                organizationId: orgId,
                name,
                description
            }
        });
    }

    async getClubById(id: string) {
        return this.prisma.tx.club.findUnique({
            where: {
                id,
            },
        });
    }
}