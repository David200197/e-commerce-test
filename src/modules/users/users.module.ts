import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
