import { Injectable } from '@nestjs/common';
import {TimetableSlotRepository} from '@/timetable-slot/timetable-slot.repository';
import { CreateTimetableSlotDto } from '@/timetable-slot/dto/create-timetable-slot.dto';
import { UpdateTimetableSlotDto } from '@/timetable-slot/dto/update-timetable-slot.dto';
import { TimetableSlotFilterDto } from '@/timetable-slot/dto/timetable-slot-filter.dto';

@Injectable()
export class TimetableSlotService {
    constructor(private readonly timetableSlotRepository: TimetableSlotRepository) {}

    async createTimetableSlot(createTimetableSlotDto: CreateTimetableSlotDto) {
        return this.timetableSlotRepository.createTimetableSlot(createTimetableSlotDto);
    }

    async updateTimetableSlot(id: string, updateTimetableSlotDto: UpdateTimetableSlotDto) {
        return this.timetableSlotRepository.updateTimetableSlot(id, updateTimetableSlotDto);
    }

    async getTimetableSlotById(id: string) {
        return this.timetableSlotRepository.getTimetableSlotById(id);
    }

    async getTimetableSlotsByFilter(filter: TimetableSlotFilterDto) {
        return this.timetableSlotRepository.getTimetableSlotsByFilter(filter);
    }
}
