import { Test, TestingModule } from '@nestjs/testing';
import { StudentDocumentController } from './student-document.controller';

describe('StudentDocumentController', () => {
  let controller: StudentDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentDocumentController],
    }).compile();

    controller = module.get<StudentDocumentController>(StudentDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
