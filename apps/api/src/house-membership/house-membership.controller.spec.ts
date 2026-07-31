import { Test, TestingModule } from '@nestjs/testing';
import { HouseMembershipController } from './house-membership.controller';

describe('HouseMembershipController', () => {
  let controller: HouseMembershipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseMembershipController],
    }).compile();

    controller = module.get<HouseMembershipController>(HouseMembershipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
