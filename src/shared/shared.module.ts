import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DayjsModule } from './dayjs/dayjs.module';

@Module({
  imports: [DayjsModule.forRoot()],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
