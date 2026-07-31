import { Module } from '@nestjs/common';
import { StaffProfileController } from '@/staff-profile/staff-profile.controller';
import { StaffProfileService } from '@/staff-profile/staff-profile.service';
import { StaffProfileRepository } from '@/staff-profile/staff-profile.repository';
import {PrismaModule} from '@/prisma/prisma.module';

@Module({
  controllers: [StaffProfileController],
  providers: [StaffProfileService, StaffProfileRepository],
  imports: [PrismaModule],
  exports: [StaffProfileService, StaffProfileRepository],
})
export class StaffProfileModule {}
