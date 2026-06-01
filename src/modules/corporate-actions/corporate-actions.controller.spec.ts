import { Test, TestingModule } from '@nestjs/testing';
import { CorporateActionsController } from './corporate-actions.controller';

describe('CorporateActionsController', () => {
  let controller: CorporateActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporateActionsController],
    }).compile();

    controller = module.get<CorporateActionsController>(CorporateActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
