import { Test, TestingModule } from '@nestjs/testing';
import { SiblingLinkController } from './sibling-link.controller';

describe('SiblingLinkController', () => {
  let controller: SiblingLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiblingLinkController],
    }).compile();

    controller = module.get<SiblingLinkController>(SiblingLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
