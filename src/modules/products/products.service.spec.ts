import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { PrismaMockService } from '@/common/mock/prisma/prisma.mock.service';
import { TagsService } from '../tags/tags.service';
import { TagsMockService } from '@/common/mock/tags.mock.service';
import { SalesService } from '../sales/sales.service';
import { SalesMockService } from '@/common/mock/sales.mock.service';
import { AssociatedImagesMockService } from '@/common/mock/associated-images.mock.service';
import { AssociatedImagesService } from '../associated-images/associated-images.service';
import { CopyAssociatedImagesMockService } from '@/common/mock/copy-associated-images.mock.service';
import { CopyAssociatedImagesService } from '../copy-associated-images/copy-associated-images.service';
import {
  CONFLICT_NO_STOCK_QUANTITY,
  NOT_FOUND_MESSAGE,
} from '@/common/messages/errors';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaMockService;
  let tags: TagsMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useClass: PrismaMockService,
        },
        {
          provide: TagsService,
          useClass: TagsMockService,
        },
        {
          provide: AssociatedImagesService,
          useClass: AssociatedImagesMockService,
        },
        {
          provide: SalesService,
          useClass: SalesMockService,
        },
        {
          provide: CopyAssociatedImagesService,
          useClass: CopyAssociatedImagesMockService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaMockService>(PrismaService);
    tags = module.get<TagsMockService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateSku', () => {
    it('Should be return a correct data', () => {
      const res = service.generateSku({
        category: 'Super_Heroe',
        name: 'Juguete De Superman',
      });
      const [prefix, name, suffix] = res.split('-');
      expect({ prefix, name, suffix: Number(suffix) }).toEqual({
        prefix: 'Su',
        name: 'Juguete_De_Superman',
        suffix: expect.any(Number),
      });
    });
  });

  describe('buildFindQuery', () => {
    it('Should be return a correct data', () => {
      const name = 'this is a name';
      const price = 10;
      const assessment = 9;
      const category = 'this is a category';
      const description = 'this is a description';
      const additionalInformation = 'this is a additional information';
      const stockQuantity = 8;
      const res = service.buildFindQuery({
        name,
        price,
        assessment,
        category,
        description,
        stockQuantity,
        additionalInformation,
        tagIds: ['juguete', 'ropa'],
        associatedImage: 'this is a url',
      });
      expect(res).toEqual({
        associatedImages: {
          some: {
            url: 'this is a url',
          },
        },
        productsOnTags: {
          some: {
            AND: [
              {
                tagId: 'juguete',
              },
              {
                tagId: 'ropa',
              },
            ],
          },
        },
        name: new RegExp(name, 'i'),
        price,
        assessment,
        category: new RegExp(category, 'i'),
        description: new RegExp(description, 'i'),
        stockQuantity,
        additionalInformation: new RegExp(additionalInformation, 'i'),
      });
    });
  });

  describe('findOneBySku', () => {
    it('Should be call without error', async () => {
      const resultFn = jest.fn(async () => {
        await service.findOneBySku('sku');
      });
      await resultFn();
      expect(resultFn).toBeCalledTimes(1);
    });
    it(`Should be call with "${NOT_FOUND_MESSAGE(
      'product',
    )}" error`, async () => {
      prisma.changeHasData(false);
      const resultFn = jest.fn(async () => {
        await service.findOneBySku('sku');
      });
      expect(resultFn).rejects.toThrow(NOT_FOUND_MESSAGE('product'));
      prisma.changeHasData(true);
    });
  });

  describe('create', () => {
    it('Should be call without error', async () => {
      prisma.changeHasData(false);
      const dto = {
        name: 'this is a name',
        additionalInformation: 'this is a additional information',
        assessment: 10,
        category: 'this is a category',
        description: 'this is a description',
        price: 10,
        stockQuantity: 30,
        tagIds: ['tagId1', 'tagId2'],
        urlAssociatedImages: ['url4', 'url5', 'url6'],
      };

      const resultFn = jest.fn(async () => {
        await service.create(dto);
      });
      await resultFn();

      expect(resultFn).toBeCalledTimes(1);
      prisma.changeHasData(true);
    });
    it('Should be call with "conflict url" error', async () => {
      const dto = {
        name: 'this is a name',
        additionalInformation: 'this is a additional information',
        assessment: 10,
        category: 'this is a category',
        description: 'this is a description',
        price: 10,
        stockQuantity: 30,
        tagIds: ['tagId1', 'tagId2'],
        urlAssociatedImages: ['url4', 'url5', 'url6'],
      };

      const resultFn = jest.fn(async () => {
        await service.create(dto);
      });

      expect(resultFn).rejects.toThrow();
    });
    it(`Should be call with "${NOT_FOUND_MESSAGE(
      'tagIds',
    )}" error`, async () => {
      prisma.changeHasData(false);
      tags.changeHasData(true);

      const dto = {
        name: 'this is a name',
        additionalInformation: 'this is a additional information',
        assessment: 10,
        category: 'this is a category',
        description: 'this is a description',
        price: 10,
        stockQuantity: 30,
        tagIds: ['tagId1', 'tagId2'],
        urlAssociatedImages: ['url4', 'url5', 'url6'],
      };

      const resultFn = jest.fn(async () => {
        await service.create(dto);
      });

      expect(resultFn).rejects.toThrow(NOT_FOUND_MESSAGE('tagIds'));
      prisma.changeHasData(true);
      tags.changeHasData(false);
    });
  });

  describe('update', () => {
    it('Should be call without error', async () => {
      const dto = {
        name: 'this is a name',
        additionalInformation: 'this is a additional information',
        assessment: 10,
        category: 'this is a category',
        description: 'this is a description',
        price: 10,
        stockQuantity: 30,
        tagIds: ['tagId1', 'tagId2'],
        urlAssociatedImage: 'url4',
      };

      const resultFn = jest.fn(async () => {
        await service.update('sku', dto);
      });
      await resultFn();

      expect(resultFn).toBeCalledTimes(1);
    });
    it(`Should be call with "${NOT_FOUND_MESSAGE(
      'product',
    )}" error`, async () => {
      prisma.changeHasData(false);
      tags.changeHasData(true);

      const dto = {
        name: 'this is a name',
        additionalInformation: 'this is a additional information',
        assessment: 10,
        category: 'this is a category',
        description: 'this is a description',
        price: 10,
        stockQuantity: 30,
        tagIds: ['tagId1', 'tagId2'],
        urlAssociatedImage: 'url4',
      };

      const resultFn = jest.fn(async () => {
        await service.update('sku', dto);
      });

      expect(resultFn).rejects.toThrow(NOT_FOUND_MESSAGE('product'));
      prisma.changeHasData(true);
      tags.changeHasData(false);
    });
  });

  describe('sell', () => {
    it('Should be call without error', async () => {
      const resultFn = jest.fn(async () => {
        await service.sell('sku');
      });
      await resultFn();
      expect(resultFn).toBeCalledTimes(1);
    });
    it(`Should be call "${CONFLICT_NO_STOCK_QUANTITY}" error`, async () => {
      const findOneBySkuMocked = jest
        .spyOn(service, 'findOneBySku')
        .mockImplementation(() => Promise.resolve({} as any));
      const resultFn = jest.fn(async () => {
        await service.sell('sku');
      });
      expect(resultFn).rejects.toThrow(CONFLICT_NO_STOCK_QUANTITY);
      findOneBySkuMocked.mockRestore();
    });
  });
});
