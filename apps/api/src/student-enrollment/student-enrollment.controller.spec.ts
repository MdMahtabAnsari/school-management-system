import { Test, TestingModule } from '@nestjs/testing';
import { StudentEnrollmentController } from './student-enrollment.controller';

describe('StudentEnrollmentController', () => {
  let controller: StudentEnrollmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentEnrollmentController],
    }).compile();

    controller = module.get<StudentEnrollmentController>(StudentEnrollmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
