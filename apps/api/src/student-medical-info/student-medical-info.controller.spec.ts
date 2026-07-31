import { Test, TestingModule } from '@nestjs/testing';
import { StudentMedicalInfoController } from './student-medical-info.controller';

describe('StudentMedicalInfoController', () => {
  let controller: StudentMedicalInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentMedicalInfoController],
    }).compile();

    controller = module.get<StudentMedicalInfoController>(StudentMedicalInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
