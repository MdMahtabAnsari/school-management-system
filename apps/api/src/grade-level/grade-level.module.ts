import { Module } from '@nestjs/common';
import { GradeLevelService } from '@/grade-level/grade-level.service';
import { GradeLevelController } from '@/grade-level/grade-level.controller';
import {PrismaModule} from '@/prisma/prisma.module';
import {GradeLevelRepository} from '@/grade-level/grade-level.repository';

@Module({
  imports: [PrismaModule],
  providers: [GradeLevelService, GradeLevelRepository],
  controllers: [GradeLevelController]
})
export class GradeLevelModule {}
