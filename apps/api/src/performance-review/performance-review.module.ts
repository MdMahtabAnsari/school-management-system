import { Module } from '@nestjs/common';
import { PerformanceReviewController } from '@/performance-review/performance-review.controller';
import { PerformanceReviewService } from '@/performance-review/performance-review.service';
import { PerformanceReviewRepository } from '@/performance-review/performance-review.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import { StaffProfileModule } from '@/staff-profile/staff-profile.module';

@Module({
  controllers: [PerformanceReviewController],
  providers: [PerformanceReviewService, PerformanceReviewRepository],
  imports: [PrismaModule, StaffProfileModule]
})
export class PerformanceReviewModule {}
