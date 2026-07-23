import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTermDto } from '@/term/dto/create-term.dto';
import { UpdateTermDto } from '@/term/dto/update-term.dto';

@Injectable()
export class TermRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createTerm(orgId: string, createTermDto: CreateTermDto) {
        const { name, startDate, endDate, academicYearId } = createTermDto;
        return this.prisma.tx.term.create({
            data: {
                organizationId: orgId,
                name,
                startDate,
                endDate,
                academicYearId,
            },
        });
    }

    async updateTerm(id: string, updateTermDto: UpdateTermDto) {
        const { name, startDate, endDate, academicYearId } = updateTermDto;
        return this.prisma.tx.term.update({
            where: { id },
            data: {
                name,
                startDate,
                endDate,
                academicYearId,
            },
        });
    }

    async getTermById(id: string) {
        return this.prisma.tx.term.findUnique({
            where: { id },
        });
    }

    


}
