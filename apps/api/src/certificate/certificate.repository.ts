import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCertificateDto } from '@/certificate/dto/create-certificate.dto';

@Injectable()
export class CertificateRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createCertificate(orgId:string,issuedById:string, createCertificateDto: CreateCertificateDto) {
        const { studentId, type, serialNumber, fileUrl, fileType } = createCertificateDto;
        return this.prisma.tx.certificate.create({
            data: {
                organizationId:orgId,
                studentId,
                type,
                serialNumber,
                issuedById,
                fileUrl,
                fileType
            },
        });
    }

    async getCertificateById(id: string) {
        return this.prisma.tx.certificate.findUnique({
            where: { id },
        });
    }
}
