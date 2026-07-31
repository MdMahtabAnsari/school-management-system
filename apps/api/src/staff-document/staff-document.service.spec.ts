import { Test, TestingModule } from '@nestjs/testing';
import { StaffDocumentService } from './staff-document.service';

describe('StaffDocumentService', () => {
  let service: StaffDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffDocumentService],
    }).compile();

    service = module.get<StaffDocumentService>(StaffDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
