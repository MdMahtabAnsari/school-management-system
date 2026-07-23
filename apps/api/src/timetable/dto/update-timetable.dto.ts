import {PartialType} from '@nestjs/swagger';
import {CreateTimetableDto} from '@/timetable/dto/create-timetable.dto';


export class UpdateTimetableDto extends PartialType(CreateTimetableDto) {}