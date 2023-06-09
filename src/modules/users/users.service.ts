import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NOT_FOUND_MESSAGE, USER_EXIST } from '@/common/messages/errors';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CreateDto } from './dtos/create.dto';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getCount() {
    return await this.prisma.user.count();
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findFirst({
      where,
      include: {
        rol: {
          include: { rolesOnPermissions: { include: { permission: true } } },
        },
      },
    });
    if (!user) throw new NotFoundException(NOT_FOUND_MESSAGE('user'));
    return user;
  }

  async create({ email, name, password, rolId }: CreateDto) {
    const user = this.prisma.user.findFirst({ where: { email } });
    if (user) throw new ConflictException(USER_EXIST);
    const hashPassword = await hash(password, 12);

    return await this.prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        name,
        password: hashPassword,
        rolId,
      },
    });
  }
}
