import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { CreateDto } from './dtos/create.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCount() {
    return await this.prisma.rol.count();
  }

  async create({ name }: CreateDto) {
    return await this.prisma.rol.create({
      data: { id: randomUUID(), name },
    });
  }
}
