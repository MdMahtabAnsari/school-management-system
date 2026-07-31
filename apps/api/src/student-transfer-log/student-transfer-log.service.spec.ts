import { Test, TestingModule } from '@nestjs/testing';
import { StudentTransferLogService } from './student-transfer-log.service';

describe('StudentTransferLogService', () => {
  let service: StudentTransferLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentTransferLogService],
    }).compile();

    service = module.get<StudentTransferLogService>(StudentTransferLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
