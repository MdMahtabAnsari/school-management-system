import { Module } from '@nestjs/common';
import { GuardianController } from '@/guardian/guardian.controller';
import { GuardianService } from '@/guardian/guardian.service';
import { GuardianRepository } from '@/guardian/guardian.repository';
import {PrismaModule} from '@/prisma/prisma.module';

@Module({
  controllers: [GuardianController],
  providers: [GuardianService, GuardianRepository],
  imports: [PrismaModule],
  exports: [GuardianService, GuardianRepository]
})
export class GuardianModule {}
