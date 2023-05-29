import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { PrismaMockService } from '@/common/mock/prisma/prisma.mock.service';
import { NOT_FOUND_MESSAGE, USER_EXIST } from '@/common/messages/errors';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useClass: PrismaMockService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaMockService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('Should be call without error', async () => {
      const resultFn = jest.fn(async () => {
        await service.findOne({ id: 'this is a id', email: 'email' });
      });
      await resultFn();
      expect(resultFn).toBeCalledTimes(1);
    });
    it(`Should be call with "${NOT_FOUND_MESSAGE('user')}" error`, async () => {
      prisma.changeHasData(false);
      const resultFn = jest.fn(async () => {
        await service.findOne({ id: 'this is a id', email: 'email' });
      });
      expect(resultFn).rejects.toThrow(NOT_FOUND_MESSAGE('user'));
      prisma.changeHasData(true);
    });
  });

  describe('create', () => {
    it('Should be call without error', async () => {
      prisma.changeHasData(false);
      const resultFn = jest.fn(async () => {
        await service.create({
          email: 'email',
          name: 'name',
          password: 'password',
        });
      });
      await resultFn();
      expect(resultFn).toBeCalledTimes(1);
      prisma.changeHasData(true);
    });
    it(`Should be call with "${USER_EXIST}" error`, async () => {
      const resultFn = jest.fn(async () => {
        await service.create({
          email: 'email',
          name: 'name',
          password: 'password',
        });
      });
      expect(resultFn).rejects.toThrow(USER_EXIST);
    });
  });
});
