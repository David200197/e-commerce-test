import { Module } from '@nestjs/common';
import { ConfigModule as EnviromentModule } from '@nestjs/config';
import enviroment from './enviroment';

@Module({
  imports: [
    EnviromentModule.forRoot({
      isGlobal: true,
      load: [enviroment],
    }),
  ],
})
export class ConfigModule {}
