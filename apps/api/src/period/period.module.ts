import { Module } from '@nestjs/common';
import { PeriodController } from '@/period/period.controller';
import { PeriodService } from '@/period/period.service';
import { PeriodRepository } from '@/period/period.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [PeriodController],
  providers: [PeriodService, PeriodRepository],
  imports: [PrismaModule]
})
export class PeriodModule { }
