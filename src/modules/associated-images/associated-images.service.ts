import { Injectable, NotFoundException } from '@nestjs/common';
import { getNotFoundMessage } from 'src/common/messages/errors';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AssociatedImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findSomeByUrls(urls: string[]) {
    return this.prisma.associatedImage.findMany({
      where: { OR: urls.map((url) => ({ url })) },
    });
  }

  async findAllByUrls(urls: string[]) {
    return this.prisma.associatedImage.findMany({
      where: { AND: urls.map((url) => ({ url })) },
    });
  }

  async createByUrls(urls: string[]) {
    const associatedImages = await this.findSomeByUrls(urls);

    if (associatedImages.length)
      throw new NotFoundException(associatedImages.join(' and ') + 'exist');

    const urlPromises = urls.map((url) =>
      this.prisma.associatedImage.create({ data: { url } }),
    );
    return await Promise.all(urlPromises);
  }

  async deleteByUrls(urls: string[]) {
    const associatedImages = await this.findAllByUrls(urls);

    if (!associatedImages.length)
      throw new NotFoundException(getNotFoundMessage('associated images'));

    const urlPromises = urls.map((url) =>
      this.prisma.associatedImage.delete({ where: { url } }),
    );
    return await Promise.all(urlPromises);
  }
}
