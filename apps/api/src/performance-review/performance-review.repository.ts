import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePerformanceReviewDto } from '@/performance-review/dto/create-performance-review.dto';

@Injectable()
export class PerformanceReviewRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createPerformanceReview(orgId: string,reviewedById:string, createPerformanceReviewDto: CreatePerformanceReviewDto) {
        const { staffId, reviewPeriod, rating, remarks } = createPerformanceReviewDto;
        return this.prisma.tx.performanceReview.create({
            data: {
                organizationId: orgId,
                staffId,
                reviewPeriod,
                rating,
                remarks,
                reviewedById
            },
        });
    }

    async getPerformanceReviewById(id: string) {
        return this.prisma.tx.performanceReview.findUnique({
            where: { id },
        });
    }
}
