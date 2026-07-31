import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';
import { PerformanceReviewService } from '@/performance-review/performance-review.service';
import { CreatePerformanceReviewDto } from '@/performance-review/dto/create-performance-review.dto';
import { IdDto } from '@/performance-review/dto/id.dto';

@Controller('performance-reviews')
export class PerformanceReviewController {
    constructor(private readonly performanceReviewService: PerformanceReviewService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{performanceReview:['create']}})
    async createPerformanceReview(
        @Session() session: UserSession,
        @Body() createPerformanceReviewDto: CreatePerformanceReviewDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a performance review.');
        }
        return this.performanceReviewService.createPerformanceReview(session.session.activeOrganizationId, session.session.userId, createPerformanceReviewDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{performanceReview:['read']}})
    async getPerformanceReviewById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a performance review.');
        }
        return this.performanceReviewService.getPerformanceReviewById(id.id, session.session.activeOrganizationId);
    }
}
