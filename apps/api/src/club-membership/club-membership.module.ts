import { Module } from '@nestjs/common';
import { ClubMembershipController } from '@/club-membership/club-membership.controller';
import { ClubMembershipService } from '@/club-membership/club-membership.service';
import { ClubMembershipRepository } from '@/club-membership/club-membership.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import { ClubModule } from '@/club/club.module';
import { StudentProfileModule } from '@/student-profile/student-profile.module';

@Module({
  controllers: [ClubMembershipController],
  providers: [ClubMembershipService, ClubMembershipRepository],
  imports: [PrismaModule, ClubModule, StudentProfileModule]
})
export class ClubMembershipModule {}
