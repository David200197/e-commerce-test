import { Test, TestingModule } from '@nestjs/testing';
import { RolesOnPermissionsService } from './roles-on-permissions.service';

describe('RolesPermissionsService', () => {
  let service: RolesOnPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesOnPermissionsService],
    }).compile();

    service = module.get<RolesOnPermissionsService>(RolesOnPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
