import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateDto } from './dtos/create.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCount() {
    return await this.prisma.tag.count();
  }

  async findAllByIds(ids: string[]) {
    return await this.prisma.tag.findMany({
      where: { AND: ids.map((id) => ({ id })) },
    });
  }

  async findAll() {
    return await this.prisma.tag.findMany();
  }

  async create({ name }: CreateDto) {
    return await this.prisma.tag.create({ data: { id: randomUUID(), name } });
  }
}
