import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStudentPromotionRepositoryDto } from '@/student-promotion/dto/create-student-promotion.dto';

@Injectable()
export class StudentPromotionRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStudentPromotion(orgId: string, createStudentPromotionRepositoryDto: CreateStudentPromotionRepositoryDto) {
        const { fromEnrollmentId,toEnrollmentId,outcome,remarks } = createStudentPromotionRepositoryDto;
        return this.prisma.tx.studentPromotion.create({
            data: {
                organizationId: orgId,
                fromEnrollmentId,
                toEnrollmentId,
                outcome,
                remarks,
            },
        });
    }

    async getStudentPromotionById(id: string) {
        return this.prisma.tx.studentPromotion.findUnique({
            where: { id },
        });
    }
}
