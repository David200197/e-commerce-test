import { Module } from '@nestjs/common';
import { LauncherModule } from './launcher/launcher.module';

@Module({
  imports: [LauncherModule],
})
export class CoreModule {}
