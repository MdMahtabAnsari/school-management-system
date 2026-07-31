import { Module } from '@nestjs/common';
import { StudentPromotionController } from '@/student-promotion/student-promotion.controller';
import { StudentPromotionService } from '@/student-promotion/student-promotion.service';
import { PrismaModule } from '@/prisma/prisma.module';
import {StudentEnrollmentModule} from '@/student-enrollment/student-enrollment.module';
import { StudentPromotionRepository } from './student-promotion.repository';

@Module({
  controllers: [StudentPromotionController],
  providers: [StudentPromotionService, StudentPromotionRepository],
  imports:[PrismaModule, StudentEnrollmentModule]
})
export class StudentPromotionModule {}
