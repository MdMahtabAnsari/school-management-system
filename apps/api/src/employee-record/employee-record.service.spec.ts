import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRecordService } from './employee-record.service';

describe('EmployeeRecordService', () => {
  let service: EmployeeRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRecordService],
    }).compile();

    service = module.get<EmployeeRecordService>(EmployeeRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
