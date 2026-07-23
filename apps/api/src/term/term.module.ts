import { Module } from '@nestjs/common';
import { TermController } from '@/term/term.controller';
import { TermService } from '@/term/term.service';
import { TermRepository } from '@/term/term.repository';
import {PrismaModule} from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TermController],
  providers: [TermService, TermRepository]
})
export class TermModule {}
