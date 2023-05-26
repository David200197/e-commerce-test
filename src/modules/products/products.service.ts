import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { GenerateSkuDto } from './dtos/generate-sku.dto';
import { CreateDto } from './dtos/create.dto';
import { TagsService } from '../tags/tags.service';
import { AssociatedImagesService } from '../associated-images/associated-images.service';
import { getNotFoundMessage } from 'src/common/messages/errors';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagsService: TagsService,
    private readonly associatedImagesService: AssociatedImagesService,
  ) {}

  private generateSku({ name, category }: GenerateSkuDto) {
    const modelNumber = Math.ceil(Math.random() * 100);
    const suffix =
      modelNumber < 10 ? `0${modelNumber}` : modelNumber.toString();

    const prefix = category.slice(0, 2);
    const sku = `${prefix}-${name}-${suffix}`;
    return sku;
  }

  async findBySku(sku: string) {
    const product = await this.prisma.product.findFirst({
      where: { sku },
      include: { associatedImages: true },
    });
    if (!product) throw new NotFoundException(getNotFoundMessage('product'));
    return product;
  }

  async create({ tagIds, urlAssociatedImages, ...dto }: CreateDto) {
    const sku = this.generateSku({ name: dto.name, category: dto.category });

    const tags = await this.tagsService.findAllByIds(tagIds);
    const associatedImages = await this.associatedImagesService.createByUrls(
      urlAssociatedImages,
    );

    await this.prisma.product.create({
      data: {
        sku,
        associatedImages: { create: associatedImages },
        productsOnTags: { create: tags.map((tag) => ({ tagId: tag.id, sku })) },
        ...dto,
      },
    });
  }

  async update(
    sku: string,
    { tagIds, urlAssociatedImages, ...dto }: CreateDto,
  ) {
    const { associatedImages: associatedImagesFounded } = await this.findBySku(
      sku,
    );
    const urls = associatedImagesFounded.map(
      (associatedImage) => associatedImage.url,
    );

    const tags = await this.tagsService.findAllByIds(tagIds);
    const associatedImages = await this.associatedImagesService.createByUrls(
      urlAssociatedImages,
    );

    const product = await this.prisma.product.update({
      where: { sku },
      data: {
        sku,
        associatedImages: { create: associatedImages },
        productsOnTags: { create: tags.map((tag) => ({ tagId: tag.id, sku })) },
        ...dto,
      },
    });
    await this.associatedImagesService.deleteByUrls(urls);
    return product;
  }

  async delete(sku: string) {
    await this.prisma.product.delete({ where: { sku } });
  }
}
