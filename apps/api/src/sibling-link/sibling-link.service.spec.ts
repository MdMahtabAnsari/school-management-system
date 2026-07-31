import { Test, TestingModule } from '@nestjs/testing';
import { SiblingLinkService } from './sibling-link.service';

describe('SiblingLinkService', () => {
  let service: SiblingLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiblingLinkService],
    }).compile();

    service = module.get<SiblingLinkService>(SiblingLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
