import { Module } from '@nestjs/common';
import { TimetableSlotController } from '@/timetable-slot/timetable-slot.controller';
import { TimetableSlotService } from '@/timetable-slot/timetable-slot.service';
import {PrismaModule} from '@/prisma/prisma.module';
import { TimetableSlotRepository } from '@/timetable-slot/timetable-slot.repository';

@Module({
  controllers: [TimetableSlotController],
  providers: [TimetableSlotService, TimetableSlotRepository],
  imports: [PrismaModule],
  exports: [TimetableSlotService, TimetableSlotRepository]
})
export class TimetableSlotModule {}
