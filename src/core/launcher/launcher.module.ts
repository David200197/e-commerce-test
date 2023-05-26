import { Module } from '@nestjs/common';
import { LauncherService } from './launcher.service';
import { UsersModule } from 'src/modules/users/users.module';
import { RolesModule } from 'src/modules/roles/roles.module';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';
import { RolesOnPermissionsModule } from 'src/modules/roles-on-permissions/roles-on-permissions.module';
import { TagsModule } from 'src/modules/tags/tags.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    RolesOnPermissionsModule,
    TagsModule,
  ],
  providers: [LauncherService],
})
export class LauncherModule {}
