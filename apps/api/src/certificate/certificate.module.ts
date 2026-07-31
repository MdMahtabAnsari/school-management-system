import { Module } from '@nestjs/common';
import { CertificateController } from '@/certificate/certificate.controller';
import { CertificateService } from '@/certificate/certificate.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { StudentProfileModule } from '@/student-profile/student-profile.module';
import { CertificateRepository } from '@/certificate/certificate.repository';

@Module({
  controllers: [CertificateController],
  providers: [CertificateService, CertificateRepository],
  imports: [PrismaModule, StudentProfileModule]
})
export class CertificateModule {}
