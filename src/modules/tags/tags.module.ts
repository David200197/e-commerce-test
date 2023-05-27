import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
