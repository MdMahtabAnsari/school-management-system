import { Module } from '@nestjs/common';
import { SubjectGroupController } from '@/subject-group/subject-group.controller';
import { SubjectGroupService } from '@/subject-group/subject-group.service';
import { SubjectGroupRepository } from '@/subject-group/subject-group.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  controllers: [SubjectGroupController],
  providers: [SubjectGroupService, SubjectGroupRepository],
  imports: [PrismaModule]
})
export class SubjectGroupModule {}
