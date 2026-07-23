import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePeriodDto } from '@/period/dto/create-period.dto';
import { UpdatePeriodDto } from '@/period/dto/update-period.dto';


@Injectable()
export class PeriodRepository {
  constructor(
    private readonly prisma: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) { }

  async createPeriod(orgId: string, sequence: number, createPeriodDto: CreatePeriodDto) {
    const { name, startTime, endTime } = createPeriodDto;
    return this.prisma.tx.period.create({
      data: {
        name,
        startTime,
        endTime,
        organizationId: orgId,
        sequence
      },
    });
  }

  async updatePeriod(id: string, updatePeriodDto: UpdatePeriodDto) {
    const { name, startTime, endTime, sequence } = updatePeriodDto;
    return this.prisma.tx.period.update({
      where: { id },
      data: {
        name,
        startTime,
        endTime,
        sequence
      },
    });
  }

  async getPeriodById(id: string) {
    return this.prisma.tx.period.findUnique({
      where: { id },
    });
  }

  async getLastSequence(orgId: string) {
    const lastPeriod = await this.prisma.tx.period.findFirst({
      where: { organizationId: orgId },
      orderBy: { sequence: 'desc' },
    });
    return lastPeriod ? lastPeriod.sequence : 0;
  }

  async getPeriodByOrgIdAndSequence(orgId: string, sequence: number) {
    return this.prisma.tx.period.findFirst({
      where: { organizationId: orgId, sequence },
    });
  }
}


