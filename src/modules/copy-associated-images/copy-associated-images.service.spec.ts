import { Test, TestingModule } from '@nestjs/testing';
import { CopyAssociatedImagesService } from './copy-associated-images.service';
import { PrismaMockService } from '@/common/mock/prisma/prisma.mock.service';
import { PrismaService } from '@/shared/prisma/prisma.service';

describe('CopyAssociatedImagesService', () => {
  let service: CopyAssociatedImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CopyAssociatedImagesService,
        {
          provide: PrismaService,
          useClass: PrismaMockService,
        },
      ],
    }).compile();

    service = module.get<CopyAssociatedImagesService>(
      CopyAssociatedImagesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
