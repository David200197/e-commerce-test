import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DayjsFunction, InjestDayJs } from 'src/shared/dayjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateDto } from './dtos/create.dto';
import { FindQueryDto } from 'src/common/dtos/find-query.dto';
import { Paginator } from 'src/common/lib/paginator.lib';

@Injectable()
export class SalesService {
  constructor(
    @InjestDayJs()
    private readonly dayjs: DayjsFunction,
    private readonly prisma: PrismaService,
  ) {}

  async findAll({ page = 1 }: FindQueryDto) {
    const perPage = 10;
    const paginator = new Paginator({ perPage, page });
    const sales = await this.prisma.sales.findMany({
      skip: paginator.skip,
      take: paginator.take,
      include: {
        salesOnTags: true,
        salesOnCopyAssociatedImage: true,
      },
    });
    const totalElement = await this.prisma.sales.count();
    const totalPage = paginator.getTotalPage(totalElement);
    return { sales, page, totalElement, totalPage, perPage };
  }

  async getTotalAmount() {
    const {
      _sum: { price },
    } = await this.prisma.sales.aggregate({ _sum: { price: true } });
    return price;
  }

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
          connectOrCreate: productsOnTags.map(({ tagId }) => ({
            where: { tagId_salesId: { salesId, tagId } },
            create: { tagId },
          })),
        },
        ...restProduct,
      },
    });
  }
}
