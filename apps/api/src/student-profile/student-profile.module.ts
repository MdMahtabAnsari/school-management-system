import { Module } from '@nestjs/common';
import { StudentProfileController } from '@/student-profile/student-profile.controller';
import { StudentProfileService } from '@/student-profile/student-profile.service';
import { StudentProfileRepository } from '@/student-profile/student-profile.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [StudentProfileController],
  providers: [StudentProfileService, StudentProfileRepository],
  imports: [PrismaModule],
  exports: [StudentProfileService, StudentProfileRepository]
})
export class StudentProfileModule {}
