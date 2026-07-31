import { Injectable,NotFoundException } from '@nestjs/common';
import {CertificateRepository} from '@/certificate/certificate.repository';
import { CreateCertificateDto } from '@/certificate/dto/create-certificate.dto';
import {StudentProfileService} from '@/student-profile/student-profile.service';

@Injectable()
export class CertificateService {
    constructor(
        private readonly certificateRepository: CertificateRepository,
        private readonly studentProfileService: StudentProfileService
    ) {}

    async createCertificate(orgId:string,issuedById:string, createCertificateDto: CreateCertificateDto) {
        const { studentId } = createCertificateDto;
        await this.studentProfileService.getStudentProfileById(studentId, orgId);
        return this.certificateRepository.createCertificate(orgId,issuedById, createCertificateDto);
    }

    async getCertificateById(id: string,orgId:string) {
        const certificate = await this.certificateRepository.getCertificateById(id);
        if (!certificate) {
            throw new NotFoundException(`Certificate with id ${id} not found`);
        }
        if(certificate.organizationId !== orgId){
            throw new NotFoundException(`Certificate with id ${id} not found`);
        }
        return certificate;
    }
}
