import { Test, TestingModule } from '@nestjs/testing';
import { AssociatedImagesService } from './associated-images.service';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { PrismaMockService } from '@/common/mock/prisma/prisma.mock.service';
import { NOT_FOUND_MESSAGE } from '@/common/messages/errors';

describe('AssociatedImagesService', () => {
  let service: AssociatedImagesService;
  let prisma: PrismaMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociatedImagesService,
        {
          provide: PrismaService,
          useClass: PrismaMockService,
        },
      ],
    }).compile();

    service = module.get<AssociatedImagesService>(AssociatedImagesService);
    prisma = module.get<PrismaMockService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('deleteByUrls', () => {
    it('Should be call without error', async () => {
      const resultFn = jest.fn(async () => {
        await service.deleteByUrls(['test']);
      });
      await resultFn();
      expect(resultFn).toBeCalledTimes(1);
    });
    it('Should be call with error', () => {
      prisma.changeHasData(false);
      const resultFn = jest.fn(async () => {
        await service.deleteByUrls(['test']);
      });
      expect(resultFn).rejects.toThrow(NOT_FOUND_MESSAGE('associated images'));
    });
  });
});
