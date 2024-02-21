import { Test, TestingModule } from '@nestjs/testing';
import { PermissonuserService } from './permissonuser.service';

describe('PermissonuserService', () => {
  let service: PermissonuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissonuserService],
    }).compile();

    service = module.get<PermissonuserService>(PermissonuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
