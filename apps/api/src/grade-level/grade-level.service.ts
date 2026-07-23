import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { GradeLevelRepository } from '@/grade-level/grade-level.repository';
import { CreateGradeLevelDto } from '@/grade-level/dto/create-grade-level.dto';
import { UpdateGradeLevelDto } from "@/grade-level/dto/update-grade-level.dto";
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class GradeLevelService {
    constructor(private readonly gradeLevelRepository: GradeLevelRepository) { }

    async createGradeLevel(orgId: string, createGradeLevelDto: CreateGradeLevelDto) {
        const lastSequence = await this.gradeLevelRepository.getLastSequence(orgId);
        const newSequence = lastSequence + 1;
        return this.gradeLevelRepository.createGradeLevel(orgId, newSequence, createGradeLevelDto);
    }

    @Transactional()
    async updateGradeLevel(
        id: string,
        orgId: string,
        updateGradeLevelDto: UpdateGradeLevelDto,
    ) {
        const current = await this.gradeLevelRepository.getGradeLevelById(id);

        if (!current || current.deletedAt) {
            throw new NotFoundException('Grade level not found.');
        }

        if (current.organizationId !== orgId) {
            throw new ForbiddenException(
                'You do not have permission to update this grade level.',
            );
        }

        if (
            updateGradeLevelDto.sequence !== undefined &&
            updateGradeLevelDto.sequence !== current.sequence
        ) {
            const target =
                await this.gradeLevelRepository.getGradeLevelByOrgIdAndSequence(
                    orgId,
                    updateGradeLevelDto.sequence,
                );

            if (target) {
                await this.gradeLevelRepository.updateGradeLevel(target.id, {
                    sequence: current.sequence,
                });
            }
        }

        return this.gradeLevelRepository.updateGradeLevel(
            id,
            updateGradeLevelDto,
        );
    }

    async deleteGradeLevel(id: string, orgId: string) {
        const isGradeLevelExists = await this.gradeLevelRepository.getGradeLevelById(id);
        if (!isGradeLevelExists || isGradeLevelExists.deletedAt) {
            throw new NotFoundException('Grade level not found.');
        }
        if (isGradeLevelExists.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to delete this grade level.');
        }
        return this.gradeLevelRepository.deleteGradeLevel(id);
    }

    async getGradeLevelById(id: string, orgId: string) {
        const isGradeLevelExists = await this.gradeLevelRepository.getGradeLevelById(id);
        if (!isGradeLevelExists || isGradeLevelExists.deletedAt) {
            throw new NotFoundException('Grade level not found.');
        }
        if (isGradeLevelExists.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to view this grade level.');
        }
        return isGradeLevelExists;
    }
}
