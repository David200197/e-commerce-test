import { Test, TestingModule } from '@nestjs/testing';
import { CopyAssociatedImagesService } from './copy-associated-images.service';

describe('CopyAssociatedImagesService', () => {
  let service: CopyAssociatedImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CopyAssociatedImagesService],
    }).compile();

    service = module.get<CopyAssociatedImagesService>(CopyAssociatedImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
