import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateDto } from './dtos/create.dto';

@Injectable()
export class RolesOnPermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ permissionId, rolId }: CreateDto) {
    return await this.prisma.rolesOnPermissions.create({
      data: {
        permissionId,
        rolId,
      },
    });
  }
}
