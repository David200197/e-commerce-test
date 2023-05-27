import { Module } from '@nestjs/common';
import { AssociatedImagesService } from './associated-images.service';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [AssociatedImagesService],
  exports: [AssociatedImagesService],
})
export class AssociatedImagesModule {}
