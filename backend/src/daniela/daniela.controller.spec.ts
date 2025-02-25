import { Test, TestingModule } from '@nestjs/testing';
import { DanielaController } from './daniela.controller';

describe('DanielaController', () => {
  let controller: DanielaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DanielaController],
    }).compile();

    controller = module.get<DanielaController>(DanielaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
