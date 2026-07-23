import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import {PrismaService} from '@/prisma/prisma.service';
import {CreateGradeLevelDto} from '@/grade-level/dto/create-grade-level.dto';
import {UpdateGradeLevelDto} from '@/grade-level/dto/update-grade-level.dto';

@Injectable()
export class GradeLevelRepository {
    constructor(
    private readonly prisma: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async createGradeLevel(orgId: string,sequence: number, createGradeLevelDto: CreateGradeLevelDto) {
    const { boardId, name, stageLabel} = createGradeLevelDto;
    return this.prisma.tx.gradeLevel.create({
      data: {
        organizationId: orgId,
        boardId,
        name,
        stageLabel,
        sequence,
      },
    });
  }
  async getLastSequence(orgId: string) {
    const lastGrade = await this.prisma.tx.gradeLevel.findFirst({
      where: { organizationId: orgId },
      orderBy: { sequence: 'desc' },
    });
    return lastGrade ? lastGrade.sequence : 0;
  }
  async updateGradeLevel(id: string, updateGradeLevelDto: UpdateGradeLevelDto) {
    const { boardId, name, stageLabel, sequence } = updateGradeLevelDto;
    return this.prisma.tx.gradeLevel.update({
      where: { id },
      data: {
        boardId,
        name,
        stageLabel,
        sequence,
      },
    });
  }

  async getGradeLevelById(id: string) {
    return this.prisma.tx.gradeLevel.findUnique({
      where: { id },
    });
  }

  async deleteGradeLevel(id: string) {
    const deletedAt = new Date();
    return this.prisma.tx.gradeLevel.update({
      where: { id },
      data: { deletedAt },
    });
  }

  async getGradeLevelByOrgIdAndSequence(orgId: string, sequence: number) {
    return this.prisma.tx.gradeLevel.findFirst({
      where: { organizationId: orgId, sequence, deletedAt: null },
    });
  }
    

}
