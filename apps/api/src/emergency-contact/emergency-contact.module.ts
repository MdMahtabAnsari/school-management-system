import { Module } from '@nestjs/common';
import { EmergencyContactController } from '@/emergency-contact/emergency-contact.controller';
import { EmergencyContactService } from '@/emergency-contact/emergency-contact.service';
import { EmergencyContactRepository } from '@/emergency-contact/emergency-contact.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import { StudentProfileModule } from '@/student-profile/student-profile.module';

@Module({
  controllers: [EmergencyContactController],
  providers: [EmergencyContactService, EmergencyContactRepository],
  imports: [PrismaModule, StudentProfileModule]
})
export class EmergencyContactModule {}
