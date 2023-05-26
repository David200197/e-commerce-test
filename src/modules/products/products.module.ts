import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SharedModule } from 'src/shared/shared.module';
import { TagsModule } from '../tags/tags.module';
import { AssociatedImagesModule } from '../associated-images/associated-images.module';

@Module({
  imports: [SharedModule, TagsModule, AssociatedImagesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
