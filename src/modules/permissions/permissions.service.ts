import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CreateDto } from './dtos/create.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCount() {
    return await this.prisma.permission.count();
  }

  async create(createDto: CreateDto) {
    return await this.prisma.permission.create({
      data: { id: randomUUID(), ...createDto },
    });
  }
}
