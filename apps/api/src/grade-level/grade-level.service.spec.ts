import { Test, TestingModule } from '@nestjs/testing';
import { GradeLevelService } from '@/grade-level/grade-level.service';

describe('GradeLevelService', () => {
  let service: GradeLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeLevelService],
    }).compile();

    service = module.get<GradeLevelService>(GradeLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
