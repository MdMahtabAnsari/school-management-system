import { Module } from '@nestjs/common';
import { AcademicYearController } from '@/academic-year/academic-year.controller';
import { AcademicYearService } from '@/academic-year/academic-year.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { AcademicYearRepository } from '@/academic-year/academic-year.repository';

@Module({
  controllers: [AcademicYearController],
  providers: [AcademicYearService, AcademicYearRepository],
  imports: [PrismaModule],
  exports: [AcademicYearService, AcademicYearRepository]
})
export class AcademicYearModule {}
