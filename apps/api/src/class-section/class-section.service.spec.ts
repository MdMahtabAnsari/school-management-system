import { Test, TestingModule } from '@nestjs/testing';
import { ClassSectionService } from './class-section.service';

describe('ClassSectionService', () => {
  let service: ClassSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassSectionService],
    }).compile();

    service = module.get<ClassSectionService>(ClassSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
