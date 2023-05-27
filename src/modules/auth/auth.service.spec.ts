import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { PrismaMockService } from '@/common/mock/prisma/prisma.mock.service';
import { UsersService } from '../users/users.service';
import { UsersMockService } from '@/common/mock/users.mock.service';
import { JwtService } from '@nestjs/jwt';
import { JwtMockService } from '@/common/mock/jwt.mock.service';
import bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let user: UsersMockService;
  const mockCompare = jest.spyOn(bcrypt, 'compare');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useClass: PrismaMockService,
        },
        { provide: UsersService, useClass: UsersMockService },
        { provide: JwtService, useClass: JwtMockService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = module.get<UsersMockService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('me', () => {
    it('Should be call without errors', async () => {
      const res = await service.me({
        id: 'id',
        email: 'email',
        permissions: ['create_product'],
      });
      expect(res).toEqual({
        permissions: ['create_product'],
        user: {
          name: 'David',
          email: 'david.alfonso@gmail.com',
          rol: {
            rolesOnPermissions: [
              { permission: { name: 'permission1' } },
              { permission: { name: 'permission2' } },
              { permission: { name: 'permission3' } },
            ],
          },
        },
      });
    });
  });

  describe('login', () => {
    it('Should be call without errors', async () => {
      mockCompare.mockImplementation(() => true);
      const res = await service.login({ email: 'email', password: 'password' });
      expect(res).toEqual({
        accessToken: {
          email: 'david.alfonso@gmail.com',
          id: undefined,
          permissions: ['permission1', 'permission2', 'permission3'],
        },
        permissions: ['permission1', 'permission2', 'permission3'],
        user: {
          email: 'david.alfonso@gmail.com',
          name: 'David',
          rol: {
            rolesOnPermissions: [
              { permission: { name: 'permission1' } },
              { permission: { name: 'permission2' } },
              { permission: { name: 'permission3' } },
            ],
          },
        },
      });
    });

    it('Should be throw "invalid credentials" error', async () => {
      mockCompare.mockImplementation(() => true);
      user.changeHasData(false);
      const resultFn = jest.fn(async () => {
        await service.login({ email: 'email', password: 'password' });
      });
      expect(resultFn).rejects.toThrow('invalid credentials');
      user.changeHasData(true);
    });

    it('Should be throw "user is unauthorized" error', async () => {
      mockCompare.mockImplementation(() => false);
      const resultFn = jest.fn(async () => {
        await service.login({ email: 'email', password: 'password' });
      });
      expect(resultFn).rejects.toThrow('user is unauthorized');
    });
  });
});
