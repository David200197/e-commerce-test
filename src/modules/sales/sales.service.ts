import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DayjsFunction, InjestDayJs } from 'src/shared/dayjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateDto } from './dtos/create.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjestDayJs()
    private readonly dayjs: DayjsFunction,
    private readonly prisma: PrismaService,
  ) {}

  async create({
    copyAssociatedImages: associatedImages,
    productsOnTags,
    ...restProduct
  }: CreateDto) {
    const createAt = this.dayjs.utc().format();
    const salesId = randomUUID();

    return await this.prisma.sales.create({
      data: {
        id: salesId,
        createAt,
        salesOnCopyAssociatedImage: {
          connectOrCreate: associatedImages.map(({ url }) => ({
            create: { copyAssociatedImageUrl: url },
            where: {
              copyAssociatedImageUrl_salesId: {
                copyAssociatedImageUrl: url,
                salesId,
              },
            },
          })),
        },
        salesOnTags: {
          create: productsOnTags.map(({ tagId }) => ({
            tagId,
          })),
        },
        ...restProduct,
      },
    });
  }
}
