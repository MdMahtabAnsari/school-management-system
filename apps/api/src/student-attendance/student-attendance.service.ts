import { Injectable, NotFoundException, BadRequestException,ForbiddenException } from '@nestjs/common';
import { StudentAttendanceRepository } from '@/student-attendance/student-attendance.repository';
import { CreateStudentAttendanceDto } from '@/student-attendance/dto/create-student-attendance.dto';
import { StudentEnrollmentService } from '@/student-enrollment/student-enrollment.service';
import { HolidayRepository } from '@/holiday/holiday.repository';
import { isWithinInterval, getDay,isFuture } from 'date-fns';
import { TZDate } from "@date-fns/tz";
import { AcademicYearService } from '@/academic-year/academic-year.service';
import { TimetableSlotService } from '@/timetable-slot/timetable-slot.service';
import { StaffProfileService } from '@/staff-profile/staff-profile.service';
import { StudentAttendanceFilterDto } from '@/student-attendance/dto/student-attendance-filter.dto';

@Injectable()
export class StudentAttendanceService {
    constructor(
        private readonly studentAttendanceRepository: StudentAttendanceRepository,
        private readonly studentEnrollmentService: StudentEnrollmentService,
        private readonly holidayRepository: HolidayRepository,
        private readonly academicYearService: AcademicYearService,
        private readonly timetableSlotService: TimetableSlotService,
        private readonly staffProfileService: StaffProfileService
    ) { }

    async markStudentAttendance(orgId: string, markedById: string, createStudentAttendanceDto: CreateStudentAttendanceDto) {
        const { studentId, date: attendanceDate, periodId, timeZone } = createStudentAttendanceDto;
        // Check if the student is enrolled in the organization
        
        const date = new TZDate(attendanceDate, timeZone);
        if (isFuture(date)) {
            throw new BadRequestException('Attendance date cannot be in the future');
        }
        const isEnrolled = await this.studentEnrollmentService.getStudentEnrollmentByStudentIdAndStatus(createStudentAttendanceDto.studentId, 'ACTIVE', orgId);
        if (!isEnrolled) {
            throw new NotFoundException('Student is not enrolled in the organization');
        }

        const academicYear = await this.academicYearService.getAcademicYearById(isEnrolled.academicYearId, orgId);
        const startDate = new TZDate(academicYear.startDate, timeZone);
        const endDate = new TZDate(academicYear.endDate, timeZone);
        if (!isWithinInterval(date, { start: startDate, end: endDate })) {
            throw new BadRequestException('Attendance date is outside the academic year');
        }

        // Check if the date is a holiday
        const holiday = await this.holidayRepository.getHolidayByOrgIdAndDate(orgId, createStudentAttendanceDto.date);
        const academicHoliday = await this.holidayRepository.getHolidayByOrgIdAndAcademicYearAndDate(orgId, createStudentAttendanceDto.date, isEnrolled.academicYearId);
        if (holiday || academicHoliday) {
            throw new BadRequestException('Cannot mark attendance for a holiday');
        }
        if (periodId) {
            const dailyConflictAttendance = await this.studentAttendanceRepository.getConflictAttendance(studentId, createStudentAttendanceDto.date, true);
            if (dailyConflictAttendance) {
                throw new BadRequestException('Daily attendance for this student has already been marked');
            }
            const periodConflictAttendance = await this.studentAttendanceRepository.getConflictAttendance(studentId, createStudentAttendanceDto.date, false, periodId);
            if (periodConflictAttendance) {
                throw new BadRequestException('Attendance for this student and period has already been marked');
            }
            const staffProfile = await this.staffProfileService.getStaffProfileByOrgIdAndUserId(orgId, markedById);
            const timetableSlot = await this.timetableSlotService.getTimetableSlotsByFilter({
                classSectionId: isEnrolled.classSectionId,
                periodId: periodId,
                weekday: getDay(date),
                teacherId: staffProfile.id,
                academicYearId: isEnrolled.academicYearId,
                organizationId: orgId
            });

            if (timetableSlot.length === 0) {
                throw new BadRequestException('No timetable slot found for the given period and class section');
            }

            return this.studentAttendanceRepository.createStudentAttendance(orgId, markedById, createStudentAttendanceDto);
        }
        else {
            const conflictAttendance = await this.studentAttendanceRepository.getConflictAttendance(studentId, createStudentAttendanceDto.date, false);
            if (conflictAttendance) {
                throw new BadRequestException('Daily attendance for this student has already been marked');
            }
            return this.studentAttendanceRepository.createStudentAttendance(orgId, markedById, createStudentAttendanceDto);
        }
    }

    async getStudentAttendanceById(id: string,orgId: string) {
        const attendance = await this.studentAttendanceRepository.getStudentAttendanceById(id);
        if (!attendance) {
            throw new NotFoundException('Student attendance not found');
        }
        if (attendance.organizationId !== orgId) {
            throw new ForbiddenException('You are not the owner of this attendance record');
        }
        return attendance;
    }

    async getStudentAttendanceByFilter(filter: StudentAttendanceFilterDto) {
        return this.studentAttendanceRepository.getStudentAttendanceByFilter(filter);
    }
}
