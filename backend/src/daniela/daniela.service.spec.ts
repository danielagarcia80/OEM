import { Test, TestingModule } from '@nestjs/testing';
import { DanielaService } from './daniela.service';

describe('DanielaService', () => {
  let service: DanielaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DanielaService],
    }).compile();

    service = module.get<DanielaService>(DanielaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
