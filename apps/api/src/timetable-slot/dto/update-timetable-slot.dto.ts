import {PartialType} from '@nestjs/swagger';
import { CreateTimetableSlotDto } from '@/timetable-slot/dto/create-timetable-slot.dto';

export class UpdateTimetableSlotDto extends PartialType(CreateTimetableSlotDto) {}