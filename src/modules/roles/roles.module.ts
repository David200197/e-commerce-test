import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
