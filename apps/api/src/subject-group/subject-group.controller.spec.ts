import { Test, TestingModule } from '@nestjs/testing';
import { SubjectGroupController } from './subject-group.controller';

describe('SubjectGroupController', () => {
  let controller: SubjectGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectGroupController],
    }).compile();

    controller = module.get<SubjectGroupController>(SubjectGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
