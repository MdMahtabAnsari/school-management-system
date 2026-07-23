import { Test, TestingModule } from '@nestjs/testing';
import { ClassSectionController } from './class-section.controller';

describe('ClassSectionController', () => {
  let controller: ClassSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassSectionController],
    }).compile();

    controller = module.get<ClassSectionController>(ClassSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
