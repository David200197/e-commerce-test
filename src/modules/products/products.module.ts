import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SharedModule } from '@/shared/shared.module';
import { TagsModule } from '../tags/tags.module';
import { AssociatedImagesModule } from '../associated-images/associated-images.module';
import { SalesModule } from '../sales/sales.module';
import { CopyAssociatedImagesModule } from '../copy-associated-images/copy-associated-images.module';

@Module({
  imports: [
    SharedModule,
    TagsModule,
    AssociatedImagesModule,
    SalesModule,
    CopyAssociatedImagesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
