import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { CertificateService } from '@/certificate/certificate.service';
import { CreateCertificateDto } from '@/certificate/dto/create-certificate.dto';
import { IdDto } from '@/certificate/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('certificates')
export class CertificateController {
    constructor(private readonly certificateService: CertificateService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['manageActivities']}})
    async createCertificate(
        @Session() session: UserSession,
        @Body() createCertificateDto: CreateCertificateDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a certificate.');
        }
        return this.certificateService.createCertificate(session.session.activeOrganizationId, session.session.userId, createCertificateDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['manageActivities']}})
    async getCertificateById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a certificate.');
        }
        return this.certificateService.getCertificateById(id.id, session.session.activeOrganizationId);
    }
}
