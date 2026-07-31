import { Test, TestingModule } from '@nestjs/testing';
import { ClubMembershipService } from './club-membership.service';

describe('ClubMembershipService', () => {
  let service: ClubMembershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubMembershipService],
    }).compile();

    service = module.get<ClubMembershipService>(ClubMembershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
