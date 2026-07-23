import { Module } from '@nestjs/common';
import { CampusController } from '@/campus/campus.controller';
import { CampusService } from '@/campus/campus.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { CampusRepository } from '@/campus/campus.repository';

@Module({
  controllers: [CampusController],
  providers: [CampusService, CampusRepository],
  imports: [PrismaModule]
})
export class CampusModule {}
