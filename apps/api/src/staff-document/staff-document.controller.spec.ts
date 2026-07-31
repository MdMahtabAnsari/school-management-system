import { Test, TestingModule } from '@nestjs/testing';
import { StaffDocumentController } from './staff-document.controller';

describe('StaffDocumentController', () => {
  let controller: StaffDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffDocumentController],
    }).compile();

    controller = module.get<StaffDocumentController>(StaffDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
