import { Module } from '@nestjs/common';
import { AssociatedImagesService } from './associated-images.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [AssociatedImagesService],
  exports: [AssociatedImagesService],
})
export class AssociatedImagesModule {}
