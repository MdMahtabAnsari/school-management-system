import { Injectable, BadRequestException,NotFoundException,ForbiddenException } from '@nestjs/common';
import { StudentPromotionRepository } from '@/student-promotion/student-promotion.repository';
import { StudentEnrollmentService } from '@/student-enrollment/student-enrollment.service';
import { CreateStudentPromotionDto } from '@/student-promotion/dto/create-student-promotion.dto';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class StudentPromotionService {
    constructor(
        private readonly studentPromotionRepository: StudentPromotionRepository,
        private readonly studentEnrollmentService: StudentEnrollmentService
    ) { }

    @Transactional()
    async promoteStudent(orgId: string,createStudentPromotionDto: CreateStudentPromotionDto) {
        await this.studentEnrollmentService.getStudentEnrollmentById(createStudentPromotionDto.fromEnrollmentId, orgId);
        const {fromEnrollmentId,toEnrollment,outcome,remarks} = createStudentPromotionDto;

        const requiresNewEnrollment = outcome === 'PROMOTED' || outcome === 'DETAINED';

        if (requiresNewEnrollment && !toEnrollment) {
            throw new BadRequestException(
                'toEnrollment is required when outcome is PROMOTED or DETAINED',
            );
        }

        let toEnrollmentId: string | undefined;

        if (requiresNewEnrollment) {
            const createdEnrollment =
                await this.studentEnrollmentService.createStudentEnrollment(
                    orgId,
                    toEnrollment!,
                );

            toEnrollmentId = createdEnrollment.id;
        }

        await this.studentEnrollmentService.updateStudentEnrollment(
            fromEnrollmentId,
            orgId,
            { status: outcome },
        );

        return this.studentPromotionRepository.createStudentPromotion(orgId, {
            fromEnrollmentId,
            toEnrollmentId,
            outcome,
            remarks,
        });
    }

    async getStudentPromotionById(id: string, orgId: string) {

        const promotion = await this.studentPromotionRepository.getStudentPromotionById(id);

        if (!promotion) {
            throw new NotFoundException('Student promotion not found');
        }
        if(promotion.organizationId !== orgId) {
            throw new ForbiddenException('You do not have permission to view this student promotion');
        }
        return promotion;
    }
}
