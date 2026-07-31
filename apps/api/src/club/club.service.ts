import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import {ClubRepository} from '@/club/club.repository';
import {CreateClubDto} from '@/club/dto/create-club.dto';

@Injectable()
export class ClubService {
    constructor(private readonly clubRepository: ClubRepository) {}

    async createClub(orgId: string, createClubDto: CreateClubDto) {
        return this.clubRepository.createClub(orgId, createClubDto);
    }

    async getClubById(id: string, orgId: string) {
        const club = await this.clubRepository.getClubById(id);
        if (!club) {
            throw new NotFoundException(`Club with id ${id} not found`);
        }
        if (club.organizationId !== orgId) {
            throw new ForbiddenException(`You do not have access to this club`);
        }
        return club;
    }
}
