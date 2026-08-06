import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { ClsModule } from 'nestjs-cls';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaService } from '@/prisma/prisma.service';
import { BoardModule } from '@/board/board.module';
import { GradeLevelModule } from '@/grade-level/grade-level.module';
import { AcademicYearModule } from '@/academic-year/academic-year.module';
import { TermModule } from '@/term/term.module';
import { CampusModule } from '@/campus/campus.module';
import { ClassSectionModule } from '@/class-section/class-section.module';
import { SubjectModule } from '@/subject/subject.module';
import { SubjectGroupModule } from './subject-group/subject-group.module';
import { PeriodModule } from '@/period/period.module';
import { TimetableModule } from '@/timetable/timetable.module';
import { TimetableSlotModule } from '@/timetable-slot/timetable-slot.module';
import { HolidayModule } from '@/holiday/holiday.module';
import { StudentProfileModule } from '@/student-profile/student-profile.module';
import { StudentEnrollmentModule } from '@/student-enrollment/student-enrollment.module';
import { StudentTransferLogModule } from '@/student-transfer-log/student-transfer-log.module';
import { StudentPromotionModule } from '@/student-promotion/student-promotion.module';
import { EmergencyContactModule } from '@/emergency-contact/emergency-contact.module';
import { StudentMedicalInfoModule } from '@/student-medical-info/student-medical-info.module';
import { StudentDocumentModule } from '@/student-document/student-document.module';
import { DocumentRecordModule } from '@/document-record/document-record.module';
import { SiblingLinkModule } from '@/sibling-link/sibling-link.module';
import { HouseModule } from '@/house/house.module';
import { HouseMembershipModule } from '@/house-membership/house-membership.module';
import { ClubModule } from '@/club/club.module';
import { ClubMembershipModule } from '@/club-membership/club-membership.module';
import { CertificateModule } from '@/certificate/certificate.module';
import { GuardianModule } from '@/guardian/guardian.module';
import { StudentGuardianModule } from '@/student-guardian/student-guardian.module';
import { StaffProfileModule } from '@/staff-profile/staff-profile.module';
import { EmployeeRecordModule } from '@/employee-record/employee-record.module';
import { StaffDocumentModule } from '@/staff-document/staff-document.module';
import { PerformanceReviewModule } from '@/performance-review/performance-review.module';
import { StudentAttendanceModule } from '@/student-attendance/student-attendance.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bullmq';
import { NotificationModule } from './notification/notification.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClsModule.forRoot({
      global: true,
      plugins: [
        new ClsPluginTransactional({
          imports: [PrismaModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaService,
            sqlFlavor: 'postgresql',
          }),
        }),
      ],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'localhost', // or "mailpit" if running in Docker
        port: 1025,
        secure: false,
        ignoreTLS: true,
      },
      defaults: {
        from: '"School Management System" <noreply@example.com>',
      },
    }),
    BullModule.forRoot({
      connection: {
        url:process.env.REDIS_URL,
      },
    }),
    BoardModule,
    GradeLevelModule,
    AcademicYearModule,
    TermModule,
    CampusModule,
    ClassSectionModule,
    SubjectModule,
    SubjectGroupModule,
    PeriodModule,
    TimetableModule,
    TimetableSlotModule,
    HolidayModule,
    StudentProfileModule,
    StudentEnrollmentModule,
    StudentTransferLogModule,
    StudentPromotionModule,
    EmergencyContactModule,
    StudentMedicalInfoModule,
    StudentDocumentModule,
    DocumentRecordModule,
    SiblingLinkModule,
    HouseModule,
    HouseMembershipModule,
    ClubModule,
    ClubMembershipModule,
    CertificateModule,
    GuardianModule,
    StudentGuardianModule,
    StaffProfileModule,
    EmployeeRecordModule,
    StaffDocumentModule,
    PerformanceReviewModule,
    StudentAttendanceModule,
    NotificationModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
