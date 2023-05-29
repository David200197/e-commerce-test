import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { SharedModule } from '@/shared/shared.module';
import { RolesController } from './roles.controller';

@Module({
  imports: [SharedModule],
  providers: [RolesService],
  exports: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
