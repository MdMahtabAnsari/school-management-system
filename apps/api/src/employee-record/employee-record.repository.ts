import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateEmployeeRecordDto } from '@/employee-record/dto/create-employee-record.dto';
import { UpdateEmployeeRecordDto } from '@/employee-record/dto/update-employee-record.dto';


@Injectable()
export class EmployeeRecordRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createEmployeeRecord(orgId: string, createEmployeeRecordDto: CreateEmployeeRecordDto) {
        const { staffId, panMasked, aadhaarMasked, pfNumber, esiNumber, bankAccountMasked, bankIfsc, bankName, salaryStructureId } = createEmployeeRecordDto;
        return this.prisma.tx.employeeRecord.create({
            data: {
                organizationId: orgId,
                staffId,
                panMasked,
                aadhaarMasked,
                pfNumber,
                esiNumber,
                bankAccountMasked,
                bankIfsc,
                bankName,
                salaryStructureId,
            },
        });
    }

    async updateEmployeeRecord(id: string, updateEmployeeRecordDto: UpdateEmployeeRecordDto) {
        const { panMasked, aadhaarMasked, pfNumber, esiNumber, bankAccountMasked, bankIfsc, bankName, salaryStructureId } = updateEmployeeRecordDto;
        return this.prisma.tx.employeeRecord.update({
            where: { id },
            data: {
                panMasked,
                aadhaarMasked,
                pfNumber,
                esiNumber,
                bankAccountMasked,
                bankIfsc,
                bankName,
                salaryStructureId,
            },
        });
    }

    async getEmployeeRecordById(id: string) {
        return this.prisma.tx.employeeRecord.findUnique({
            where: { id },
        });
    }
}
