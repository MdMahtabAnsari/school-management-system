import { Module } from '@nestjs/common';
import { SiblingLinkController } from '@/sibling-link/sibling-link.controller';
import { SiblingLinkService } from '@/sibling-link/sibling-link.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { SiblingLinkRepository } from '@/sibling-link/sibling-link.repository';
import { StudentProfileModule } from '@/student-profile/student-profile.module';

@Module({
  controllers: [SiblingLinkController],
  providers: [SiblingLinkService, SiblingLinkRepository],
  imports: [PrismaModule, StudentProfileModule]
})
export class SiblingLinkModule {}
