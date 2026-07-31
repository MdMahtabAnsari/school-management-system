import { Test, TestingModule } from '@nestjs/testing';
import { DocumentRecordService } from './document-record.service';

describe('DocumentRecordService', () => {
  let service: DocumentRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentRecordService],
    }).compile();

    service = module.get<DocumentRecordService>(DocumentRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
