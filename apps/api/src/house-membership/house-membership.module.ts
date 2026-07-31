import { Module } from '@nestjs/common';
import { HouseMembershipController } from '@/house-membership/house-membership.controller';
import { HouseMembershipService } from '@/house-membership/house-membership.service';
import { HouseMembershipRepository } from '@/house-membership/house-membership.repository';
import {PrismaModule} from '@/prisma/prisma.module';
import {StudentProfileModule} from '@/student-profile/student-profile.module';
import {HouseModule} from '@/house/house.module';

@Module({
  controllers: [HouseMembershipController],
  providers: [HouseMembershipService, HouseMembershipRepository],
  imports: [PrismaModule, StudentProfileModule, HouseModule]
})
export class HouseMembershipModule {}
