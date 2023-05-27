import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { GenerateSkuDto } from './dtos/generate-sku.dto';
import { CreateDto } from './dtos/create.dto';
import { TagsService } from '../tags/tags.service';
import { AssociatedImagesService } from '../associated-images/associated-images.service';
import {
  CONFLICT_NO_STOCK_QUANTITY,
  CONFLICT_PRODUCT_URL,
  NOT_FOUND_MESSAGE,
} from '@/common/messages/errors';
import { UpdateDto } from './dtos/update.dto';
import { SetOperation } from '@/common/lib/set-operation.lib';
import { FindDto } from './dtos/find.dto';
import { FindQueryDto } from '@/common/dtos/find-query.dto';
import { Paginator } from '@/common/lib/paginator.lib';
import { isNumber } from 'class-validator';
import { SalesService } from '../sales/sales.service';
import { CopyAssociatedImagesService } from '../copy-associated-images/copy-associated-images.service';

@Injectable()
export class ProductsService {
  private PER_PAGE = 10;

  constructor(
    private readonly prisma: PrismaService,
    private readonly tagsService: TagsService,
    private readonly associatedImagesService: AssociatedImagesService,
    private readonly salesService: SalesService,
    private readonly copyAssociatedImagesService: CopyAssociatedImagesService,
  ) {}

  async findAll(findDto: FindDto = {}, { page = 1 }: FindQueryDto = {}) {
    const findQuery = this.buildFindQuery(findDto);

    const paginator = new Paginator({ page, perPage: this.PER_PAGE });
    const products = await this.prisma.product.findMany({
      where: findQuery,
      take: paginator.take,
      skip: paginator.skip,
      include: {
        associatedImages: true,
        productsOnTags: { include: { tag: true } },
      },
    });

    const totalElement = await this.findTotalElements(findDto);
    const totalPage = paginator.getTotalPage(totalElement);

    return { products, page, totalElement, totalPage, perPage: this.PER_PAGE };
  }

  async findTotalElements(findDto: FindDto = {}) {
    const findQuery = this.buildFindQuery(findDto);
    return await this.prisma.product.count({
      where: findQuery,
    });
  }

  async findWithoutStockQuantity(findQueryDto: FindQueryDto = {}) {
    return await this.findAll({ stockQuantity: 0 }, findQueryDto);
  }

  async findOneBySku(sku: string) {
    const product = await this.prisma.product.findFirst({
      where: { sku },
      include: {
        associatedImages: true,
        productsOnTags: true,
      },
    });
    if (!product) throw new NotFoundException(NOT_FOUND_MESSAGE('product'));
    return product;
  }

  async findByOneUrls(urls: string[]) {
    return await this.prisma.product.findFirst({
      where: {
        OR: urls.map((url) => ({
          associatedImages: { some: { url } },
        })),
      },
      include: {
        associatedImages: true,
        productsOnTags: true,
      },
    });
  }

  async create({ tagIds, urlAssociatedImages, ...dto }: CreateDto) {
    const sku = this.generateSku({ name: dto.name, category: dto.category });
    const productsWithUrl = await this.findByOneUrls(urlAssociatedImages);
    if (productsWithUrl) {
      const operation = new SetOperation({
        firstArray: urlAssociatedImages,
        secondArray: productsWithUrl.associatedImages.map((image) => image.url),
      });
      const urls = operation.intersection();
      throw new ConflictException(CONFLICT_PRODUCT_URL(urls));
    }

    let tags = [];
    if (tagIds.length) {
      tags = await this.tagsService.findAllByIds(tagIds);
      if (!tags.length)
        throw new NotFoundException(NOT_FOUND_MESSAGE('tagIds'));
    }

    const product = await this.prisma.product.create({
      data: {
        sku,
        associatedImages: {
          connectOrCreate: urlAssociatedImages.map((url) => ({
            create: { url },
            where: { url },
          })),
        },
        productsOnTags: {
          create: tags.map((tag) => ({ tagId: tag.id })),
        },
        ...dto,
      },
      include: {
        associatedImages: true,
        productsOnTags: true,
      },
    });

    return product;
  }

  async update(
    sku: string,
    { tagIds, urlAssociatedImages, ...dto }: UpdateDto,
  ) {
    const { associatedImages: associatedImagesFounded, productsOnTags } =
      await this.findOneBySku(sku);

    let associatedImagesQuery = {};
    if (urlAssociatedImages) {
      const oldUrls = associatedImagesFounded.map(
        (associatedImage) => associatedImage.url,
      );

      await this.associatedImagesService.deleteByUrls(oldUrls);

      associatedImagesQuery = {
        associatedImages: {
          create: urlAssociatedImages.map((url) => ({
            url,
          })),
        },
      };
    }

    let tagQuery = {};
    if (tagIds) {
      const tags = await this.tagsService.findAllByIds(tagIds);
      if (!tags.length)
        throw new NotFoundException(NOT_FOUND_MESSAGE('tagIds'));

      await this.prisma.productsOnTags.deleteMany({
        where: {
          OR: productsOnTags.map(({ tagId }) => ({
            tagId,
            productSku: sku,
          })),
        },
      });

      tagQuery = {
        productsOnTags: {
          create: tags.map((tag) => ({ tagId: tag.id })),
        },
      };
    }

    const product = await this.prisma.product.update({
      where: { sku },
      data: {
        sku,
        ...associatedImagesQuery,
        ...tagQuery,
        ...dto,
      },
    });

    return product;
  }

  async delete(sku: string) {
    await this.findOneBySku(sku);
    return await this.prisma.product.delete({ where: { sku } });
  }

  async sell(sku: string) {
    const product = await this.findOneBySku(sku);
    if (!product.stockQuantity)
      throw new ConflictException(CONFLICT_NO_STOCK_QUANTITY);

    const { associatedImages, productsOnTags, stockQuantity, ...restProduct } =
      product;

    await this.copyAssociatedImagesService.createIfNotExist({
      associatedImages,
    });

    const copyAssociatedImages =
      await this.copyAssociatedImagesService.findAllByUrls(
        associatedImages.map(({ url }) => url),
      );

    const sale = await this.salesService.create({
      copyAssociatedImages,
      productsOnTags,
      ...restProduct,
    });

    const updatedProduct = await this.update(product.sku, {
      stockQuantity: stockQuantity - 1,
    });

    return { product: updatedProduct, sale };
  }

  private generateSku({ name, category }: GenerateSkuDto) {
    const modelNumber = Math.ceil(Math.random() * 100000);
    const suffix =
      modelNumber < 10000 ? `0${modelNumber}` : modelNumber.toString();

    const prefix = category.slice(0, 2);
    const normalizedName = name.split(' ').join('_');
    const sku = `${prefix}-${normalizedName}-${suffix}`;
    return sku;
  }

  private buildFindQuery = ({
    tagIds,
    associatedImage,
    ...findDto
  }: FindDto) => {
    let query = {};
    for (const key in findDto) {
      const value = findDto[key];
      if (isNumber(value)) {
        query = { ...query, [key]: value };
      } else {
        query = { ...query, [key]: new RegExp(value, 'i') };
      }
    }

    let associatedImagesQuery = {};
    if (associatedImage)
      associatedImagesQuery = {
        associatedImages: { some: { url: associatedImage } },
      };

    let tagQuery = {};
    if (tagIds)
      tagQuery = {
        productsOnTags: { some: { AND: tagIds.map((tagId) => ({ tagId })) } },
      };

    return {
      ...query,
      ...associatedImagesQuery,
      ...tagQuery,
    };
  };
}
