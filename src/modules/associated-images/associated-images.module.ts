import { Module } from '@nestjs/common';
import { AssociatedImagesService } from './associated-images.service';
import { AssociatedImagesController } from './associated-images.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [AssociatedImagesController],
  providers: [AssociatedImagesService],
  exports: [AssociatedImagesService],
})
export class AssociatedImagesModule {}
