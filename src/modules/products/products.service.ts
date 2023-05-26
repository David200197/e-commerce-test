import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { GenerateSkuDto } from './dtos/generate-sku.dto';
import { CreateDto } from './dtos/create.dto';
import { TagsService } from '../tags/tags.service';
import { AssociatedImagesService } from '../associated-images/associated-images.service';
import { getNotFoundMessage } from 'src/common/messages/errors';
import { UpdateDto } from './dtos/update.dto';
import { SetOperation } from 'src/common/lib/set-operation.lib';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagsService: TagsService,
    private readonly associatedImagesService: AssociatedImagesService,
  ) {}

  private generateSku({ name, category }: GenerateSkuDto) {
    const modelNumber = Math.ceil(Math.random() * 100000);
    const suffix =
      modelNumber < 10000 ? `0${modelNumber}` : modelNumber.toString();

    const prefix = category.slice(0, 2);
    const normalizedName = name.split(' ').join('_');
    const sku = `${prefix}-${normalizedName}-${suffix}`;
    return sku;
  }

  async findOneBySku(sku: string) {
    const product = await this.prisma.product.findFirst({
      where: { sku },
      include: {
        associatedImages: true,
        productsOnTags: true,
      },
    });
    if (!product) throw new NotFoundException(getNotFoundMessage('product'));
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
      throw new ConflictException(
        `product with urls ${urls.join(' and ')} exists`,
      );
    }

    const tags = await this.tagsService.findAllByIds(tagIds);

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
}