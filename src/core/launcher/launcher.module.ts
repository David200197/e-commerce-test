import { Module } from '@nestjs/common';
import { LauncherService } from './launcher.service';
import { UsersModule } from '@/modules/users/users.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { PermissionsModule } from '@/modules/permissions/permissions.module';
import { TagsModule } from '@/modules/tags/tags.module';
import { SharedModule } from '@/shared/shared.module';

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
