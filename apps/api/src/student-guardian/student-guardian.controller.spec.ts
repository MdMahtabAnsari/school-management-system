import { Test, TestingModule } from '@nestjs/testing';
import { StudentGuardianController } from './student-guardian.controller';

describe('StudentGuardianController', () => {
  let controller: StudentGuardianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentGuardianController],
    }).compile();

    controller = module.get<StudentGuardianController>(StudentGuardianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
