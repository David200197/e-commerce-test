import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { SharedModule } from '@/shared/shared.module';
import { TagsController } from './tags.controller';

@Module({
  imports: [SharedModule],
  providers: [TagsService],
  exports: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
