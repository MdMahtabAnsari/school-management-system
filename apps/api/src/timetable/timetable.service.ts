import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import {TimetableRepository} from '@/timetable/timetable.repository';
import {CreateTimetableDto} from '@/timetable/dto/create-timetable.dto';
import {UpdateTimetableDto} from '@/timetable/dto/update-timetable.dto';

@Injectable()
export class TimetableService {
    constructor(private readonly timetableRepository: TimetableRepository) {}

    async createTimetable(orgId: string, createTimetableDto: CreateTimetableDto) {
        return this.timetableRepository.createTimetable(orgId, createTimetableDto);
    }

    async updateTimetable(id: string, orgId: string, updateTimetableDto: UpdateTimetableDto) {
        const timetable = await this.timetableRepository.getTimetableById(id);
        if (!timetable) {
            throw new NotFoundException('Timetable not found');
        }
        if (timetable.organizationId !== orgId) {
            throw new ForbiddenException('You are not the owner of this timetable');
        }
        return this.timetableRepository.updateTimetable(id, updateTimetableDto);
    }

    async getTimetableById(id: string, orgId: string) {
        const timetable = await this.timetableRepository.getTimetableById(id);
        if (!timetable) {
            throw new NotFoundException('Timetable not found');
        }
        if (timetable.organizationId !== orgId) {
            throw new ForbiddenException('You are not the owner of this timetable');
        }
        return timetable;
    }
}
