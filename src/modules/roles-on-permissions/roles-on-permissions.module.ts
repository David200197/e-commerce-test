import { Module } from '@nestjs/common';
import { RolesOnPermissionsService } from './roles-on-permissions.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [RolesOnPermissionsService],
  exports: [RolesOnPermissionsService],
})
export class RolesOnPermissionsModule {}
