import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { PrismaMockService } from '@/common/mock/prisma/prisma.mock.service';
import { dayjs } from '@/shared/dayjs';
import { DAY_JS_CLIENT } from '@/shared/dayjs/constant';

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        {
          provide: PrismaService,
          useClass: PrismaMockService,
        },
        { provide: DAY_JS_CLIENT, useValue: dayjs },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
