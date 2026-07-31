import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStudentMedicalInfoDto } from '@/student-medical-info/dto/create-student-medical-info.dto';
import { UpdateStudentMedicalInfoDto } from '@/student-medical-info/dto/update-student-medical-info.dto';

@Injectable()
export class StudentMedicalInfoRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createStudentMedicalInfo(createStudentMedicalInfoDto: CreateStudentMedicalInfoDto) {
        const { studentId, allergies, chronicConditions, medications, doctorName, doctorPhone, insuranceInfo } = createStudentMedicalInfoDto;

        return this.prisma.tx.studentMedicalInfo.create({
            data: {
                studentId,
                allergies,
                chronicConditions,
                medications,
                doctorName,
                doctorPhone,
                insuranceInfo
            },
        });
    }

    async updateStudentMedicalInfo(id: string, updateStudentMedicalInfoDto: UpdateStudentMedicalInfoDto) {
        const { allergies, chronicConditions, medications, doctorName, doctorPhone, insuranceInfo } = updateStudentMedicalInfoDto;

        return this.prisma.tx.studentMedicalInfo.update({
            where: { id },
            data: {
                allergies,
                chronicConditions,
                medications,
                doctorName,
                doctorPhone,
                insuranceInfo
            },
        });
    }

    async getStudentMedicalInfoById(id: string) {
        return this.prisma.tx.studentMedicalInfo.findUnique({
            where: { id },
        });
    }
}