import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import {PrismaService} from '@/prisma/prisma.service';
import {CreateSubjectDto} from '@/subject/dto/create-subject.dto';
import {UpdateSubjectDto} from '@/subject/dto/update-subject.dto';

@Injectable()
export class SubjectRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createSubject(orgId: string, createSubjectDto: CreateSubjectDto) {
        const { name, code, isElective } = createSubjectDto;
        return this.prisma.tx.subject.create({
            data: {
                organizationId: orgId,
                name,
                code,
                isElective,
            },
        });
    }

    async updateSubject(id: string, updateSubjectDto: UpdateSubjectDto) {
        const { name, code, isElective } = updateSubjectDto;
        return this.prisma.tx.subject.update({
            where: { id },
            data: {
                name,
                code,
                isElective,
            },
        });
    }

    async getSubjectById(id: string) {
        return this.prisma.tx.subject.findUnique({
            where: { id },
        });
    }

    async deleteSubject(id: string) {
        const deletedAt = new Date();
        return this.prisma.tx.subject.update({
            where: { id },
            data: { deletedAt },
        });
    }
}
