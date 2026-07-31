import { Test, TestingModule } from '@nestjs/testing';
import { StudentGuardianService } from './student-guardian.service';

describe('StudentGuardianService', () => {
  let service: StudentGuardianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentGuardianService],
    }).compile();

    service = module.get<StudentGuardianService>(StudentGuardianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
