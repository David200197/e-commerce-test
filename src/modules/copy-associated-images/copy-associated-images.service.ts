import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateDto } from './dtos/create.dto';
import { SetOperation } from 'src/common/lib/set-operation.lib';

@Injectable()
export class CopyAssociatedImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUrls(urls: string[]) {
    return this.prisma.copyAssociatedImage.findMany({
      where: { OR: urls.map((url) => ({ url })) },
    });
  }

  async createIfNotExist({ associatedImages }: CreateDto) {
    const associatedUrls = associatedImages.map(({ url }) => url);
    const copyAssociatedImages = await this.findAllByUrls(associatedUrls);
    const copyAssociatedUrls = copyAssociatedImages.map(({ url }) => url);
    const operation = new SetOperation({
      firstArray: associatedUrls,
      secondArray: copyAssociatedUrls,
    });
    const diffUrls = operation.difference();
    const copyAssociatedImagePromises = diffUrls.map((url) =>
      this.prisma.copyAssociatedImage.create({ data: { url } }),
    );
    return await Promise.all(copyAssociatedImagePromises);
  }
}
