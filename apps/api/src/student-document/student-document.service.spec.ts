import { Test, TestingModule } from '@nestjs/testing';
import { StudentDocumentService } from './student-document.service';

describe('StudentDocumentService', () => {
  let service: StudentDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentDocumentService],
    }).compile();

    service = module.get<StudentDocumentService>(StudentDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
