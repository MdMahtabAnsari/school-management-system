import { Module } from '@nestjs/common';
import { StudentEnrollmentController } from '@/student-enrollment/student-enrollment.controller';
import { StudentEnrollmentService } from '@/student-enrollment/student-enrollment.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { StudentEnrollmentRepository } from '@/student-enrollment/student-enrollment.repository';
import { ClassSectionModule } from '@/class-section/class-section.module';

@Module({
  controllers: [StudentEnrollmentController],
  providers: [StudentEnrollmentService, StudentEnrollmentRepository],
  imports: [PrismaModule, ClassSectionModule],
  exports: [StudentEnrollmentService, StudentEnrollmentRepository]

})
export class StudentEnrollmentModule {}
