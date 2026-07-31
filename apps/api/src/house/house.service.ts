import { Injectable,BadRequestException,NotFoundException } from '@nestjs/common';
import { HouseRepository } from '@/house/house.repository';
import { CreateHouseDto } from '@/house/dto/create-house.dto';

@Injectable()
export class HouseService {
    constructor(private readonly houseRepository: HouseRepository) {}

    async createHouse(orgId: string, createHouseDto: CreateHouseDto) {
        return this.houseRepository.createHouse(orgId, createHouseDto);
    }

    async getHouseById(id: string, orgId: string) {
        const house = await this.houseRepository.getHouseById(id);
        if (!house) {
            throw new NotFoundException(`House with id ${id} not found`);
        }
        if (house.organizationId !== orgId) {
            throw new BadRequestException(`House with id ${id} does not belong to your organization`);
        }
        return house;
    }
}
