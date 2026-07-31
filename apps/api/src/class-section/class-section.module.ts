import { Module } from '@nestjs/common';
import { ClassSectionController } from '@/class-section/class-section.controller';
import { ClassSectionService } from '@/class-section/class-section.service';
import {PrismaModule} from '@/prisma/prisma.module';
import {ClassSectionRepository} from '@/class-section/class-section.repository';

@Module({
  controllers: [ClassSectionController],
  providers: [ClassSectionService, ClassSectionRepository],
  imports: [PrismaModule],
  exports: [ClassSectionService, ClassSectionRepository]
})
export class ClassSectionModule {}
