import { Test, TestingModule } from '@nestjs/testing';
import { StudentMedicalInfoService } from './student-medical-info.service';

describe('StudentMedicalInfoService', () => {
  let service: StudentMedicalInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentMedicalInfoService],
    }).compile();

    service = module.get<StudentMedicalInfoService>(StudentMedicalInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
