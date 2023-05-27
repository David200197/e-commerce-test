import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
