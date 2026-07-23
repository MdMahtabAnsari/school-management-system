import { Test, TestingModule } from '@nestjs/testing';
import { SubjectGroupService } from './subject-group.service';

describe('SubjectGroupService', () => {
  let service: SubjectGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectGroupService],
    }).compile();

    service = module.get<SubjectGroupService>(SubjectGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
