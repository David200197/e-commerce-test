import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { RolesOnPermissionsModule } from './roles-on-permissions/roles-on-permissions.module';
import { TagsModule } from './tags/tags.module';
import { AssociatedImagesModule } from './associated-images/associated-images.module';
import { SalesModule } from './sales/sales.module';
import { CopyAssociatedImagesModule } from './copy-associated-images/copy-associated-images.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    ProductsModule,
    AuthModule,
    RolesOnPermissionsModule,
    TagsModule,
    AssociatedImagesModule,
    SalesModule,
    CopyAssociatedImagesModule,
  ],
})
export class ModulesModule {}
