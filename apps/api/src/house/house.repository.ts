import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import {PrismaService} from '@/prisma/prisma.service';
import {CreateHouseDto} from '@/house/dto/create-house.dto';

@Injectable()
export class HouseRepository {
    constructor(
        private readonly prisma: TransactionHost<
            TransactionalAdapterPrisma<PrismaService>
        >,
    ) { }

    async createHouse(orgId: string, createHouseDto: CreateHouseDto) {
        const { name, colorCode } = createHouseDto;

        return this.prisma.tx.house.create({
            data: {
                organizationId: orgId,
                name,
                colorCode,
            },
        });
    }

    async getHouseById(id: string) {
        return this.prisma.tx.house.findUnique({
            where: {
                id,
            },
        });
    }
}

