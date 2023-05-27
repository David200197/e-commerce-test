import { Module } from '@nestjs/common';
import { CopyAssociatedImagesService } from './copy-associated-images.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [CopyAssociatedImagesService],
  exports: [CopyAssociatedImagesService],
})
export class CopyAssociatedImagesModule {}
