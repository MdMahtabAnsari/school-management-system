import { Module } from '@nestjs/common';
import { HolidayController } from '@/holiday/holiday.controller';
import { HolidayService } from '@/holiday/holiday.service';
import { HolidayRepository } from '@/holiday/holiday.repository';
import {PrismaModule} from '@/prisma/prisma.module';

@Module({
  controllers: [HolidayController],
  providers: [HolidayService, HolidayRepository],
  imports: [PrismaModule]
})
export class HolidayModule {}
