import { Module } from '@nestjs/common';
import { StudentMedicalInfoController } from '@/student-medical-info/student-medical-info.controller';
import { StudentMedicalInfoService } from '@/student-medical-info/student-medical-info.service';
import { StudentMedicalInfoRepository } from '@/student-medical-info/student-medical-info.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import {StudentProfileModule} from '@/student-profile/student-profile.module';

@Module({
  controllers: [StudentMedicalInfoController],
  providers: [StudentMedicalInfoService, StudentMedicalInfoRepository],
  imports: [PrismaModule, StudentProfileModule]
})
export class StudentMedicalInfoModule {}
