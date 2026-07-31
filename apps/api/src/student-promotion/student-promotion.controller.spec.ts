import { Test, TestingModule } from '@nestjs/testing';
import { StudentPromotionController } from './student-promotion.controller';

describe('StudentPromotionController', () => {
  let controller: StudentPromotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentPromotionController],
    }).compile();

    controller = module.get<StudentPromotionController>(StudentPromotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
