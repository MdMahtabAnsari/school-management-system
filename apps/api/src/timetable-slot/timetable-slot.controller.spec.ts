import { Test, TestingModule } from '@nestjs/testing';
import { TimetableSlotController } from './timetable-slot.controller';

describe('TimetableSlotController', () => {
  let controller: TimetableSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimetableSlotController],
    }).compile();

    controller = module.get<TimetableSlotController>(TimetableSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
