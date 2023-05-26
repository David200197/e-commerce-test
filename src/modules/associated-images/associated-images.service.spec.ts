import { Test, TestingModule } from '@nestjs/testing';
import { AssociatedImagesService } from './associated-images.service';

describe('AssociatedImagesService', () => {
  let service: AssociatedImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociatedImagesService],
    }).compile();

    service = module.get<AssociatedImagesService>(AssociatedImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
