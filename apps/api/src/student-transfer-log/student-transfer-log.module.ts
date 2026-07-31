import { Module } from '@nestjs/common';
import { StudentTransferLogController } from '@/student-transfer-log/student-transfer-log.controller';
import { StudentTransferLogService } from '@/student-transfer-log/student-transfer-log.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { StudentTransferLogRepository } from '@/student-transfer-log/student-transfer-log.repository';
import {StudentEnrollmentModule} from "@/student-enrollment/student-enrollment.module";
import {ClassSectionModule} from "@/class-section/class-section.module";

@Module({
  controllers: [StudentTransferLogController],
  providers: [StudentTransferLogService, StudentTransferLogRepository],
  imports: [PrismaModule, StudentEnrollmentModule, ClassSectionModule]
})
export class StudentTransferLogModule {}
