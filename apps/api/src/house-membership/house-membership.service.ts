import { Injectable, NotFoundException } from '@nestjs/common';
import { HouseMembershipRepository } from '@/house-membership/house-membership.repository';
import { HouseService } from '@/house/house.service';
import { StudentProfileService } from '@/student-profile/student-profile.service';
import { CreateHouseMembershipDto } from '@/house-membership/dto/create-house-membership.dto';

@Injectable()
export class HouseMembershipService {
    constructor(
        private readonly houseMembershipRepository: HouseMembershipRepository,
        private readonly houseService: HouseService,
        private readonly studentProfileService: StudentProfileService
    ) { }

    async createHouseMembership(orgId: string, createHouseMembershipDto: CreateHouseMembershipDto) {
        const { studentId, houseId } = createHouseMembershipDto;
        await this.studentProfileService.getStudentProfileById(studentId, orgId);
        await this.houseService.getHouseById(houseId, orgId);
        return this.houseMembershipRepository.createHouseMembership(createHouseMembershipDto);
    }

    async getHouseMembershipById(id: string, orgId: string) {
        const houseMembership = await this.houseMembershipRepository.getHouseMembershipById(id);
        if (!houseMembership) {
            throw new NotFoundException(`House membership with id ${id} not found`);
        }
        await this.studentProfileService.getStudentProfileById(houseMembership.studentId, orgId);
        return houseMembership;
    }
}
