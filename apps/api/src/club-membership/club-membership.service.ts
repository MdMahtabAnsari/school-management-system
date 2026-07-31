import { Injectable,NotFoundException } from '@nestjs/common';
import { ClubMembershipRepository } from '@/club-membership/club-membership.repository';
import { CreateClubMembershipDto } from '@/club-membership/dto/create-club-membership.dto';
import {ClubService} from '@/club/club.service';
import {StudentProfileService} from '@/student-profile/student-profile.service';

@Injectable()
export class ClubMembershipService {
    constructor(
        private readonly clubMembershipRepository: ClubMembershipRepository,
        private readonly clubService: ClubService,
        private readonly studentProfileService: StudentProfileService
    ) {}

    async createClubMembership(orgId:string, createClubMembershipDto: CreateClubMembershipDto) {
        const { studentId, clubId } = createClubMembershipDto;
        await this.studentProfileService.getStudentProfileById(studentId, orgId);
        await this.clubService.getClubById(clubId, orgId);
        return this.clubMembershipRepository.createClubMembership(createClubMembershipDto);
    }

    async getClubMembershipById(id: string, orgId:string) {
        const clubMembership = await this.clubMembershipRepository.getClubMembershipById(id);
        if (!clubMembership) {
            throw new NotFoundException(`Club membership with id ${id} not found`);
        }

        await this.studentProfileService.getStudentProfileById(clubMembership.studentId, orgId);
        return clubMembership;
    }

}
