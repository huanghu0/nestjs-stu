import { Test, TestingModule } from '@nestjs/testing';
import { PermissonuserController } from './permissonuser.controller';
import { PermissonuserService } from './permissonuser.service';

describe('PermissonuserController', () => {
  let controller: PermissonuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissonuserController],
      providers: [PermissonuserService],
    }).compile();

    controller = module.get<PermissonuserController>(PermissonuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
