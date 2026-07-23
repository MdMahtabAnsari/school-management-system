import { Test, TestingModule } from '@nestjs/testing';
import { GradeLevelController } from '@/grade-level/grade-level.controller';

describe('GradeLevelController', () => {
  let controller: GradeLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeLevelController],
    }).compile();

    controller = module.get<GradeLevelController>(GradeLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
