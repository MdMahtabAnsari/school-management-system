import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import {PerformanceReviewRepository} from '@/performance-review/performance-review.repository';
import { CreatePerformanceReviewDto } from '@/performance-review/dto/create-performance-review.dto';
import {StaffProfileService} from '@/staff-profile/staff-profile.service';

@Injectable()
export class PerformanceReviewService {
    constructor(
        private readonly performanceReviewRepository: PerformanceReviewRepository,
        private readonly staffProfileService: StaffProfileService
    ) {}

    async createPerformanceReview(orgId: string, reviewedById: string, createPerformanceReviewDto: CreatePerformanceReviewDto) {
        await this.staffProfileService.getStaffProfileById(createPerformanceReviewDto.staffId, orgId);
        return this.performanceReviewRepository.createPerformanceReview(orgId, reviewedById, createPerformanceReviewDto);
    }

    async getPerformanceReviewById(id: string, orgId: string) {
        const performanceReview = await this.performanceReviewRepository.getPerformanceReviewById(id);
        if (!performanceReview) {
            throw new NotFoundException('Performance review not found');
        }
        if (performanceReview.organizationId !== orgId) {
            throw new ForbiddenException('You do not have access to this performance review');
        }
        return performanceReview;
    }
}
