import { Injectable, NotFoundException } from '@nestjs/common';
import { NOT_FOUND_MESSAGE } from '@/common/messages/errors';
import { PrismaService } from '@/shared/prisma/prisma.service';

@Injectable()
export class AssociatedImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUrls(urls: string[]) {
    const associatedImages = await this.prisma.associatedImage.findMany({
      where: { OR: urls.map((url) => ({ url })) },
    });
    return associatedImages;
  }

  async deleteByUrls(urls: string[]) {
    const associatedImages = await this.findAllByUrls(urls);

    if (!associatedImages.length)
      throw new NotFoundException(NOT_FOUND_MESSAGE('associated images'));

    return await this.prisma.associatedImage.deleteMany({
      where: {
        OR: associatedImages.map((associatedImage) => ({
          url: associatedImage.url,
        })),
      },
    });
  }
}
