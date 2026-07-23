import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSubjectGroupDto } from '@/subject-group/dto/create-subject-group.dto';
import { UpdateSubjectGroupDto } from '@/subject-group/dto/update-subject-group.dto';

@Injectable()
export class SubjectGroupRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createSubjectGroup(orgId: string, createSubjectGroupDto: CreateSubjectGroupDto) {
        const { name, classSectionId, isElectiveGroup } = createSubjectGroupDto;
        return this.prisma.tx.subjectGroup.create({
            data: {
                organizationId: orgId,
                name,
                classSectionId,
                isElectiveGroup,

            },
        });
    }

    async addSubjects(subjectGroupId: string, subjectIds: string[]) {
        return this.prisma.tx.subjectGroupSubject.createMany({
            data: subjectIds.map((subjectId) => ({
                subjectGroupId,
                subjectId,
            })),
            skipDuplicates: true,
        });
    }

    async removeSubjects(subjectGroupId: string, subjectIds: string[]) {
        return this.prisma.tx.subjectGroupSubject.deleteMany({
            where: {
                subjectGroupId,
                subjectId: { in: subjectIds },
            },
        });
    }

    async removeAllSubjects(subjectGroupId) {
        return this.prisma.tx.subjectGroupSubject.deleteMany({
            where: {
                subjectGroupId,
            },
        });
    }

    async updateSubjectGroup(id: string, updateSubjectGroupDto: UpdateSubjectGroupDto) {
        const { isElectiveGroup, name, classSectionId } = updateSubjectGroupDto;
        return this.prisma.tx.subjectGroup.update({
            where: { id },
            data: {
                isElectiveGroup,
                name,
                classSectionId,
            },
        });
    }

    async getSubjectGroupById(id: string) {
        return this.prisma.tx.subjectGroup.findUnique({
            where: { id },
        });
    }

}
