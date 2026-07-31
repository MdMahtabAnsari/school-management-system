import { Test, TestingModule } from '@nestjs/testing';
import { StudentPromotionService } from './student-promotion.service';

describe('StudentPromotionService', () => {
  let service: StudentPromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentPromotionService],
    }).compile();

    service = module.get<StudentPromotionService>(StudentPromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
