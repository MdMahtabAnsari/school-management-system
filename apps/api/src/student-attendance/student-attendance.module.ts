import { Module } from '@nestjs/common';
import { StudentAttendanceController } from '@/student-attendance/student-attendance.controller';
import { StudentAttendanceService } from '@/student-attendance/student-attendance.service';
import { StudentAttendanceRepository } from '@/student-attendance/student-attendance.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import { HolidayModule } from '@/holiday/holiday.module';
import {StudentEnrollmentModule} from '@/student-enrollment/student-enrollment.module';
import {AcademicYearModule} from '@/academic-year/academic-year.module';
import {TimetableSlotModule} from '@/timetable-slot/timetable-slot.module';
import {StaffProfileModule} from '@/staff-profile/staff-profile.module';

@Module({
  controllers: [StudentAttendanceController],
  providers: [StudentAttendanceService, StudentAttendanceRepository],
  imports: [PrismaModule, HolidayModule, StudentEnrollmentModule, AcademicYearModule, TimetableSlotModule, StaffProfileModule],
})
export class StudentAttendanceModule { }
