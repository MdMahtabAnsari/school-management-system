import { Test, TestingModule } from '@nestjs/testing';
import { TimetableSlotService } from './timetable-slot.service';

describe('TimetableSlotService', () => {
  let service: TimetableSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimetableSlotService],
    }).compile();

    service = module.get<TimetableSlotService>(TimetableSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
