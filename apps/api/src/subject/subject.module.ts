import { Module } from '@nestjs/common';
import { SubjectController } from '@/subject/subject.controller';
import { SubjectService } from '@/subject/subject.service';
import { SubjectRepository } from '@/subject/subject.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository],
  imports: [PrismaModule]
})
export class SubjectModule {}
