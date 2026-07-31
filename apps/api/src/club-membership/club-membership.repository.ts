import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateClubMembershipDto } from '@/club-membership/dto/create-club-membership.dto';

@Injectable()
export class ClubMembershipRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createClubMembership(createClubMembershipDto: CreateClubMembershipDto) {
        const { studentId, clubId } = createClubMembershipDto;
        return this.prisma.tx.clubMembership.create({
            data: {
                studentId,
                clubId
            }
        });
    }

    async getClubMembershipById(id: string) {
        return this.prisma.tx.clubMembership.findUnique({
            where: {
                id,
            },
        });
    }
}
