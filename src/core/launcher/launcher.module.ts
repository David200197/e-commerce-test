import { Module } from '@nestjs/common';
import { LauncherService } from './launcher.service';
import { UsersModule } from 'src/modules/users/users.module';
import { RolesModule } from 'src/modules/roles/roles.module';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';
import { TagsModule } from 'src/modules/tags/tags.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    TagsModule,
    SharedModule,
  ],
  providers: [LauncherService],
})
export class LauncherModule {}
