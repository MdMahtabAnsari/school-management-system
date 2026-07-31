import { Test, TestingModule } from '@nestjs/testing';
import { HouseMembershipService } from './house-membership.service';

describe('HouseMembershipService', () => {
  let service: HouseMembershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseMembershipService],
    }).compile();

    service = module.get<HouseMembershipService>(HouseMembershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
