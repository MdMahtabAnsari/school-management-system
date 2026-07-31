import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSiblingLinkDto } from '@/sibling-link/dto/create-sibling-link.dto';

@Injectable()
export class SiblingLinkRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createSiblingLink(confirmedById: string, createSiblingLinkDto: CreateSiblingLinkDto) {
        const { primaryId, siblingId } = createSiblingLinkDto;
        return this.prisma.tx.siblingLink.create({
            data: {
                primaryId,
                siblingId,
                confirmedById
            },
        });
    }

    async getSiblingLinkById(id: string) {
        return this.prisma.tx.siblingLink.findUnique({
            where: { id },
        });
    }
}
