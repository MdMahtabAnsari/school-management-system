import { Module } from '@nestjs/common';
import { StudentGuardianController } from '@/student-guardian/student-guardian.controller';
import { StudentGuardianService } from '@/student-guardian/student-guardian.service';
import { StudentGuardianRepository } from '@/student-guardian/student-guardian.repository';
import {PrismaModule} from '@/prisma/prisma.module';
import {GuardianModule} from '@/guardian/guardian.module';
import {StudentProfileModule} from '@/student-profile/student-profile.module';

@Module({
  controllers: [StudentGuardianController],
  providers: [StudentGuardianService, StudentGuardianRepository],
  imports: [PrismaModule, GuardianModule, StudentProfileModule]
})
export class StudentGuardianModule {}
