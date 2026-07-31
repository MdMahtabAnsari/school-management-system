import { Test, TestingModule } from '@nestjs/testing';
import { ClubMembershipController } from './club-membership.controller';

describe('ClubMembershipController', () => {
  let controller: ClubMembershipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubMembershipController],
    }).compile();

    controller = module.get<ClubMembershipController>(ClubMembershipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
