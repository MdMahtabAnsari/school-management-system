import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRecordController } from './employee-record.controller';

describe('EmployeeRecordController', () => {
  let controller: EmployeeRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeRecordController],
    }).compile();

    controller = module.get<EmployeeRecordController>(EmployeeRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
