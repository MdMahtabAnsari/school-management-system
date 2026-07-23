import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PeriodRepository } from '@/period/period.repository';
import { CreatePeriodDto } from '@/period/dto/create-period.dto';
import { UpdatePeriodDto } from '@/period/dto/update-period.dto';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class PeriodService {
  constructor(private readonly periodRepository: PeriodRepository) { }

  async createPeriod(orgId: string, createPeriodDto: CreatePeriodDto) {
    const lastSequence = await this.periodRepository.getLastSequence(orgId);
    const newSequence = lastSequence + 1;
    return this.periodRepository.createPeriod(orgId, newSequence, createPeriodDto);
  }

  @Transactional()
  async updatePeriod(
    id: string,
    orgId: string,
    updatePeriodDto: UpdatePeriodDto,
  ) {
    const currentPeriod = await this.periodRepository.getPeriodById(id);

    if (!currentPeriod) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }

    if (currentPeriod.organizationId !== orgId) {
      throw new ForbiddenException(`You are not the owner of this period`);
    }

    if (
      updatePeriodDto.sequence !== undefined &&
      updatePeriodDto.sequence !== currentPeriod.sequence
    ) {
      const targetPeriod =
        await this.periodRepository.getPeriodByOrgIdAndSequence(
          orgId,
          updatePeriodDto.sequence,
        );

      if (targetPeriod) {
        // swap
        await this.periodRepository.updatePeriod(targetPeriod.id, {
          sequence: currentPeriod.sequence,
        });
      }
    }

    return this.periodRepository.updatePeriod(id, updatePeriodDto);
  }

  async getPeriodById(id: string, orgId: string) {
    const period = await this.periodRepository.getPeriodById(id);
    if (!period) {
      throw new NotFoundException(`Period with ID ${id} not found`);
    }
    if (period.organizationId !== orgId) {
      throw new ForbiddenException(`You are not the owner of this period`);
    }
    return period;
  }
}
