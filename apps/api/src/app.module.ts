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
import { BoardModule } from './board/board.module';
import { GradeLevelModule } from './grade-level/grade-level.module';
import { AcademicYearModule } from './academic-year/academic-year.module';
import { TermModule } from './term/term.module';
import { CampusModule } from './campus/campus.module';
import { ClassSectionModule } from './class-section/class-section.module';
import { SubjectModule } from './subject/subject.module';
import { SubjectGroupModule } from './subject-group/subject-group.module';
import { PeriodModule } from './period/period.module';
import { TimetableModule } from './timetable/timetable.module';
import { TimetableSlotModule } from './timetable-slot/timetable-slot.module';
import { HolidayModule } from './holiday/holiday.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
