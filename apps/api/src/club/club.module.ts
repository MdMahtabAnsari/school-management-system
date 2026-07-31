import { Module } from '@nestjs/common';
import { ClubController } from '@/club/club.controller';
import { ClubService } from '@/club/club.service';
import { ClubRepository } from '@/club/club.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [ClubController],
  providers: [ClubService, ClubRepository],
  exports: [ClubService, ClubRepository],
  imports: [PrismaModule]
})
export class ClubModule {}
