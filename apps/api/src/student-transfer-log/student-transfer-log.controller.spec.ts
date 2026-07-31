import { Test, TestingModule } from '@nestjs/testing';
import { StudentTransferLogController } from './student-transfer-log.controller';

describe('StudentTransferLogController', () => {
  let controller: StudentTransferLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentTransferLogController],
    }).compile();

    controller = module.get<StudentTransferLogController>(StudentTransferLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
