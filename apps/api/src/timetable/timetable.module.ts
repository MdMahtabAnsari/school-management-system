import { Module } from '@nestjs/common';
import { TimetableController } from '@/timetable/timetable.controller';
import { TimetableService } from '@/timetable/timetable.service';
import { TimetableRepository } from '@/timetable/timetable.repository';
import {PrismaModule} from '@/prisma/prisma.module';

@Module({
  controllers: [TimetableController],
  providers: [TimetableService, TimetableRepository],
  imports: [PrismaModule],
})
export class TimetableModule {}
